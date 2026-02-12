// Clear all data in Google Sheets
const SHEET_ID = '1GCKtdxwHsJ6CoHU8KurqlS_O_c_kMf6NnzfuDainLHM';
const API_KEY = 'AIzaSyDLs6fqaq_U3P7pfmVuvko44IlWjq7aI_A';
const ADMIN_PASSWORD = 'bangladesh2026';

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { password } = req.body;
        
        if (password !== ADMIN_PASSWORD) {
            return res.status(403).json({ error: 'Invalid password' });
        }
        
        const values = [];
        for (let i = 0; i < 300; i++) {
            values.push(['', '', 0, 0, 0]);
        }
        
        const range = 'Sheet1!C2:G301';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                range: range,
                values: values
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            console.error('Google Sheets API Error:', error);
            return res.status(500).json({ 
                error: 'Failed to clear Google Sheets',
                details: error
            });
        }
        
        res.status(200).json({ success: true, timestamp: Date.now() });
    } catch (error) {
        console.error('Clear error:', error);
        res.status(500).json({ error: error.message });
    }
};
