const express=require('express');
const { createThread, getThread,getAllThreads, getAllThreadsByCategory } = require('../handlers/thread');
const router= express.Router();

// returns all the threads under the given category id
router.get('/categories/:categoryId/threads',getAllThreadsByCategory)

router.get('/threads',getAllThreads)

router.post('/threads',createThread)

router.get('/threads/:threadId',getThread)
module.exports=router