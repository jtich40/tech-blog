const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Get all blogs and JOIN with user data
router.get('/', async (req ,res) => {
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

// Get specific blog post created by user
// router.get('/:id', async (req, res) => {
//     try {
//         const blogPostData = await BlogPost.findOne({
//             where: {
//                 id: req.params.id
//             },
//             include: [
//                 {
//                     model: Comment,
//                     include: [
//                         {
//                             model: User,
//                             attributes: ['username']
//                         }
//                     ]
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         if (!blogPostData) {
//             // handle the case where no blog post was found with the given id
//             res.status(404).send('Blog post not found')
//             return
//         }

//         const post = blogPostData.map(post => post.get({ plain: true }))
        
//         res.render('blog', {
//             post,
//             logged_in: req.session.logged_in
//         })

//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }
// })



// get login page
router.get('/login', async (req ,res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return
    }
    res.render('login', function(err, html) {
        if (err) console.error(err);
        res.send(html);
      })
})

// get dashboard page, use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req ,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }]
            })
        const user = userData.get({ plain: true })
        res.render('dashboard', {
            ...user,
            logged_in: true
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router