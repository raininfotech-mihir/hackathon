require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = require("./routes/v1");
const dbConnect = require("./helpers/dbConnect");
const { addSocket, removeSocket } = require("./helpers/socketStore");
const app = express();
const server = http.createServer(app);
    let userId = socket.handshake.auth.token;
    if (userId) {
        addSocket(decWithoutSymbol(userId.toString(), keyStore('userId')), socket.id);
        console.log(`[+] User ${userId} connected with socket
});

const getPendingAiImage = require("./controllers/v1/cron/getPendingAiImage")
const removeImages = require("./controllers/v1/cron/removeImages");
const { keyStore, decWithoutSymbol } = require("./helpers/Common");

getPendingAiImage(io);
removeImages()
