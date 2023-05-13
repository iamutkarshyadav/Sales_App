const express = require("express");
const router = express.Router();
const { JWT_SECRET } = require("../config");
const User = require("../models/user_model");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
router.post(
  "/signup",
  [
    body("firstName").isLength({ min: 2 }),
    body("lastName").isLength({ min: 2 }),

    body("password", "Password must be 5 or more characters").isLength({
      min: 5,
    }),
    body("email").isEmail(),
  ],
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: securePassword,
        email: req.body.email,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login Route
router.post(
  "/login",
  [
    body("password", "Password must be 5 or more characters").isLength({
      min: 5,
    }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      const psdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!psdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;