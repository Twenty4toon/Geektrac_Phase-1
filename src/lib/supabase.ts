import { createClient } from "@supabase/supabase-js"

// Placeholder credentials - Replace with your actual project details
const supabaseUrl = "https://your-project-url.supabase.co"
const supabaseAnonKey = "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
