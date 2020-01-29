const db = require("../data/db-config");

module.exports = {
  addUser,
  getUsers,
  findUser,
  getUserById
};

function getUsers() {
  return db("user");
}

function findUser(filter) {
  return db("user").where(filter);
}

function addUser(newUser) {
  return db("user")
    .insert(newUser, "id")
    .then(ids => {
      const [id] = ids;
      return getUserById(id);
    });
}

function getUserById(id) {
  return db("user")
    .where({ id })
    .first();
}
