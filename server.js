const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static("public"));

//estalish connection
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //send request to join
  socket.on("offer", (offer) => {
    console.log("Offer received!");
    socket.broadcast.emit("offer", offer);
  });

  //send response to offer
  socket.on("answer", (answer) => {
    console.log("Answer received!");
    socket.broadcast.emit("answer", answer);
  });

  //send ice candiate
  socket.on("ice-candidate", (candidate) => {
    console.log("ICE candidate received");
    socket.broadcast.emit("ice-candidate", candidate);
  });

  //connection close
  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(5000, () => {
  console.log("server listen to http://localhost:5000 ");
});
