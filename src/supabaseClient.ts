import { createClient } from '@supabase/supabase-js';

// These will be provided by the environment
const SUPABASE_URL = 'https://zuorscygtvloqokbpqzs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1b3JzY3lndHZsb3Fva2JwcXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDgxODUsImV4cCI6MjA2MjcyNDE4NX0.pRNaTLhfyLpcFqm0e-A9ThLz-aBsd0NLpnWEII28yOc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);