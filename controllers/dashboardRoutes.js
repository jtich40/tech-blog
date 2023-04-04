const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth')

// get all posts created by user
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['title', 'content', 'created_at', 'id'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
        })
        console.log(blogPostData)
        const post = blogPostData.map(post => post.get({ plain: true }))
        res.render('dashboard', {
            post,
            logged_in: true,
            username: req.session.username
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// create blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

module.exports = router;