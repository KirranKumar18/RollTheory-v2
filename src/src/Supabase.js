import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gchkcflpptienueknixn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjaGtjZmxwcHRpZW51ZWtuaXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0ODg1MDIsImV4cCI6MjA1NDA2NDUwMn0.UsElGtIm9HkpqFyUuPIxkfR7Rh1zfjYNltljZDEnmMM'
export const supabase = createClient(supabaseUrl, supabaseKey)