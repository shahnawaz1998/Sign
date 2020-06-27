const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('hello')
})


//exporting the router file
module.exports = router