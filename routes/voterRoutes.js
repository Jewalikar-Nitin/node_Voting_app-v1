const express = require("express");
const router = express.Router();
const controller = require("../controller/voterController");
const { jwtAuthMiddleware } = require("../jwt");

router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.get("/profile", jwtAuthMiddleware, controller.voterProfile);

module.exports = router;
