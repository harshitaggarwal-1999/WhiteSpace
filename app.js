const express = require("express"); // access
const socket = require("socket.io");

const app = express(); // initialized ad server ready

app.use(express.static("public")); //public folder me jaakr index.html ko display karvaega

let port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log("Listening to port " + port);
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");

    //recieved data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // new transfer data to all connected computer
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})