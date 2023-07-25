var socket = io();
var form = document.getElementById("form");
var input = document.getElementById("input");
var messages = document.getElementById("messages");
var userName = document.getElementById("inputName");
//div input name
var inputDiv = document.getElementById("inputDiv");
//div msg
var msgDiv = document.getElementById("msgDiv");
//current user
var currentUser = document.getElementById("currentUser");
//friend input
var friendName = document.getElementById("inputNameFriend");
//friend not found div
var friendNotFound = document.getElementById("currentUserFriend");

function valueFromClick() {
  // if (!userName.value) {
  //   return;
  // }
  socket.emit("connect user", userName.value);
  // currentUser.style.display = "block";
  // inputDiv.style.display = "none";
}

function valueFromClickFriend() {
  // console.log(friendName.value);
  socket.emit(
    "connect user friend",
    userName.value,
    friendName.value,
    "This is encriypted chat start chatting"
  );
  // msgDiv.style.display = "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(input.value);
  if (input.value) {
    socket.emit(
      "chat message",
      userName.value,
      friendName.value,
      userName.value + "->" + input.value
    );
    input.value = "";
  }
});

// socket.on("chat message", (msg, userName) => {
//   var text = document.createElement("li");
//   text.textContent = userName + "-> " + msg;
//   messages.appendChild(text);
//   window.scrollTo(0, document.body.scrollHeight);
// });

socket.on("chat message", (message) => {
  console.log(message);
  if (msgDiv.style.display === "none") {
    msgDiv.style.display = "block";
    friendNotFound.innerText = "chating with " + friendName.value;
  }

  // console.log(msgDiv.style.display);

  // message.forEach((msg) => {
  var text = document.createElement("li");
  text.textContent = message;
  messages.appendChild(text);
  window.scrollTo(0, document.body.scrollHeight);
  // });
});

socket.on("friend not found", (friendName) => {
  // msgDiv.style.display = "none";
  // friendNotFound.style.display = "block";
  friendNotFound.innerText = friendName + " not found";
});

socket.on("user updated", (user) => {
  currentUser.innerText = "User Login as " + user;
});
