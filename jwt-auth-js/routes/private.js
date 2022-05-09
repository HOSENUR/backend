const express = require('express');
const router = express.Router();
const {getPrivateData} = require('../controllers/private.js');

router.route("/").get(getPrivateData);

module.exports = router;