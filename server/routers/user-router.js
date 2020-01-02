const express = require('express')
const userCtrl = require('../controllers/user-ctrl')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/api/users', userCtrl.createUser)
router.get('/api/users/me/:email', userCtrl.getUserByEmail)
router.get('/api/users/me', auth, userCtrl.getUser)
router.patch('/api/users/me', auth, userCtrl.updateUser)
router.delete('/api/users/me', auth, userCtrl.deleteUser)

router.post('/api/users/login', userCtrl.loginUser)
router.post('/api/users/logout', auth, userCtrl.logoutUser)
router.post('/api/users/logoutAll', auth, userCtrl.logoutAll)

router.post('/api/users/me/avatar', auth, userCtrl.uploadAvatar[0], userCtrl.uploadAvatar[1], userCtrl.uploadAvatar[2])
router.delete('/api/users/me/avatar', auth, userCtrl.deleteAvatar)
router.get('/api/users/:id/avatar', userCtrl.getAvatar)

module.exports = router