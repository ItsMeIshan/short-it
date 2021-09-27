const express = require('express');
const {postUrl, getOrignalUrl} = require('../controllers/urlShort');
const router = express.Router();

router.route('/shorturl').post(postUrl);
router.route('/shorturl/:short_url').get(getOrignalUrl);
module.exports = router;