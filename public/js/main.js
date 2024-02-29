const chatForm = document.getElementById('chat-form')
const inputMessage = document.getElementById('in_msg')
const chatBox = document.getElementById('chat-box')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


const { userName, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
const socket = io();


socket.emit('joinRoom', { userName, room })

socket.on('roomUsers', ({ room, users }) => {
    roomNameHandler(room)
    userListHandler(users);
})

socket.on('message', (data) => {
    outPutMessage(data)
})



chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = inputMessage.value
    socket.emit('chatMessage', message)
    inputMessage.value = ""
    inputMessage.focus()
})


function outPutMessage(data) {
    const div = document.createElement('div')
    div.classList.add('chat-item')
    div.classList.add('alert')
    div.classList.add('alert-dark')
    div.innerHTML = `<p class="text-primary">${data.userName}
    <span class="text-secondary">${data.time}</span></p>
    <p class="text">${data.text}</p>`;
    chatBox.appendChild(div)
    chatBox.scrollTop = chatBox.scrollHeight;
}

function roomNameHandler(room) {
    roomName.innerText = room
}

function userListHandler(users) {
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement('li')
        li.innerText = user.userName
        userList.appendChild(li)
    })
}

