const io = require("socket.io-client");

let socket = io.connect("http://192.168.100.147:3000");

socket.on("welcome", (data) => {
    console.log("Received", data);

    socket.emit("data", "Hi! whats up");

    socket.emit("connectionRequest", "hammad")

    socket.emit("getMsg", {
        toid: socket.id,
        msg: "hahahahaha",
        name: "hamza"
    })

    socket.on("sendMsg", (data) => {
        console.log(data)
        console.log("ssdfsd")
    });
});