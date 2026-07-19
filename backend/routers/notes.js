const express = require('express')
const { authentificateToken } = require('../utilities')
const {addNote, editNote, getAllNotes} = require('../controllers/notes')
const routerNote = express.Router()

routerNote.post('/add-note', authentificateToken, addNote)
routerNote.put('/edit-note:noteId', authentificateToken, editNote)
routerNote.put('/get-all-notes', authentificateToken, getAllNotes)

module.exports = routerNote;