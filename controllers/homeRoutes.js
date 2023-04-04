const router = require('express').Router();
const { User, BlogPost } = require('../models');

// Get all blogs and JOIN with user data
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['title', 'content', 'created_at', 'id'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })
        // Serialize data so the template can read it
        const posts = blogPostData.map(post => post.get({ plain: true }))

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// get login page
router.get('/login', async (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('login', function (err, html) {
        if (err) console.error(err);
        res.send(html);
    })
})

module.exports = router