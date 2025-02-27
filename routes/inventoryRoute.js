const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const authMiddleware = require("../middleware/auth");

// **Inventory Routes**
router.post("/", authMiddleware, inventoryController.addInventory); // Add blood stock
router.get("/", inventoryController.getInventory); // Get all inventory
router.get("/:bloodtype", inventoryController.getBloodTypeStock); // Get specific blood type stock
router.put("/:id", authMiddleware, inventoryController.updateInventory); // Update blood stock
router.delete("/:id", authMiddleware, inventoryController.deleteInventory); // Delete blood stock

module.exports = router;
