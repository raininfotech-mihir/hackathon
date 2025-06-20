require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes/v1");
const dbConnect = require("./helpers/dbConnect");
const { addSocket, removeSocket } = require("./helpers/socketStore");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: process.env.SOCKET_FRONT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", router);

app.set('io', io);

io.on("connection", (socket) => {
    let userId = socket.handshake.auth.token;
    if (userId) {
        addSocket(decWithoutSymbol(userId.toString(), keyStore('userId')), socket.id);
        console.log(`[+] User ${userId} connected with socket.id: ${socket.id}`);
    };
    socket.on("disconnect", () => {
        if (userId) {
            removeSocket(decWithoutSymbol(userId.toString(), keyStore('userId')), socket.id);
            console.log(`[-] User ${userId} disconnected socket.id: ${socket.id}`);
        }
    });

});

const getPendingAiImage = require("./controllers/v1/cron/getPendingAiImage")
const removeImages = require("./controllers/v1/cron/removeImages");
const { keyStore, decWithoutSymbol } = require("./helpers/Common");

getPendingAiImage(io);
removeImages();

server.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server Started on port ${PORT}`);
});