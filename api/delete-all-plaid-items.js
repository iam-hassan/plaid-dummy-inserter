import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { error } = await supabase
    .from('plaid_items')
    .delete()
    .neq('id', ''); // delete all rows where id is not empty

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json({ message: 'All rows deleted from plaid_items.' });
  }
}
