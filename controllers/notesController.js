const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler"); // asyncHandler is used to wrap async functions in try/catch blocks
const bcrypt = require("bcrypt"); // bcrypt is used to hash passwords

// @desc    Get all notes
// @route   GET /notes
// @access  Public

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({}).lean();

    if (!notes?.length) {
        return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
});

// @desc    Get note by id
// @route   GET /notes?id=123
// @access  Public

const getNoteById = asyncHandler(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Please provide an id" });
    }

    const note = await Note.findById(id).lean();

    if (!note) {
        return res.status(404).json({ message: "Note not found" });

    }

    res.status(200).json(note);
});

// @desc    Create new note
// @route   POST /notes
// @access  Public

const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }
});

// @desc    Update note
// @route   PATCH /notes
// @access  Public

const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    // confirm data
    if (!id || !user || !title || !text) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const note = await Note.findById(id).lean();

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    // check if title already exists
    const duplicate_title = await Note.find({ title }).lean().exec();

    if (!duplicate_title?.length) {
        return res.status(400).json({ message: "Title already exists" });
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    if (!updatedNote) {
        return res.status(500).json({ message: "Error updating note" });
    }

    res.status(200).json(`Note ${title} updated successfully`);

});

// @desc    Delete note
// @route   DELETE /notes
// @access  Public

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // confirm data
    if (!id) {
        return res.status(400).json({ message: "Please provide an id" });
    }

    const note = await Note.findById(id).lean();

    if (!note) {
        return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = await note.remove();

    if (!deletedNote) {
        return res.status(500).json({ message: "Error deleting note" });
    }

    res.status(200).json(`Note ${note.title} deleted successfully`);

});

module.exports = { getAllNotes, getNoteById, createNewNote, updateNote, deleteNote };