const express = require('express')
const auth = require('../middleware/auth')
const taskCtrl = require('../controllers/task-ctrl')
const router = new express.Router()

router.post('/api/tasks', auth, taskCtrl.createTask)
router.get('/api/tasks', auth, taskCtrl.getTasks) // --> /tasks?completed=true || /tasks?limit=10&skip=20 || /tasks?sortBy=createdAt:desc
router.get('/api/tasks/:id', auth, taskCtrl.getTask)
router.patch('/api/tasks/:id', auth, taskCtrl.updateTask)
router.delete('/api/tasks/:id', auth, taskCtrl.deleteTask)
 
module.exports = router