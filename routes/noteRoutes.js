const express = require('express')
const router = express.Router()
const noteController = require('../controllers/notesController')

router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.createNewNote)
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

router.route('/fetch')
    .get(noteController.getNoteById)

module.exports = router