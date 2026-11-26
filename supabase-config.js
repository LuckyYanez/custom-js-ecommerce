const SUPABASE_URL = 'https://qzbuinrzubpqzmfjpkyv.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YnVpbnJ6dWJwcXptZmpwa3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1Njg4MzUsImV4cCI6MjEwNTE0NDgzNX0.DczWM_AINJHqCXKuczWW0hAicT7-txmgxh0N8Ijft2I';

const { createClient } = window.supabase;


const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

window.supabaseClient = supabaseClient;
supabase-config.js