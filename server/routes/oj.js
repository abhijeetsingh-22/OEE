const express = require('express');
const router = express.Router();
// const {signUp,signIn}=require('../handlers/auth')
const oj = require('../handlers/oj');

router.post('/run', oj.runCode);
router.get('/langs', oj.fetchLangs);
router.get('/:submissionId', oj.getSubId);
// router.post('/cb', submission.done);
module.exports = router;
