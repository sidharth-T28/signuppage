const express = require('express');
const bodyParser = require('body-parser');
const client = require('./database');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

client.connect();

app.post('/login', (req, res) => {
    const { email, pass } = req.body;
    // Query database to check if email and password exist
    client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pass], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (result.rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        // If user exists and credentials match, return success
        
        res.status(200).send({ message: 'Login successful', username: result.rows[0].name });

    });
});

app.post('/register', (req, res) => {
    const { email, pass, name } = req.body;
    // Insert new user into database
    client.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, pass, name], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Registration successful');
    });
});

app.get('/welcome', (req, res) => {
    res.send('Welcome to the application!');
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
