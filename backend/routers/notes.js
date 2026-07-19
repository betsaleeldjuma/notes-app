const express = require('express')
const { authentificateToken } = require('../utilities')
const addNote = require('../controllers/notes')
const routerNote = express.Router()

routerNote.post('/add-note', authentificateToken, addNote)
routerNote.put('/edit-note:noteId', authentificateToken, addNote)

module.exports = routerNote;