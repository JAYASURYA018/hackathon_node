console.log("Hello guys");

import { createUser, getUserByName } from "../functions.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  const hashedPassword = await genPassword(password);
  const newUser = {
    username: username,
    password: hashedPassword,
  };
  const result = await createUser(newUser);
  res.send(result);
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const matchedUser = await getUserByName(username);
  if (matchedUser) {
    const isPasswordMatch = await bcrypt.compare(
      password,
      matchedUser.password
    );
    if (isPasswordMatch) {
      const token = jwt.sign({ id: matchedUser._id }, process.env.SECRET_KEY);
      res.send({ messagge: "Logged in sussfully", token: token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } else {
    res.status(401).send("Invalid credentials");
  }
});
export const usersRouter = router;
