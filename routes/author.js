const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const Author = require('../models/author');

//All author route
router.get('/', async(req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions) //we are finding for database using mode Author.find if error occurs it will go catch
            //if no error error occurs it render the author/index page with authors
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })

    } catch {
        res.redirect('/') //if error occur redirect page to home page 
    }

})


//new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})


//create author
router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save() //we are saving the author to db but if some error occurs it will derictly move to catch

        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author, //if it fail data entered should remain there with a error msg
            errorMessage: 'Error creating author' //Error msg
        })

        // author.save((err, newAuthor) => {
        //     if (err) {
        //         res.render('authors/new', {
        //             author: author,
        //             errorMessage: 'Error creating author'
        //         })
        //     } else {
        //         res.redirect('authors')
        //     }
        // })
    }
})



//exporting the router file
module.exports = router