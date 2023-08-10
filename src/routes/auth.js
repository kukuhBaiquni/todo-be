const express = require('express')
const controller = require('../controller/auth')

const router = express.Router()

router.post('/register', controller.register)
router.post('/create-user', controller.createUser)


module.exports = router