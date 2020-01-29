const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const usersRouter = require("../routes/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(
  session({
    name: "sess",
    secret: "dmwklj984jp=4+)40",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: false
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("../data/db-config"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60 * 24
    })
  })
);

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: `This server is working correctly` });
});

module.exports = server;
