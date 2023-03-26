// get single post
// update post
// delete post
// create new comment on blog post

const router = require('express').Router()
const { BlogPost, User, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Get specific blog post created by user
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        if (!blogPostData) {
            // handle the case where no blog post was found with the given id
            res.status(404).send('Blog post not found')
            return
        }

        const post = blogPostData.get({ plain: true })
        
        res.render('blog', {
            post,
            logged_in: req.session.logged_in
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updatePost)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// delete post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(deletePost)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// create new comment on blog post
router.post("/:id", withAuth, async (req, res) => {
    try {
     const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        blog_post_id: req.params.id
    })
    res.status(200).json(newComment)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});


module.exports = router
