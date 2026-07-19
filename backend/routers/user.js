const express = require('express')
const {newCount, userCount, login} = require('../controllers/user')
const router = express.Router()

router.get('/', userCount)
router.post('/create-account', newCount)
router.post('/login', login)

module.exports = router