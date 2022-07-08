const express = require('express')
const path = require('path')
const expressWs = require('express-ws')

const app = express()
expressWs(app)
const chatMessage = {}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => { res.render('index') })

app.ws('/', (ws, req) => {
  if (!chatMessage.users) {
    chatMessage.users = []
  }
  if (!chatMessage.messages) {
    chatMessage.messages = []
  }
  chatMessage.users.push(ws)
  ws.on('message', (data) => {
    console.log('receive ->',data)
    chatMessage.messages.push(data)
    console.log(chatMessage)
    for (const user of chatMessage.users) {
      user.send(data)
    }
  })
  ws.on('close', () => {
    chatMessage.users =chatMessage.users.filter((user) => {
      return user !== ws
    })
  })
})

port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})
