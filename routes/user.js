const express = require("express");
const userController = require("../controllers/userController.js");
const { verify } = require("../auth.js");
const router = express.Router();


router.post("/register", userController.register);

router.post("/login", userController.login);


module.exports = router;