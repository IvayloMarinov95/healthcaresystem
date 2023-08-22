const { Router } = require("express");
const { check } = require("express-validator");

const rolesController = require("../controllers/roles-controller");

const router = Router();

router.get("/", rolesController.getRoles);

router.post("/addRole", check().not().isEmpty(), rolesController.createRole);

module.exports = router;
