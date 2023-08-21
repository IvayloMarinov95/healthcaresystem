const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getUsers = (req, res, next) => {};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = null;
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credetials seem to be wrong.",
      401
    );
  }

  console.log(identifiedUser);
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
