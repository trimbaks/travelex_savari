//import { Server } from "http";

//npm i express socket.io --save

const express = require("express");
const app  = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 7035;

app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

io.on("connection",(client)=>{
    console.log("Connected...")
    client.emit("acknowledge",{message : "connetion established"});
    client.on("MsgToServer", (chattername, message) =>{
        console.log(chattername + " Says : "+ message);
        client.emit("MsgToClient", 'Me',  message);
        client.broadcast.emit("MsgToClient",  chattername, message);
    })
})
    
server.listen(port, () => {
    console.log("Server started at port ", port);
})
