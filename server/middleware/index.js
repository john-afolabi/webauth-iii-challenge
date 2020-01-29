const jwt = require("jsonwebtoken");
const {
  getUserDepartmentById,
  getUsersInDepartment
} = require("../helpers/users-model");

module.exports = {
  restricted,
  restrictUserByDepartment
};

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "78#992dsoj=|ds",
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Your token is not Authorized" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No token provided" });
  }
}

function restrictUserByDepartment(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "78#992dsoj=|ds",
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Your token is not Authorized" });
        } else {
          getUserDepartmentById(decoded.sub)
            .then(dept => {
              getUsersInDepartment(dept.department)
                .then(users => {
                  req.users = users;
                  next();
                })
                .catch(err => {
                  res.status(500).json({
                    errorMessage: `An error occured on the server. Please try again`
                  });
                });
            })
            .catch(err => {
              res.status(500).json({
                errorMessage: `An error occured on the server. Please try again`
              });
            });
        }
      }
    );
  } else {
    res.status(400).json({ message: "No token provided" });
  }
}
