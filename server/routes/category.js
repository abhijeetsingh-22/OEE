const express=require('express');
const { createCategory } = require('../handlers/category');
const router= express.Router();

router.post('/',createCategory)

module.exports=router