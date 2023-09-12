const { Router } = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = Router();

router.get("/", usersController.getUsers);
router.get("/:role", usersController.getUsersByRole);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.patch('/updatePersonalInformation/:uid', usersController.updatePersonalInformation);

router.delete("/deleteUser/:uid", usersController.deleteUser);

module.exports = router;
