const express = require('express')
const db = require('./db')
const cors = require('cors')
const userRouter = require('./routers/user-router')
const taskRouter = require('./routers/task-router')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRouter)
app.use(taskRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})