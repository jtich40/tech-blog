const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth')

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

module.exports = router;
