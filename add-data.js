const { createClient } = require('@supabase/supabase-js');
const cron = require('node-cron');

const SUPABASE_URL = 'https://xldyqqqzkrfjygikgdfl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZHlxcXF6a3JmanlnaWtnZGZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ3MTc5NiwiZXhwIjoyMDc3MDQ3Nzk2fQ.sT_ASkM6nfzSoM6N9VfHy6UwSwmSKYEuvY5-G9DhioA';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function addDummyData() {
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
    console.error('Insert error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Inserted:', data ? data.length : 0, 'rows');
  }
}

// Schedule to run at 00:18, 04:00, 08:00, 12:00, 16:00 every day

const times = ['30 0 * * *', '0 4 * * *', '0 8 * * *', '0 12 * * *', '0 16 * * *', '0 20 * * *', '0 22 * * *'];
// Schedule to run at 00:18, 04:00, 08:00, 12:00, 16:00 every day

times.forEach(cronTime => {
  cron.schedule(cronTime, () => {
    console.log(`Running addDummyData at ${new Date().toLocaleString()}`);
    addDummyData();
  });
});

// Optional: run immediately for testing
// addDummyData();