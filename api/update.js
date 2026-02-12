// Update Google Sheets
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
        const { password, constituencyNumber, winnerName, winnerSymbol, jamaatVotes, bnpVotes, othersVotes } = req.body;
        
        if (password !== ADMIN_PASSWORD) {
            return res.status(403).json({ error: 'Invalid password' });
        }
        
        if (!constituencyNumber || constituencyNumber < 1 || constituencyNumber > 300) {
            return res.status(400).json({ error: 'Invalid constituency number' });
        }
        
        const rowNumber = constituencyNumber + 1;
        
        const values = [[
            constituencyNumber,
            '',
            winnerName || '',
            winnerSymbol || '',
            jamaatVotes || 0,
            bnpVotes || 0,
            othersVotes || 0
        ]];
        
        const range = `Sheet1!A${rowNumber}:G${rowNumber}`;
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
                error: 'Failed to update Google Sheets',
                details: error
            });
        }
        
        const jVotes = parseInt(jamaatVotes) || 0;
        const bVotes = parseInt(bnpVotes) || 0;
        const oVotes = parseInt(othersVotes) || 0;
        
        let winner = 'uncalled';
        if (jVotes === 0 && bVotes === 0 && oVotes === 0) {
            winner = 'uncalled';
        } else if (jVotes > bVotes && jVotes > oVotes) {
            winner = 'jamaat';
        } else if (bVotes > jVotes && bVotes > oVotes) {
            winner = 'bnp';
        } else if (oVotes > jVotes && oVotes > bVotes) {
            winner = 'others';
        }
        
        res.status(200).json({ 
            success: true, 
            constituency: {
                number: constituencyNumber,
                winner: winner,
                winnerName: winnerName || '',
                winnerSymbol: winnerSymbol || '',
                jamaatVotes: jVotes,
                bnpVotes: bVotes,
                othersVotes: oVotes
            },
            timestamp: Date.now() 
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: error.message });
    }
};
