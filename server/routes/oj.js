const express = require('express');
const router = express.Router();
// const {signUp,signIn}=require('../handlers/auth')
const submission = require('../handlers/oj');

router.post('/run', submission.post);
router.get('/:submissionId', submission.get);
// router.post('/cb', submission.done);
module.exports = router;
