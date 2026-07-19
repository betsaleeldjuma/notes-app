const express = require('express')
const {newCount, userCount} = require('../controllers/user')
const router = express.Router()

router.get('/', userCount)
router.post('/create-account', newCount)

module.exports = router