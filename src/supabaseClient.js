import { createClient } from '@supabase/supabase-api'

const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY'
export const supabase = createClient(supabaseUrl, supabaseKey)
