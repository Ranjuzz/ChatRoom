import express from "express";
import http from "http";
import { Server } from "socket.io";
import { formatMessage } from "./utils/messages.js";
import { getCurrentUser, userjoin, userLeave, getRoomUsers } from "./utils/users.js";


// Server ah create pamrom
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// asusual public folder la ela files (static) iruku nu solrom
app.use(express.static('./public'));

const botname = "Edhuku"
// const user = "Ranjith"

// Server emiiting
io.on('connection', socket => {

    socket.on('joinRoom', ({username, room}) => {

        const user = userjoin(socket.id,username,room);
        socket.join(user.room);
        
         // epa lam user connect agarano apalam oru message onu anupi avana welcome panrom ie. emiiting a message from server using event emiiters from socket 
        socket.emit('message', formatMessage(botname , `Welcome da ${user.username} bunda!`));

        // now ela users(except him) kum solrom avan connect agitan apdinu!!
        socket.broadcast.to(user.room).emit('message', formatMessage(botname, `${user.username} joined the room!`))

        // if elaruku solanum na use 
        // io.emit()

        // room users info
        io.to(user.room).emit('roomUsers', {
            room : user.room,
            users: getRoomUsers(user.room)
        });

        // message ah fetch pani send panrom
        socket.on('chatMessage', msg => {

            const user = getCurrentUser(socket.id);

            io.to(user.room).emit('message',formatMessage(user.username,msg))

        });

         // Message when user disconnects from chat
        socket.on('disconnect',() => {

            const user = userLeave(socket.id);

            if(user) {
                io.to(user.room).emit('message', formatMessage(botname,`${user.username} left`));
            }

            // user room upadted
            io.to(user.room).emit('roomUsers', {
                room : user.room,
                users: getRoomUsers(user.room)
                });
        });

    });
    
   
    

   

});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
