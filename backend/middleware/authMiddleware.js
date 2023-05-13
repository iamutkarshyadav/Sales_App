const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/user_model");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //bearer
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized Access not Alowed" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res
        .status(401)
        .json({ error: "Unauthorized Access not Alowed 2" });
    }
    const { _id } = payload;
    User.findById(_id).then((userInDb) => {
      req.user = userInDb;
      next();
    });
  });
};