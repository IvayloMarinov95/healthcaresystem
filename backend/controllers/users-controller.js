const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require("../models/http-error");
const User = require("../models/users");
const Role = require("../models/roles");
const PersonalInformation = require('../models/personal-informations');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getter: true })) });
};

const getUsersByRole = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ role: req.params.role }).populate('personalInformation');
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getter: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password, role } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not create user, please try again later.', 500);
    return next(error);
  }
  const createdPersonalInformation = new PersonalInformation({
    id: uuid(),
    age: '',
    gender: '',
    phone: '',
    occupation: '',
    department: '',
  });

  const createdUser = new User({
    id: uuid(),
    name,
    email,
    password: hashedPassword,
    role,
    personalInformation: createdPersonalInformation.id
  });


  try {
    createdPersonalInformation.user = createdUser._id;
    await createdPersonalInformation.save();
  } catch (err) {
    const error = new HttpError("Creating personal information failed, please try again", 500);
    return next(error);
  }

  let userRole;

  try {
    userRole = await Role.findById(role);
  } catch (err) {
    const error = new HttpError(
      "Creating user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userRole) {
    const error = new HttpError("Could not find role for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    userRole.users.push(createdUser);
    await userRole.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = await jwt.sign({ userId: createdUser.id, email: createdUser.email }, 'private_key', { expiresIn: '1h' });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again later.", 500);
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again later.', 401);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Could bot log you in, please your credetials and try again', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = await jwt.sign({ userId: existingUser.id, email: existingUser.email }, 'private_key', { expiresIn: '1h' });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again later.", 500);
    return next(error);
  }

  res.json({ userId: existingUser.id, email: existingUser.email, role: existingUser.role, token: token });
};

const updatePersonalInformation = async (req, res, next) => {
  const userId = req.params.uid;
  const { age, gender, phone, occupation, department, user } = req.body;

  let updatedPersonalInfo;
  try {
    updatedPersonalInfo = await PersonalInformation.findById(userId);
  } catch (err) {
    const error = new HttpError("Could not find personal information by the provided id, please try again later.", 500);
    return next(error);
  }

  updatedPersonalInfo.age = age;
  updatedPersonalInfo.gender = gender;
  updatedPersonalInfo.phone = phone;
  updatedPersonalInfo.occupation = occupation;
  updatedPersonalInfo.department = department;

  try {
    await updatedPersonalInfo.save();
  } catch (err) {
    const error = new HttpError("Could not update personal information, please try again later.", 500);
    return next(error);
  }


  res.status(200).json({ personalInfo: updatedPersonalInfo.toObject({ getter: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("role");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await PersonalInformation.deleteOne({ user: userId });
    user.role.users.pull(user);
    await user.role.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something wnet wrong, could not delete user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "User is deleted." });
};

exports.getUsers = getUsers;
exports.getUsersByRole = getUsersByRole;
exports.signup = signup;
exports.login = login;
exports.updatePersonalInformation = updatePersonalInformation;
exports.deleteUser = deleteUser;
