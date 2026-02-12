// Get data from Google Sheets
const SHEET_ID = '1GCKtdxwHsJ6CoHU8KurqlS_O_c_kMf6NnzfuDainLHM';
const API_KEY = 'AIzaSyDLs6fqaq_U3P7pfmVuvko44IlWjq7aI_A';

const constituencyNames = [
    "Dhaka-1", "Dhaka-2", "Dhaka-3", "Dhaka-4", "Dhaka-5", "Dhaka-6", "Dhaka-7", "Dhaka-8", "Dhaka-9", "Dhaka-10",
    "Dhaka-11", "Dhaka-12", "Dhaka-13", "Dhaka-14", "Dhaka-15", "Dhaka-16", "Dhaka-17", "Dhaka-18", "Dhaka-19", "Dhaka-20",
    "Gazipur-1", "Gazipur-2", "Gazipur-3", "Gazipur-4", "Gazipur-5", "Gazipur-6",
    "Tangail-1", "Tangail-2", "Tangail-3", "Tangail-4", "Tangail-5", "Tangail-6", "Tangail-7", "Tangail-8",
    "Kishoreganj-1", "Kishoreganj-2", "Kishoreganj-3", "Kishoreganj-4", "Kishoreganj-5", "Kishoreganj-6",
    "Manikganj-1", "Manikganj-2", "Manikganj-3",
    "Munshiganj-1", "Munshiganj-2", "Munshiganj-3",
    "Narayanganj-1", "Narayanganj-2", "Narayanganj-3", "Narayanganj-4", "Narayanganj-5",
    "Narsingdi-1", "Narsingdi-2", "Narsingdi-3", "Narsingdi-4", "Narsingdi-5",
    "Faridpur-1", "Faridpur-2", "Faridpur-3", "Faridpur-4",
    "Gopalganj-1", "Gopalganj-2", "Gopalganj-3",
    "Madaripur-1", "Madaripur-2", "Madaripur-3",
    "Rajbari-1", "Rajbari-2",
    "Shariatpur-1", "Shariatpur-2", "Shariatpur-3",
    "Chattogram-1", "Chattogram-2", "Chattogram-3", "Chattogram-4", "Chattogram-5", "Chattogram-6", "Chattogram-7", "Chattogram-8",
    "Chattogram-9", "Chattogram-10", "Chattogram-11", "Chattogram-12", "Chattogram-13", "Chattogram-14", "Chattogram-15", "Chattogram-16",
    "Cumilla-1", "Cumilla-2", "Cumilla-3", "Cumilla-4", "Cumilla-5", "Cumilla-6", "Cumilla-7", "Cumilla-8", "Cumilla-9", "Cumilla-10", "Cumilla-11",
    "Brahmanbaria-1", "Brahmanbaria-2", "Brahmanbaria-3", "Brahmanbaria-4", "Brahmanbaria-5", "Brahmanbaria-6",
    "Chandpur-1", "Chandpur-2", "Chandpur-3", "Chandpur-4", "Chandpur-5",
    "Lakshmipur-1", "Lakshmipur-2", "Lakshmipur-3", "Lakshmipur-4",
    "Noakhali-1", "Noakhali-2", "Noakhali-3", "Noakhali-4", "Noakhali-5", "Noakhali-6",
    "Feni-1", "Feni-2", "Feni-3",
    "Cox's Bazar-1", "Cox's Bazar-2", "Cox's Bazar-3", "Cox's Bazar-4",
    "Khagrachari", "Rangamati", "Bandarban",
    "Rajshahi-1", "Rajshahi-2", "Rajshahi-3", "Rajshahi-4", "Rajshahi-5", "Rajshahi-6",
    "Bogura-1", "Bogura-2", "Bogura-3", "Bogura-4", "Bogura-5", "Bogura-6", "Bogura-7",
    "Chapai Nawabganj-1", "Chapai Nawabganj-2", "Chapai Nawabganj-3",
    "Naogaon-1", "Naogaon-2", "Naogaon-3", "Naogaon-4", "Naogaon-5", "Naogaon-6",
    "Natore-1", "Natore-2", "Natore-3", "Natore-4",
    "Pabna-1", "Pabna-2", "Pabna-3", "Pabna-4", "Pabna-5",
    "Sirajganj-1", "Sirajganj-2", "Sirajganj-3", "Sirajganj-4", "Sirajganj-5", "Sirajganj-6",
    "Joypurhat-1", "Joypurhat-2",
    "Khulna-1", "Khulna-2", "Khulna-3", "Khulna-4", "Khulna-5", "Khulna-6",
    "Bagerhat-1", "Bagerhat-2", "Bagerhat-3",
    "Jashore-1", "Jashore-2", "Jashore-3", "Jashore-4", "Jashore-5", "Jashore-6",
    "Jhenaidah-1", "Jhenaidah-2", "Jhenaidah-3", "Jhenaidah-4",
    "Kushtia-1", "Kushtia-2", "Kushtia-3", "Kushtia-4",
    "Satkhira-1", "Satkhira-2", "Satkhira-3", "Satkhira-4",
    "Chuadanga-1", "Chuadanga-2",
    "Magura-1", "Magura-2",
    "Meherpur-1", "Meherpur-2",
    "Narail-1", "Narail-2",
    "Barishal-1", "Barishal-2", "Barishal-3", "Barishal-4", "Barishal-5", "Barishal-6",
    "Barguna-1", "Barguna-2",
    "Bhola-1", "Bhola-2", "Bhola-3", "Bhola-4",
    "Jhalokati-1", "Jhalokati-2",
    "Patuakhali-1", "Patuakhali-2", "Patuakhali-3", "Patuakhali-4",
    "Pirojpur-1", "Pirojpur-2", "Pirojpur-3",
    "Sylhet-1", "Sylhet-2", "Sylhet-3", "Sylhet-4", "Sylhet-5", "Sylhet-6",
    "Habiganj-1", "Habiganj-2", "Habiganj-3", "Habiganj-4",
    "Moulivibazar-1", "Moulivibazar-2", "Moulivibazar-3", "Moulivibazar-4",
    "Sunamganj-1", "Sunamganj-2", "Sunamganj-3", "Sunamganj-4", "Sunamganj-5",
    "Rangpur-1", "Rangpur-2", "Rangpur-3", "Rangpur-4", "Rangpur-5", "Rangpur-6",
    "Dinajpur-1", "Dinajpur-2", "Dinajpur-3", "Dinajpur-4", "Dinajpur-5", "Dinajpur-6",
    "Gaibandha-1", "Gaibandha-2", "Gaibandha-3", "Gaibandha-4", "Gaibandha-5",
    "Kurigram-1", "Kurigram-2", "Kurigram-3", "Kurigram-4",
    "Lalmonirhat-1", "Lalmonirhat-2", "Lalmonirhat-3",
    "Nilphamari-1", "Nilphamari-2", "Nilphamari-3", "Nilphamari-4",
    "Panchagarh-1", "Panchagarh-2",
    "Thakurgaon-1", "Thakurgaon-2", "Thakurgaon-3",
    "Mymensingh-1", "Mymensingh-2", "Mymensingh-3", "Mymensingh-4", "Mymensingh-5",
    "Mymensingh-6", "Mymensingh-7", "Mymensingh-8", "Mymensingh-9", "Mymensingh-10", "Mymensingh-11",
    "Jamalpur-1", "Jamalpur-2", "Jamalpur-3", "Jamalpur-4", "Jamalpur-5",
    "Netrokona-1", "Netrokona-2", "Netrokona-3", "Netrokona-4", "Netrokona-5",
    "Sherpur-1", "Sherpur-2", "Sherpur-3"
];

