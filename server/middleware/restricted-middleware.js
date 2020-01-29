const jwt = require("jsonwebtoken");

module.exports = {
  restricted
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
