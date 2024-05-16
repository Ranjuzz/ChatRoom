const cht = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')


// Url la irunthu values edukorom
const queryParams = new URLSearchParams(window.location.search);

const username = queryParams.get('username');
const room = queryParams.get('room');

const socket = io();

// chatroom la join pana porom
socket.emit('joinRoom', {username, room});

// room and users
socket.on('roomUsers' , ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

// message from the server
socket.on('message', message => {
    // console.log(message);
    outputMessage(message);

    // puthu msg anupuralam manual ah kila poi pakama athuvey pograku oru line uh
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

cht.addEventListener('submit', (event)=> {
    // ithu ethuku na nama dat vanthu file ah submit agama thadukuraku 
    event.preventDefault();


    // msg id vachu individual msg ah fetch panrom!
    const msg = event.target.elements.msg.value;
    socket.emit('chatMessage',msg)

    // clearing input athavuthu oru msg type pani send pana aprm text filed la irumthu atha clear panrom
    event.target.elements.msg.value = '';
    event.target.elements.msg.value.focus();


})

// ipa ena na message ah avngi antha message ah elaruku theriyurua mari display la poda poromeyyy
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span</p>
    <p class="text"> 
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// room function DOM(Data Object Model)
function outputRoomName(room) {
    roomName.innerText = room;
}

// users to DOM
function outputUsers(users) {
    userList.innerHTML=`
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

