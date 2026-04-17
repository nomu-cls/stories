const { createClient } = require('@supabase/supabase-js');
const BUZZSCOPE_SUPABASE_URL = 'https://yqluegvlauzvgqywnejj.supabase.co';
const BUZZSCOPE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbHVlZ3ZsYXV6dmdxeXduZWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTAzMDYsImV4cCI6MjA4MTk4NjMwNn0.VRSfZybmSi4bUYfITm3K1X6dwBnA68_QZ50a-P_R8-8';
const supabase = createClient(BUZZSCOPE_SUPABASE_URL, BUZZSCOPE_SUPABASE_ANON_KEY);

async function test() {
    const { data: tasks, error: err1 } = await supabase.from('matchbox_tasks').select('*').limit(1);
    console.log("matchbox_tasks:", err1 ? err1.message : (tasks && tasks.length ? Object.keys(tasks[0]) : "Empty"));
}
test();
