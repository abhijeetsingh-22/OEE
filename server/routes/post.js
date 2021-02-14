const express= require('express')
const { createPost, getAllPostsByThread } = require('../handlers/post')
const router= express.Router()

router.get('/threads/:threadId/posts',getAllPostsByThread)

router.post('/posts',createPost)

module.exports= router