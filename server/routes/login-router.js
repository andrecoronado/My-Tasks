const express = require('express')

const loginCtrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/Login', loginCtrl.createUser)
router.get('/Login/:email', loginCtrl.getUser)

module.exports = router