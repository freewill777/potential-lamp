import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../db_types";

// const supabaseUrl = SUPABASE_URL;
// const supabaseAnonKey = SUPABASE_ANON_KEY;
const supabaseUrl = "https://znubrljvuaprjaubblwi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudWJybGp2dWFwcmphdWJibHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1OTE2NTEsImV4cCI6MjAwOTE2NzY1MX0.fD7CJo-gx_hfwmqOaJv8dz2K2jPWwMpHh013WwzQDfk";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
