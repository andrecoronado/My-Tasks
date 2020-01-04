const express = require('express')
const db = require('./db')
const cors = require('cors')
const userRouter = require('./routers/user-router')
const taskRouter = require('./routers/task-router')
const https = require('https');
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRouter)
app.use(taskRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if(process.env.ENVIRON==='DEV'){
  app.get('/api', function (req, res) {
    res.send('<h1>Welcome to api on-line MyTasks.Space</h1>')
  })
  app.listen(port, () => {
    console.log('Server is up on port ' + port)
  })
}

if(process.env.ENVIRON==='PROD'){
  const httpsServer = https.createServer({
    key: fs.readFileSync('/home/admin/conf/web/ssl.mytasks.space.key'),
    cert: fs.readFileSync('/home/admin/conf/web/ssl.mytasks.space.crt'),
  }, app);

  app.get('/api', function (req, res) {
    res.send('<h1 style="color:green;">Welcome!! Our API MyTasks.Space is on-line! </h1>')
  }) 
  
  app.get('*', function (req, res) {
  res.redirect('https://mytasks.space')
  })

  httpsServer.listen(port, () => {
  console.log('HTTPS Server running on port ' + port);
  });  
}
