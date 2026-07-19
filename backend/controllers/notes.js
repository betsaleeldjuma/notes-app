const authentificateToken = require('../utilities')
const Note = require('../models/Note')

const addNote = async (req, res) => {
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if(!title) {
        return res.status(400).json({error: true, message: "Title is required"})
    }

    if(!content) {
        return res.status(400).json({error: true, message: "Content is required"})
    }
}