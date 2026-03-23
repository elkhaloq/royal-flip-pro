import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjjypopnmflwpggstafy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqanlwb3BubWZsd3BnZ3N0YWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzc2NjEsImV4cCI6MjA4OTgxMzY2MX0.3qmcvKkiNpiv7ybQmihEeBU0EKkJxj0v3AqOZa7t824'

export const supabase = createClient(supabaseUrl, supabaseKey)
