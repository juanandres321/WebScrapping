const express = require('express');
const { getInfo } = require('../controllers/playwrightController');

const router = express.Router();

router.get('/getInfo', getInfo);

module.exports = router;