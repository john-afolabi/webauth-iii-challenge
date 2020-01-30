const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("../routes/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: `This server is working correctly` });
});

module.exports = server;
