const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const userData = require("./userData");
const messageData = require("./messageData");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/userChat.html");
});
app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

io.on("connection", (socket) => {
  socket.on("connect user", addUser(socket));

  socket.on("connect user friend", check(socket));

  socket.on("disconnect", () => {
    console.log("user Disconnected");
  });

  socket.on("chat message", check(socket));
});

//add user to database
function addUser(socket) {
  return function (userName) {
    let user = userData.getUser(userName);
    if (!user) {
      user = userData.setUser(socket, userName);
    }
    // console.log(user + " connected");

    socket.emit("user updated", user);
  };
}

//check user
function check(socket) {
  return function (userName, friendName, msg) {
    let friendData = userData.getUser(friendName);
    // let currUser = userData.getUser(userName);
    // console.log(msg);
    // console.log(friendData.socket);
    if (friendData) {
      let fUserMessageData = messageData.getMessage(friendName, userName);
      if (!fUserMessageData) {
        fUserMessageData = messageData.getMessage(userName, friendName);
        fUserMessageData = messageData.addMessage(userName, friendName, msg);
      } else {
        fUserMessageData = messageData.addMessage(friendName, userName, msg);
      }

      friendData.socket.emit(
        "chat message",
        // fUserMessageData
        fUserMessageData[fUserMessageData.length - 1]
      );
      socket.emit(
        "chat message",
        // fUserMessageData
        fUserMessageData[fUserMessageData.length - 1]
      );
      // }
    } else {
      socket.emit("friend not found", friendName);
    }
  };
}

server.listen(3000, () => {
  console.log("running on :3000");
});
