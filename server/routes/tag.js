const express = require('express');
const {createTag, getAllTags, getTag, getQuestionsByTag} = require('../handlers/tag');
const router = express.Router();

router.post('/', createTag);
router.get('/', getAllTags);
router.get('/:id', getTag);
module.exports = router;
