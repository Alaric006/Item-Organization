import {createClient} from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Supabase URL:', process.env.SUPABASE_URL)
console.log('Supabase Key exists:', process.env.SUPABASE_ANON_KEY)

if (!supabaseURL || !supabaseKey) {
    console.error("Cannot load supabaseURL and supabaseKEY environmental variables!");
    throw new Error("Cannot load supabaseURL and supabaseKEY environmental variables!");
}

export const supabase = createClient(supabaseURL, supabaseKey);