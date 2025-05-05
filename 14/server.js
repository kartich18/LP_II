const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3014;

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint to get users
app.get('/api/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Error reading user data' });
        }
        const users = JSON.parse(data);
        res.json(users);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});