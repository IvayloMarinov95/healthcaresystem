const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Role = require("../models/roles");

const getRoles = async (req, res, next) => {
  let roles;
  try {
    roles = await Role.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching roles failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ roles: roles.map((role) => role.toObject({ getter: true })) });
};

const createRole = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please enter a role.", 422)
    );
  }

  const { role } = req.body;

  const createdRole = new Role({
    role,
    users: [],
  });

  try {
    await createdRole.save();
  } catch (err) {
    const error = new HttpError("Creaating role failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ role: createdRole });
};

exports.getRoles = getRoles;
exports.createRole = createRole;
