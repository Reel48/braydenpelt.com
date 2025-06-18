import { createClient } from '@supabase/supabase-js'

// These environment variables should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export const getMCPAccessToken = () =>
  import.meta.env.VITE_SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_ACCESS_TOKEN;
