import { supabase } from '../lib/supabase'

export async function testConnection() {
  try {
    // Try to get the current user as a simple test
    const { data, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Connection test failed:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('Connection test successful!')
    return { success: true, data }
  } catch (error) {
    console.error('Connection test failed:', error)
    return { success: false, error }
  }
} 