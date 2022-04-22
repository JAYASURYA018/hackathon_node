const express = require("express");

import jwt from "jsonwebtoken";

const router = express.Router();

import bcrypt from "bcrypt";

const { username, password } = req.body;
const matchedUser = await getUserByName(username);
if (matchedUser) {
  const isPasswordMatch = await bcrypt.compare(password, matchedUser.password);
  if (isPasswordMatch) {
    const token = jwt.sign({ id: matchedUser._id }, process.env.SECRET_KEY);
    res.send({ messagge: "Logged in sussfully", token: token });
  } else {
    res.status(401).send("Invalid credentials");
  }
} else {
  res.status(401).send("Invalid credentials");
}
