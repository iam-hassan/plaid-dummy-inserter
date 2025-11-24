import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const dummyRows = [];
  for (let i = 0; i < 9000; i++) {
    dummyRows.push({
      owner_email: `dummy${i}@example.com`,
      plaid_access_token: `dummy_access_token_${i}`,
      plaid_item_id: `dummy_item_id_${i}`,
      plaid_cursor: null,
      institution_name: `Dummy Bank ${i}`,
      google_sheet_id: `sheet_${i}`,
      google_sheet_name: `SheetName${i}`,
      tab_name: `Tab${i}`,
      sheet_mode: 'existing',
      account_nickname: `Account${i}`,
      account_mask: `${1000 + i}`,
      sync_enabled: true,
      status: 'active',
      last_error: null,
      last_sync_at: null,
      created_at: new Date().toISOString()
    });
  }

  const { data, error } = await supabase
    .from('plaid_items')
    .insert(dummyRows);

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json({ inserted: data ? data.length : 0 });
  }
}
