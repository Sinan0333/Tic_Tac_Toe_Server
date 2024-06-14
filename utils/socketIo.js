const app = require('../app')
const http = require('http')
const socketIo = require('socket.io');

const server = http.createServer(app)
const io = socketIo(server,{
    cors:{
        origin:process.env.CLIENT_URL,                                          
    }
})


const players = [];


io.on('connection', (socket) => {

    socket.on('register',({_id,role,turn,room})=>{
        const checkExist = players.find((player) => player._id === _id);
        const checkRoom = players.find((player)=>player.room === room)
        if(role ==='x' && checkRoom){
            io.to(socket.id).emit('message',"Room is already exist")
            return
        }
        if(!checkExist){
            players.push({_id,socketId:socket.id,role,turn,room});
        }else{
            checkExist.socketId = socket.id
        }
        if(role ==='o'){
            if(checkRoom){
                io.to(checkRoom.socketId).emit('join',socket.id);
                io.to(socket.id).emit('join',checkRoom.socketId);
            }else{
                io.to(socket.id).emit("message","Room is unavailable")
            }
        }else{
            io.to(socket.id).emit("message","Please wait for the opponent to join");
        }
    })

    socket.on('get_opponent',(socketId)=>{
        const player = players.find((player) => player.socketId === socketId);
        io.to(socket.id).emit("get_opponent",player)
    })

    socket.on('play',(({to,data})=>{
        io.to(to).emit('play',data)
    }))

    socket.on('chang_turn',((to)=>{

        const opponent = players.find((player) => player.socketId === to);
        const player = players.find((player) => player.socketId === socket.id);

        opponent.turn = !opponent.turn
        player.turn = !player.turn
        
        io.to(to).emit("chang_turn",opponent.turn)

    }))
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
      const user = players.find((player)=>player.socketId === socket.id)
      players.splice(players.indexOf(user),1)
    });
  });



module.exports = server