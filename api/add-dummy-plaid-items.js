import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const batchSize = 500; // Insert 500 rows per batch
  let totalInserted = 0;
  for (let batch = 0; batch < 18; batch++) { // 18*500=9000
    const dummyRows = [];
    for (let i = 0; i < batchSize; i++) {
      const idx = batch * batchSize + i;
      dummyRows.push({
        owner_email: `dummy${idx}@example.com`,
        plaid_access_token: `dummy_access_token_${idx}`,
        plaid_item_id: `dummy_item_id_${idx}`,
        plaid_cursor: null,
        institution_name: `Dummy Bank ${idx}`,
        google_sheet_id: `sheet_${idx}`,
        google_sheet_name: `SheetName${idx}`,
        tab_name: `Tab${idx}`,
        sheet_mode: 'existing',
        account_nickname: `Account${idx}`,
        account_mask: `${1000 + idx}`,
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
    console.log("Data inserted bro");
    if (error) {
      return res.status(500).json({ error });
    }
    totalInserted += data ? data.length : 0;
  }
  res.status(200).json({ inserted: totalInserted });
}