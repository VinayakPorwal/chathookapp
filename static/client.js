const socket = io();

function fun() {
  var a = prompt("Enter some text", "fookrey");
  if (a != null) {
    socket.emit("join", a);
    name = a;
  }
}
fun();
function exit() {
  window.location = "left.ejs";
}

//Connect
socket.on("newjoin", (name) => {
  console.log(name + " joined");
  Append(name, " JOINED", "inOut");
});

//disconnect
socket.on("left", (name) => {
  console.log(name + " left");
  Append(name, " LEFT", "inOut");
});

var form = document.getElementById("form");
var input = document.getElementById("input");
var messages = document.getElementById("messages");

//send message
form.addEventListener("submit", function (e) {
  console.log(name);
  e.preventDefault();
  if (input.value) {
    let msg = input.value;
    socket.emit("chatmessage", { aa: name, msg: msg });
    console.log(name + ":" + msg);
    input.focus();
    input.value = "";
  }
});

//messages
socket.on("chatmessage", (data) => {
  Append(data.aa, data.msg, "recieve");
});

function Append(name, message, position) {
  const p = document.createElement("p");
  p.innerText = name;
  p.classList.add(position);
  p.innerHTML += `<span> : ${message}</span>`;
  document.querySelector("#messages").appendChild(p);
  document.getElementById("ref").scrollIntoView();
}
