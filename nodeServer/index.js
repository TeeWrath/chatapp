// NODE SERVER FOR THE CHAT APP which handles socket io connections

const io = require('socket.io')(8000)

const users = {}; //stores all the users that are using the app

io.on('connection',socket =>{  //this will handles all the users that join
    
    //The following block handles when a new user joins the chat
    socket.on('new-user-joined', name =>{ //this will handle what happens with each user and specific actions
        console.log("New user", name);
        users[socket.id] = name; //this is with what name user will join
        socket.broadcast.emit('user-joined', name); //this will inform all the users when a new user joins the chat
    })

    //The following block handles when a message is sent through the chatbox
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]} )
    })
})