const express = require('express')
const { authentificateToken } = require('../utilities')
const addNote = require('../controllers/notes')
const router = express.Router()

router.post('/add-note', authentificateToken, addNote)