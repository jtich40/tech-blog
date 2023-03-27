const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
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

// Get specific blog post created by user
// router.get('/:id', withAuth, async (req, res) => {
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

// // update post
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const updatePost = await BlogPost.update(
//             {
//                 title: req.body.title,
//                 content: req.body.content
//             },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         )
//         res.status(200).json(updatePost)
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json(err)
//     }
// })

// // delete post
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const deletePost = await BlogPost.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         res.status(200).json(deletePost)
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json(err)
//     }
// })


// // update comment on blog post
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         // Query the database to get the comment with the specified ID
//         const comment = await Comment.findByPk(req.params.id);
//         // Verify that the comment belongs to the authenticated user
//         if (comment.user_id !== req.user.id) {
//             return res.status(401).json({ message: "You are not authorized to update this comment" });
//         }
//         const updateComment = await comment.update(
//             {
//                 title: req.body.title,
//                 content: req.body.content
//             },
//             {
//                 where: {
//                     id: req.params.id
//                 }
//             }
//         )
//         res.status(200).json(updateComment)
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json(err)
//     }
// });

// // delete comment on blog post
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const comment = await Comment.findByPk(req.params.id);
//         // Verify that the comment belongs to the authenticated user
//         if (comment.user_id !== req.user.id) {
//             return res.status(401).json({ message: "You are not authorized to update this comment" });
//         }
//         const deleteComment = await comment.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         res.status(200).json(deleteComment)
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json(err)
//     }
// });

module.exports = router;