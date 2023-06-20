const io = require("socket.io")();


const initializeSocketIO ={
   io :io
  };

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`User left room: ${roomId}`);
    });

    socket.on("sendMessage", ( newMessage ) => {
      console.log(newMessage,"newmwssage in socket");
      io.to(newMessage.roomId).emit("receiveMessage", {newMessage} );
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });;

module.exports = initializeSocketIO;
