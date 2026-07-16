const supabaseUrl = "https://anezvycsuuawslymtaji.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZXp2eWNzdXVhd3NseW10YWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMTQxNzgsImV4cCI6MjA5OTc5MDE3OH0.2OSb_aDNEPSMYHpGaNcQ1bkZbGYB84M1odHwlQnn3E0";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);
