const message = document.getElementById('message')
const chatMessage = document.getElementById('chatMessage')

const chatEvent = new EventSource('https://chatapp57.herokuapp.com/chat')
chatEvent.addEventListener('message', (event) => {
  const div = document.createElement('div')
  div.classList.add('bg-secondary','text-white','py-2','rounded','mt-3','px-2')
  div.innerText = JSON.parse(event.data).message
  chatMessage.append(div)
})
async function onSendMessage (event) {
  event.preventDefault()
  await fetch('/chat', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message.value})
  })
  message.value = ''
}
