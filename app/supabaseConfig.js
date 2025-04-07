// app/supabaseConfig.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jiafidpathhfvokesllh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYWZpZHBhdGhoZnZva2VzbGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzA1MzQsImV4cCI6MjA1OTM0NjUzNH0.R0bV4Ds2rTCQ8RI1982rqJ23unnsBApjuBrgRbknsIQ';

export const supabase = createClient(supabaseUrl, supabaseKey);