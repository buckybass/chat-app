const message = document.getElementById('message')
const chatMessage = document.getElementById('chatMessage')

const chatEvent = new WebSocket(`ws://${location.host}${location.pathname}`)
chatEvent.addEventListener('open', () => {
  console.log(`ws://${location.host}${location.pathname}`)
})

chatEvent.addEventListener('close', () => {
  console.log('disconnected')
})

chatEvent.addEventListener('message', ({data}) => {
  console.log('recieve->',data)
  const div = document.createElement('div')
  div.classList.add('bg-secondary','text-white','py-2','rounded','mt-2','px-2')
  div.innerText = data
  chatMessage.append(div)
})

// chatEvent.addEventListener('message', (event) => {
//   const div = document.createElement('div')
//   div.classList.add('bg-secondary','text-white','py-2','rounded','mt-3','px-2')
//   div.innerText = (event.data).message
//   chatMessage.append(div)
// })

async function onSendMessage (event) {
  event.preventDefault()
  chatEvent.send(message.value)
  message.value = ''
}
