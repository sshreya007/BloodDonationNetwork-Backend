const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// **Auth Routes**
router.post("/register", userController.register);  // User registration
router.post("/login", userController.login);        // User login

// **Protected Routes (Requires Authentication)**
router.get("/profile", authMiddleware, userController.getProfile);  // Get user profile
router.put("/profile", authMiddleware, userController.updateProfile);  // Update user profile

// **Admin Routes**
router.delete("/:id", authMiddleware, userController.deleteUser); // Admin can delete user

module.exports = router;
