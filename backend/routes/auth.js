const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const jwt_secret = "Krishnendu@987#123";

// Route 1 :  to create a user using post /api/auth/createuser

router.post(
  "/createuser",
  [
    body("name", "Name should have atleast 3 charecter").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("dob", "Enter a valid Date of Birth").isLength({ min: 1 }),
    body("gender", "Choose a gender").isLength({ min: 1 }),
    body("mobile", "Enter a valid Mobile number").isLength({ min: 10 }),
    body("password", "Password should have atleast 8 charecter").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ success, errors: "Email already exist" });
      }
      const salt = await bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        dob: req.body.dob,
        mobile: req.body.mobile,
        gender: req.body.gender,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (errors) {
      console.error(errors.massage);
      res.status(500).send("Internal server error");
    }
  }
);
//Route 2 : to change password in forget password a user using post /api/auth/forgetpass
router.put(
  "/forgetpass",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should have atleast 8 charecter").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ success, errors: "email id not found" });
      }
      const newuser = {};

      const salt = await bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(password, salt);
      if (password) {
        newuser.password = secPass;
      }
      user = await User.findByIdAndUpdate(
        user._id,
        { $set: newuser },
        { new: true }
      );
      success = true;
      res.json({ success, user });
    } catch (errors) {
      console.error(errors.massage);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3 : to autheticate a user using post /api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credential",
        });
      }
      const passcmp = await bcrypt.compare(password, user.password);
      if (!passcmp) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credential",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (errors) {
      console.error(errors.massage);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 4: to get userdetails a user using post /api/auth/getuser,login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res.status(404).send("Not found");
    }
    res.send(user);
  } catch (errors) {
    console.error(errors.massage);
    res.status(500).send("Internal server error");
  }
});

//Route 5: to change password a user using put /api/auth/changepass,login required
router.put(
  "/changepass",
  [
    body("password", "Password should have atleast 8 charecter").isLength({
      min: 8,
    }),
    body("currentpass", "Password can not be blank").exists(),
  ],
  fetchuser,
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { currentpass, password } = req.body;
    try {
      let userid = req.user.id;
      let user = await User.findById(userid);
      if (!user) {
        return res.status(404).send("Not found");
      }
      const passcmp = await bcrypt.compare(currentpass, user.password);
      if (!passcmp) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Enter correct current password",
        });
      }
      const newuser = {};
      const salt = await bcrypt.genSaltSync(10);
      let secPass = await bcrypt.hash(password, salt);
      if (password) {
        newuser.password = secPass;
      }
      user = await User.findByIdAndUpdate(
        userid,
        { $set: newuser },
        { new: true }
      );
      success = true;
      res.json({ success });
    } catch (errors) {
      console.error(errors.massage);
      res.status(500).send("Internal server error");
    }
  }
);

//6. delete user using delete /api/auth/deleteuser

router.delete("/deleteuser", fetchuser, async (req, res) => {
  let success = false;
  console.log("entered");
  try {
    let userid = req.user.id;
    let user = await User.findById(userid);
    if (!user) {
      success = false;
      return res.status(404).json({ success, error: "Not found" });
    }
    user = await User.findByIdAndDelete(userid);
    success = true;
    res.json({ success, message: "User account deleted successfully" });
  } catch (errors) {
    console.error(errors.massage);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
