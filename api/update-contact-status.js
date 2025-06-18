import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { access_token, requestId, newStatus } = req.body;
  if (!access_token || !requestId || !newStatus) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate the session and check admin email
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(access_token);
  if (userError || !user || user.email !== 'admin@texashillcountryplumbing.com') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  // Update the contact request status
  const { error } = await supabase
    .from('contact_requests')
    .update({ status: newStatus })
    .eq('id', requestId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
} 