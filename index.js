// const fs = require("fs");
// const path = require("path");
// const http = require("http");
// // const css = require("css/style.css");
// const express = require("express");

// const app = express();
// const port = 80;
// const hostname = "127.0.0.1";

// // console.log("hello");

// // For serving static files
// app.use("/static", express.static("static"));

// // for getting file path from website
// app.use(express.urlencoded({ extended: true }));

// // Set the template engine as pug
// app.set("view engine", "ejs");

// // Set the views directory
// app.set("views", path.join(__dirname, "views"));
// app.get("/", (req, res) => {
//   res.status(200).render("chat");
// });

// app.get("/demo", (req, res) => {
//   res.status(200).render("demo");
// });
// // app.get('/', (req, res) => {
// //   res.sendFile(__dirname + '/index2.html');
// // });
// app.listen(port, () => {
//   console.log(
//     `The application started successfully on port http://${hostname}:${port}`
//   );
// });

const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
// const css = require("css/style.css");

//learning in progress..
const socketio = require("socket.io");
const server = http.createServer(app);

const io = socketio(server);
const port = 80;
const hostname = "127.0.0.1";

const users = {};
// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

io.on("connection", (socket) => {
  // console.log("a user connected");

  socket.on("join", (name) => {
    console.log(name + " connected");
    users[socket.id] = name;
    io.emit("newjoin", name);
  });
  socket.on("chatmessage", (data) => {
    console.log(data.aa + ":" + data.msg);
    io.emit("chatmessage", data);
  });

  socket.on("disconnect", (data) => {
    console.log(users[socket.id] + " disconnected");
    io.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

// For serving static files
app.use("/static", express.static("static"));

// for getting file path from website
app.use(express.urlencoded({ extended: true }));

// Set the template engine as pug
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));
app.get("/", (req, res) => {
  res.status(200).render("chat");
});

app.get("/left.ejs", (req, res) => {
  res.status(200).render("left");
});

server.listen(port, () => {
  console.log(`listening on http://${hostname}:${port}`);
});
