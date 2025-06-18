import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = 'admin@texashillcountryplumbing.com';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase environment variables:', { supabaseUrl, serviceRoleKey });
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

export default async function handler(req, res) {
  console.log('admin-users API called', { method: req.method, body: req.body });
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { access_token } = req.body;
  if (!access_token) {
    console.error('Missing access token in request body');
    return res.status(401).json({ error: 'Missing access token' });
  }

  // Validate the session and check admin email
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(access_token);
  if (userError || !user || user.email !== adminEmail) {
    console.error('Admin access denied', { userError, user });
    return res.status(403).json({ error: 'Admin access required', details: { userError, user } });
  }

  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    return res.status(200).json({ users: data.users });
  } catch (error) {
    console.error('Error listing users:', error);
    return res.status(500).json({ error: error.message, details: error });
  }
} 