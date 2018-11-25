const http = require("http");
const url = require("url");
const server = http.createServer();

let messages = [
  { id: 1, user: "brittany storoz", message: "hi there!" },
  { id: 2, user: "bob loblaw", message: "check out my law blog" },
  { id: 3, user: "lorem ipsum", message: "dolar set amet" }
];

server.listen(3000, () => {
  console.log("the HTTP server is listening at Port 3000");
});

server.on("request", (request, response) => {
  if (request.method === "GET") {
    getAllMessages(response);
  } else if (response.method === "POST") {
    let newMessage = { id: new Date() };

    request.on("data", data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on("end", () => {
      addMessage(newMessage, response);
    });
  }
});

function getAllMessages(response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write(JSON.stringify(messages));
  response.end();
}

function addMessage(newMessage, response) {
  response.writeHead(201, { "Content-Type": "text/plain" });
  response.write(
    JSON.stringify({
      id: newMessage.id,
      user: newMessage.user,
      message: newMessage.message
    })
  );
  response.end();
}
