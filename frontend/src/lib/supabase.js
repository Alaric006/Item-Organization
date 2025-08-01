import {createClient} from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL)
console.log('Supabase Key exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseURL, supabaseKey);