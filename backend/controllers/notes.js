const authentificateToken = require('../utilities')
const Note = require('../models/Note')

const addNote = async (req, res) => {
    const {title, content, img, tags} = req.body;
    const userId = req.user.id;

    if(!title) {
        return res.status(400).json({error: true, message: "Title is required"})
    }

    if(!content) {
        return res.status(400).json({error: true, message: "Content is required"})
    }

    try {
        const note = new Note({
            title,
            content,
            img,
            tags: tags || [],
            userId: userId
        })

        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note added successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

const editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const {title, content, img, tags, isPinned} = req.body;
    const userId = req.user.id;
    
    if(!title && !content && !tags) {
        return res.status(400).json({error: true, message: "No changes provided"})
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: userId})
        
        if(!note) {
            return res.status(404).json({error: true, message: "Note not found"})
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(img) note.img = img;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

const getAllNotes = async(req, res) => {
    try {
        const notes = await Note.find({userId: req.user.id}).sort({isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        })
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    const userId = req.user.id;
    
    try {
        const note = await Note.findOne({_id: noteId, userId: userId});

        if(!note){
            return res.status(404).json({error: true, message: "Note not found"});
        }

        await Note.deleteOne({_id: noteId, userId: userId});

        return res.json({
            error: false,
            message: "Note deleted successfully",
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

const updateIsPinned = async (req, res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const userId = req.user.id;
    
    if(typeof isPinned !== "boolean") {
        return res.status(400).json({error: true, message: "No changes provided"})
    }

    try {
        const note = await Note.findOne({_id: noteId, userId: userId})
        
        if(!note) {
            return res.status(404).json({error: true, message: "Note not found"})
        }

        note.isPinned = isPinned ;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

const searchNotes = async (req, res) => {
    const userId = req.user.id;
    const {query} = req.query;

    if(!query) {
        return res.status(400).json({
            error: true,
            message: 'Search query is required'
        })
    }

    try {
        const matchingNotes = await Note.find({
            userId: userId,
            $or: [
                {title: {$regex: new RegExp(query, 'i')}},
                {content: {$regex: new RegExp(query, "i")}}
            ]
        })

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Note matching the search query retrieved successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        })
    }
}


module.exports = {addNote, editNote, getAllNotes, deleteNote, updateIsPinned, searchNotes}