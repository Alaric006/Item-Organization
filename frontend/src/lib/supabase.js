import {createClient} from "@supabase/supabase-js";

supabaseURL = process.env.REACT_APP_SUPABASE_URL;
supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);