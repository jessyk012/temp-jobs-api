const express = require('express');
const router = express.Router();

const {
    httpRegister,
    httpLogin
} = require('../controllers/auth')

router.route('/register').post(httpRegister);
router.route('/login').post(httpLogin);

module.exports = router;