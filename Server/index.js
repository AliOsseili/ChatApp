import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const app = express();
const PORT = "4000";

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    // res.json({ data: "hello world from socket" });

    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on("send-message", (data) => {
        socket.broadcast.emit("message-from-server", data);
    });

    socket.on("disconnect", (socket) => {
        console.log("user left");
    });

    socket.on("typing-started", (data) => {
        socket.broadcast.emit("typing-started-from-server");
    });
    socket.on("typing-stopped", (data) => {
        socket.broadcast.emit("typing-stopped-from-server");
    });
});

httpServer.listen(PORT, () => {
    console.log("Server is running at http://localhost:4000");
});
