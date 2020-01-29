const db = require("../data/db-config");

module.exports = {
  addUser,
  getUsers,
  findUser,
  getUserById,
  getUserDepartmentById,
  getUsersInDepartment
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

function getUserDepartmentById(id) {
  return db("user")
    .select("department")
    .where({ id })
    .first();
}

function getUsersInDepartment(department) {
  return db("user").where({ department });
}
