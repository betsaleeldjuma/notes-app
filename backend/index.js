require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');

// Connexion MongoDB
// mongoose.connect(config.connectionString);

const User = require('./models/user.models')

const express = require('express');
const cors = require('cors');
const app = express('');

const jwt = require('jsonwebtoken');
const {authentification} = require('./utilities');
const router = require('./routers/user');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;