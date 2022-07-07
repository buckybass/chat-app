const express = require('express')
const path = require('path')
const { EventEmitter } = require('events')

const app = express()
const chatMessage = []
const chatEmitter = new EventEmitter()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => { res.render('index') })

app.get('/chat', (req, res) => {
  res.writeHead(200,{
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  })
  const onNewMessageHandler = (message) => {
    res.write(`data: ${JSON.stringify({ message })}\n\n`)
  }
  chatEmitter.on('newMessage', onNewMessageHandler)
  req.on('close', () => {
    chatEmitter.off('newMessage', onNewMessageHandler)
  })
})

app.post('/chat', (req, res) => {
  chatMessage.push(req.body.message)
  chatEmitter.emit('newMessage',req.body.message)
  res.end()
})

port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})
