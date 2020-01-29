const express = require("express");
const { addUser, findUser, getUsers } = require("../helpers/users-model");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { restrictUserByDepartment } = require("../middleware");

function createToken(user) {
  const payload = {
    sub: user.idred
  };
  const options = {
    expiresIn: "30d"
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "78#992dsoj=|ds",
    options
  );
  return token;
}

router.post("/register", (req, res) => {
  const { username, password, department } = req.body;
  const passwordhash = bcrypt.hashSync(password, 10);
  const user = {
    username,
    password: passwordhash,
    department
  };
  addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  findUser({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "You shall not pass" });
      }
    });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res
    .status(200)
    .json({ message: `You have logged out successfully. Goodbye!` });
});

router.get("/", restrictUserByDepartment, (req, res) => {
  res.status(200).json(req.users);
});

module.exports = router;
