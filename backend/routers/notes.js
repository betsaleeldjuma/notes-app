const express = require('express')
const { authentificateToken } = require('../utilities')
const {addNote, editNote, getAllNotes, deleteNote, updateIsPinned} = require('../controllers/notes')
const routerNote = express.Router()

routerNote.post('/add-note', authentificateToken, addNote)
routerNote.put('/edit-note:noteId', authentificateToken, editNote)
routerNote.get('/get-all-notes', authentificateToken, getAllNotes)
routerNote.delete('/delete-note/:noteId', authentificateToken, deleteNote)
routerNote.put('/update-note-pinned/:noteId', authentificateToken, updateIsPinned)

module.exports = routerNote;