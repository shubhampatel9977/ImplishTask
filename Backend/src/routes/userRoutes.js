const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes
router.post('/signIn', userController.signIn);
router.post('/logIn', userController.logIn);

module.exports = router;