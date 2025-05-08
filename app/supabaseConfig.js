// app/supabaseConfig.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhfknybnwqscawxctzfd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZmtueWJud3FzY2F3eGN0emZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NDg1NTcsImV4cCI6MjA2MjAyNDU1N30.jpaW1wvWpxH3efN09ad0gl-l-5x5oRTdAnnCMniYe5M';

export const supabase = createClient(supabaseUrl, supabaseKey);