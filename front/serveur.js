const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/connexion');
});

app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'connexion.html'));
});

app.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, 'inscription.html'));
});

app.get('/clicker', (req, res) => {
    res.sendFile(path.join(__dirname, 'clicker.html'));
});

app.get('/quizz', (req, res) => {
    res.sendFile(path.join(__dirname, 'quizz.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.URL}:${process.env.PORT}`);
});