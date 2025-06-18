import { supabase } from '../lib/supabase'

// Generic type for database operations
type DatabaseRecord = {
  id?: string
  created_at?: string
  [key: string]: any
}

// Create a new record
export async function createRecord<T extends DatabaseRecord>(
  table: string,
  data: Omit<T, 'id' | 'created_at'>
) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error(`Error creating record in ${table}:`, error)
    return { success: false, error }
  }
}

// Get a record by ID
export async function getRecordById<T extends DatabaseRecord>(
  table: string,
  id: string
) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error(`Error fetching record from ${table}:`, error)
    return { success: false, error }
  }
}

// Update a record
export async function updateRecord<T extends DatabaseRecord>(
  table: string,
  id: string,
  updates: Partial<T>
) {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error(`Error updating record in ${table}:`, error)
    return { success: false, error }
  }
}

// Delete a record
export async function deleteRecord(
  table: string,
  id: string
) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error(`Error deleting record from ${table}:`, error)
    return { success: false, error }
  }
}

// List records with optional filtering
export async function listRecords<T extends DatabaseRecord>(
  table: string,
  filters?: { [key: string]: any }
) {
  try {
    let query = supabase.from(table).select('*')
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error(`Error listing records from ${table}:`, error)
    return { success: false, error }
  }
} 