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

const DATABASE_URL = process.env.DATABASE_URL || config.connectionString

if(!DATABASE_URL) {
  console.error('DATABASE_URL is not defined. Provide it via env or config.json')
  process.exit(1)
}

const startServer = async () => {
  try {
    await connectDB(DATABASE_URL)

    app.use(express.json());

    app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "https://notes-app-indol-chi.vercel.app",
          "https://notes-3jrtr1rx0-betsaleel-djumas-projects.vercel.app"
        ],
      })
    );

    app.use(router);
    app.use(routerNote);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error)
    process.exit(1)
  }
}

startServer();
module.exports = app;