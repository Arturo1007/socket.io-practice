import { io } from "socket.io-client";
const socket = io("http://localhost:5050/");

// =========================
// Socket Logic.
// =========================
// socket.on("connect", () => {});

// New User.
socket.on("new-user", (userID) => {
  if (socket.id === userID) {
    log(`You have connected to the log. (ID: ${socket.id} )`);
  } else {
    log("New user has connected, ID: " + userID + ".");
  }
});

// New message.
socket.on("new-message", (message) => {
  log(message);
});

// Joined new room.
socket.on("joined-room", (room) => {
  // TBD: Update message.
  log(`You haven joined to the room ${room}`);
});

// ==========================
// UI.
// ==========================
const inputMessage = document.getElementById("inputMessage");
const inputRoom = document.getElementById("inputRoom");
const btnMessage = document.getElementById("btnMessage");
const btnRoom = document.getElementById("btnRoom");
const logBox = document.getElementById("logBox");

// Send message
btnMessage.addEventListener("click", () => {
  let message = inputMessage.value;
  let room = inputRoom.value;
  inputMessage.value = "";
  socket.emit("send-message", message, room);
  log(message);
});

// Change Room
btnRoom.addEventListener("click", () => {
  let value = inputRoom.value;
  let room = inputRoom.value;
  console.log(room);
  socket.emit("join-room", room);
  //inputRoom.value = '';
});

function log(message) {
  const element = `<div class="log-msg">${message}</div>`;
  logBox.innerHTML += element;
}
