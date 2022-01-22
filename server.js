const io = require("socket.io")();

io.on("connection", (socket) => {
  //console.log("connected");

  socket.on("sendAgents", (pickedAgents) => {
    io.sockets.emit("receiveAgents", pickedAgents);
  });
  
  socket.on("sendVetoMaps", (vetoMaps) => {
    io.sockets.emit("receiveVetoMaps", vetoMaps);
  });

  
  socket.on("sendMapVetoConcluded", (value) => {
    io.sockets.emit("receiveMapVetoConcluded", value);
  });

  socket.on("sendStartTimer", (value) => {
    io.sockets.emit("receiveStartTimer", value);
  });

  /*
  socket.on("sendStartTimer", () => {
      io.sockets.emit("receiveStartTimer");
  });

  socket.on("sendUpdatedPicks", (newPicks) => {
    io.sockets.emit("receiveUpdatedPicks", newPicks);
  });
  */
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
