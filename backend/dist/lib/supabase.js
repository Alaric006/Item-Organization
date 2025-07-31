"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key exists:', process.env.SUPABASE_ANON_KEY);
if (!supabaseURL || !supabaseKey) {
    console.error("Cannot load supabaseURL and supabaseKEY environmental variables!");
    throw new Error("Cannot load supabaseURL and supabaseKEY environmental variables!");
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseURL, supabaseKey);
