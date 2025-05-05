const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3015;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(__dirname));

// API endpoint to get products
app.get('/api/products', (req, res) => {
    fs.readFile(path.join(__dirname, 'products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading product data' });
        }
        const products = JSON.parse(data);
        res.json(products);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});