import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kffmfteepomgbofoqmtu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZm1mdGVlcG9tZ2JvZm9xbXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0OTg1ODIsImV4cCI6MjAzMzA3NDU4Mn0.3PnzPXcapnnK2lCZ7HXR-xJNqO4QnKfxCa3bQyKZ8oE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
