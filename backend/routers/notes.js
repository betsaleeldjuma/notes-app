const express = require('express')
const { authentificateToken } = require('../utilities')
const {addNote, editNote, getAllNotes, deleteNote} = require('../controllers/notes')
const routerNote = express.Router()

routerNote.post('/add-note', authentificateToken, addNote)
routerNote.put('/edit-note:noteId', authentificateToken, editNote)
routerNote.get('/get-all-notes', authentificateToken, getAllNotes)
routerNote.get('/delete-note/:noteId', authentificateToken, deleteNote)

module.exports = routerNote;