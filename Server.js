const express = require("express");
const app = express();
const port = 3000;
const http = require("http").createServer();

const io = require("socket.io")(http);

var users = [];

io.on("connection", (socket) => {
    console.log(`connected '${socket.id}'`)


    socket.on('connectionRequest', (userData) => {
		console.log(`userData '${userData.userName}'`)

        users.push({
            id: socket.id,
            userName: userData.userName,
			lat: userData.lat,
			lng: userData.lng
        });

        if(users.length==2){
			 io.to(users[0].id).emit('onConnectionSucceed', users[1]);
			 io.to(users[1].id).emit('onConnectionSucceed', users[0]);
			 console.log(JSON.stringify(users));
		}
       
    });

    /* socket.on('message', (data) => {
        socket.broadcast.to(users[0].id).emit('message', {
            msg: data.msg,
            name: data.name
        });
    }); */
	
	socket.on('onLocationReceiver', (data) => {
		console.log(`onLocationReceiver '${data.socketId}'`)
        socket.broadcast.to(data.socketId).emit('onLocationReceiver', {
            lat: data.lat,
			lng: data.lng,
			id: data.socketId,
			bearing: data.locationBearing,
        });
    });

    socket.emit("welcome", "User connected");

    socket.on("disconnect", () => {
        console.log("disconnected")
    });

    // listen for incoming data msg on this newly connected socket
    socket.on('data', function (data) {
        console.log(`data received is '${data}'`)
    });

});

http.listen(port, () => {
    console.log("Server is listenening at port = " + port);
});
