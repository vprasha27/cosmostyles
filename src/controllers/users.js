const jwt = require("../helpers/jwt");
const User = require("../models/User");
const express = require("express");
const Password = require("../helpers/password");
const router = express.Router();
const nodemailer = require("nodemailer");
const verifyToken = require("../middleware/verify");
const uploadImage = require("../helpers/upload");

//create an express route that will create a new user according to the user model
router.post("/user/register", async (req, res) => {
  try {
    //check if the user already exists
    const checkUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log(checkUser);

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const password = req.body.password;
    const hashedPassword = await Password.hashPassword(password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//crete a route with name /user/login and take in email and password and send back a token to the user
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log("🚀 ~ file: users.js ~ line 46 ~ router.post ~ user", user);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const verifyPassword = await Password.verifyPassword(
      password,
      user.password
    );

    if (!verifyPassword) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.generateToken({ id: user.id });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create a route with name /user/forgot-password and then take an email and send the user an email with an otp code using nodemailer
router.post("/user/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    //generate 6 digit OTP code
    const otpCode = Math.floor(Math.random() * 900000) + 100000;

    //send email to user with otp code
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "vprashar@vosker.com",
        pass: "Concordia@27",
      },
    });

    const mailOptions = {
      from: "Cosmostyles",
      to: email,
      subject: "OTP Code",
      text: `Your OTP Code is ${otpCode}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({ otpCode });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create a route to send the email to user
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "vprashar@vosker.com",
        pass: "Concordia@27",
      },
    });

    const mailOptions = {
      from: "vprashar@vosker.com",
      to: email,
      subject: "Help request submitted successfully",
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("Success");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create a route named /user/update-new-password and take in the user id and the otp code and the new password and update the user password
router.post("/user/update-new-password", async (req, res) => {
  try {
    const { password, email } = req.body;
    const file = req.files;
      console.log(file);
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    


    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const hashedPassword = await Password.hashPassword(password);
    console.log(
      "🚀 ~ file: users.js ~ line 162 ~ router.post ~ hashedPassword",
      hashedPassword
    );

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email: email,
        },
      }
    );

    res.send({ message: "Password updated successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//router to fetch the list of all users
router.get("/users/list", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create router to block or unblock a user
router.post("/user/block", async (req, res) => {
  try {
    const { id, isBlocked } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    await User.update(
      {
        block: isBlocked,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.send({ message: "User blocked successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/user/prime", async (req, res) => {
  try {
    const { id, prime } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    await User.update(
      {
        prime: prime,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.send({ message: "User primed successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//get single user
router.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.id,
      },
    });

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create a route to update user details
router.post("/user/update", verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email, mobile } = req.body;
    const file = req.files;
    console.log(file);
    const user = await User.findOne({
      where: {
        id: req.id,
      },
    });

    const image = await uploadImage({
      originalname: file.file.name,
      buffer: file.file.data,
    });

    console.log(image);

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        profileImage: image,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.send({ message: "User updated successfully" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
