import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mnallgyofcakrycrhhfi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uYWxsZ3lvZmNha3J5Y3JoaGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NTU5NTksImV4cCI6MjEwOTAzMTk1OX0.33PxfgSU4AxYH5vHL1tDD9AfqI2zlkYSq33n704zMkc'

export const supabase = createClient(supabaseUrl, supabaseKey)