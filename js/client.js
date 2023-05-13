const socket = io('http://localhost:8000'); // connects client to server


const form = document.getElementById('send-container');
const messageInp = document.getElementById('message-box');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

const name = prompt("Enter Your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right');
})

socket.on('received', data =>{
    append(`${data.message}: ${data.user}`, 'left');
    })
