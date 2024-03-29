const express = require('express')
const path = require('path')
const expressWs = require('express-ws')
const mongoose = require('mongoose')
const Chat = require('./model/Chat')

mongoose.connect('mongodb+srv://Admin:Password@monkey.yasgbdt.mongodb.net/?retryWrites=true&w=majority')
const app = express()
expressWs(app)
const chatMessage = {}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', async (req, res) => {
  const messages = await Chat.find()
  res.render('index', { messages })
})

app.ws('/', (ws, req) => {
  if (!chatMessage.users) {
    chatMessage.users = []
  }
  if (!chatMessage.messages) {
    chatMessage.messages = []
  }
  chatMessage.users.push(ws)
  ws.on('message', async (data) => {
    await Chat.create({ message: data })
    const chat = await Chat.find()
    const chatCount = await Chat.count()
    for (const user of chatMessage.users) {
      let timeChat = new Date(chat[chatCount - 1].recordedAt)
      const momth = ['มกราคม','กุมภาพันธ','มีนาคม','เมษายน','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
      const time = timeChat.getHours()+':'+timeChat.getMinutes()
      const day = timeChat.getDate()+' '+momth[(timeChat.getMonth()-1)]+' '+timeChat.getFullYear()
      const timeall =day+' '+time
      console.log(timeall)
      user.send(JSON.stringify({
        chat: chat[chatCount - 1].message,
        time: timeall
      }))
    }
  })
  ws.on('close', () => {
    chatMessage.users = chatMessage.users.filter((user) => {
      return user !== ws
    })
  })
})

app.get('/delete', async(req, res) => {
  await Chat.deleteMany()
  res.redirect('/')
})

port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})
