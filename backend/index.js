require('dotenv').config();
const config = require('./config.json');

const User = require('./models/User')

const express = require('express');
const cors = require('cors');
const app = express();

const {authentification} = require('./utilities');
const router = require('./routers/user');
const connectDB = require('./db/connectDB');
const routerNote = require('./routers/notes');

const PORT = process.env.PORT || 3000;

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/user"

connectDB(DATABASE_URL)

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(router);

app.use(routerNote);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;