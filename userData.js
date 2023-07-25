const userNames = {};

function setUser(socket, userName) {
  userNames[userName] = { socket, userName };
  return userName;
}

function getUser(userName) {
  return userNames[userName];
}

module.exports = {
  setUser,
  getUser,
};

