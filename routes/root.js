const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

// '^/$|/index(.html)?': This is a regular expression that matches either the root URL (/) or /index or /index.html. The ^/$ part matches the root URL, the | character means "or", and /index(.html)? matches /index or /index.html.
    

module.exports = router