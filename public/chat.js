const message = document.getElementById('message')
const boxchat = document.getElementById('boxchat')
const chatMessage = document.getElementById('chatMessage')
const time = document.getElementById('time')

const chatEvent = new WebSocket(`ws://${location.host}${location.pathname}`)
chatEvent.addEventListener('open', () => {
  console.log(`ws://${location.host}${location.pathname}`)
})

chatEvent.addEventListener('close', () => {
  console.log('disconnected')
})

chatEvent.addEventListener('message', ({data}) => {
  const result = JSON.parse(data)
  console.log(`messsage-> ${result.chat} , time-> ${result.time}`)
  const chatbox = document.createElement('chatbox')
  const divchat = document.createElement('chatMessage')
  const time = document.createElement('time')
  chatbox.classList.add('bg-secondary','text-white','py-2','rounded','mt-2','px-2','d-flex','justify-content-between')
  divchat.classList.add('mr-auto')
  divchat.innerText = result.chat
  time.innerText = result.time
  chatbox.append(divchat,time)
  chatMessage.append(chatbox)
})

async function onSendMessage (event) {
  event.preventDefault()
  chatEvent.send(message.value)
  message.value = ''
}
