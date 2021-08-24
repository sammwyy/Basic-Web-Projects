const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const users = new Set();

io.on("connection", (socket) => {
  socket.on("login", (username) => {
    if (users.has(username)) {
      socket.emit("error", "Already logged in.");
    } else {
      socket.user = username;
      socket.emit("logged", users.values());
      io.emit("user-join", username);
      users.add(username);
    }
  });

  socket.on("disconnect", () => {
    const user = socket.user;
    if (user == null) {
      return;
    }

    users.delete(user);
    io.emit("user-leave", user);
  });

  socket.on("message", (message) => {
    const user = socket.user;
    if (user == null) {
      return;
    }

    io.emit("message", { message, user });
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(5000, () => {
  console.log("Server listening at port 5000.");
});
