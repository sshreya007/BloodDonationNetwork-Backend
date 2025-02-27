const express = require("express");
const router = express.Router();
const bloodRequestController = require("../controllers/bloodRequestController");
const authMiddleware = require("../middleware/authMiddleware");

// **Blood Request Routes**
router.post("/", authMiddleware, bloodRequestController.createRequest); // Request blood
router.get("/", authMiddleware, bloodRequestController.getAllRequests); // Get all requests (Admin)
router.put("/:id/approve", authMiddleware, bloodRequestController.approveRequest); // Approve request
router.put("/:id/reject", authMiddleware, bloodRequestController.rejectRequest); // Reject request
router.delete("/:id", authMiddleware, bloodRequestController.deleteRequest); // Delete request

module.exports = router;
