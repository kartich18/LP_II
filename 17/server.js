const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3017;

app.use(cors());
app.use(express.static('public'));

// API endpoint to get all employees
app.get('/api/employees', (req, res) => {
    fs.readFile(path.join(__dirname, 'employees.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading employee data' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});