function determineWinner(jamaatVotes, bnpVotes, othersVotes) {
    if (jamaatVotes === 0 && bnpVotes === 0 && othersVotes === 0) {
        return 'uncalled';
    }
    if (jamaatVotes > bnpVotes && jamaatVotes > othersVotes) {
        return 'jamaat';
    } else if (bnpVotes > jamaatVotes && bnpVotes > othersVotes) {
        return 'bnp';
    } else if (othersVotes > jamaatVotes && othersVotes > bnpVotes) {
        return 'others';
    }
    return 'uncalled';
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const range = 'Sheet1!A2:G301';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const data = constituencyNames.map((name, i) => ({
                number: i + 1,
                name: name,
                winner: 'uncalled',
                winnerName: '',
                winnerSymbol: '',
                jamaatVotes: 0,
                bnpVotes: 0,
                othersVotes: 0,
                reporting: false
            }));
            return res.status(200).json(data);
        }
        
        const sheetData = await response.json();
        const rows = sheetData.values || [];
        
        const constituencies = [];
        
        for (let i = 0; i < 300; i++) {
            const row = rows[i] || [];
            const jamaatVotes = parseInt(row[4]) || 0;
            const bnpVotes = parseInt(row[5]) || 0;
            const othersVotes = parseInt(row[6]) || 0;
            
            constituencies.push({
                number: i + 1,
                name: row[1] || constituencyNames[i],
                winnerName: row[2] || '',
                winnerSymbol: row[3] || '',
                jamaatVotes: jamaatVotes,
                bnpVotes: bnpVotes,
                othersVotes: othersVotes,
                winner: determineWinner(jamaatVotes, bnpVotes, othersVotes),
                reporting: jamaatVotes > 0 || bnpVotes > 0 || othersVotes > 0
            });
        }
        
        res.status(200).json(constituencies);
    } catch (error) {
        console.error('Error:', error);
        
        const data = constituencyNames.map((name, i) => ({
            number: i + 1,
            name: name,
            winner: 'uncalled',
            winnerName: '',
            winnerSymbol: '',
            jamaatVotes: 0,
            bnpVotes: 0,
            othersVotes: 0,
            reporting: false
        }));
        
        res.status(200).json(data);
    }
};
