import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import sockets from "../Server/socket/sockets.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./api/routes.js";
import cors from "cors";
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { dbName: "ChatApp" });

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

app.use(cors());
app.get("/", (req, res) => {
    // res.json({ data: "hello world from socket" });

    res.sendFile(__dirname + "/index.html");
});
app.use("/", router);

io.on("connection", sockets);

httpServer.listen(PORT, () => {
    console.log("Server is running at http://localhost:4000");
});
