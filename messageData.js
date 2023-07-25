const messageData = {};

function addMessage(user1, user2, message) {
  const key = user1 + user2;
  if (!messageData[key]) {
    messageData[key] = []; // Create a new array if it doesn't exist
  }

  messageData[key].push(message); // Push the new message to the array
  // console.log("message data is " + messageData[key]);
  // let msg = messageData[user1 + user2];

  // if (msg) msg.push(message);
  // else msg = [message];

  // messageData[user1 + user2] = msg;
  // console.log("message data is " + messageData[user1 + user2]);
  return messageData[key];
}

function getMessage(user1, user2) {
  //   return "shii";

  // console.log(JSON.stringify(messageData));

  return messageData[user1 + user2];
}

module.exports = {
  addMessage,
  getMessage,
};
