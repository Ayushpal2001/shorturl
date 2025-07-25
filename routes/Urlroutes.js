const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/Urlcontroller');

// POST /shorten
router.post('/shorten', shortenUrl);

// GET /:shortId
router.get('/:shortId', redirectUrl);

module.exports = router;
