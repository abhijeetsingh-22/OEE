const express=require('express');
const { createCategory,getAllCategories, getCategory} = require('../handlers/category');
const router= express.Router();

router.post('/',createCategory)
router.get('/',getAllCategories)
router.get('/:id',getCategory)
module.exports=router