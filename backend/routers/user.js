const express = require('express')
const {newCount, userCount, login, getUser} = require('../controllers/user')
const { authentificateToken } = require('../utilities')
const router = express.Router()

router.get('/', userCount)
router.post('/create-account', newCount)
router.post('/login', login)
router.get('/get-user', authentificateToken, getUser)

module.exports = router