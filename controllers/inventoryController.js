const Inventory = require("../models/Inventory");

// **Add new blood stock**
exports.addInventory = async (req, res) => {
  try {
    const { bloodtype, quantity } = req.body;

    // Check if blood type already exists
    let inventory = await Inventory.findOne({ where: { bloodtype } });

    if (inventory) {
      // Update existing quantity
      inventory.quantity += parseInt(quantity);
      await inventory.save();
    } else {
      // Create new blood stock entry
      inventory = await Inventory.create({ bloodtype, quantity });
    }

    res.status(201).json({ message: "Inventory updated successfully", inventory });
  } catch (error) {
    res.status(500).json({ error: "Failed to add inventory", details: error.message });
  }
};

// **Get all blood stock**
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve inventory", details: error.message });
  }
};

// **Get specific blood stock by type**
exports.getBloodTypeStock = async (req, res) => {
  try {
    const { bloodtype } = req.params;
    const inventory = await Inventory.findOne({ where: { bloodtype } });

    if (!inventory) {
      return res.status(404).json({ error: "Blood type not found in inventory" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blood type stock", details: error.message });
  }
};

// **Update blood quantity**
exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    let inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    inventory.quantity = parseInt(quantity);
    await inventory.save();

    res.status(200).json({ message: "Inventory updated successfully", inventory });
  } catch (error) {
    res.status(500).json({ error: "Failed to update inventory", details: error.message });
  }
};

// **Delete blood stock**
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    await inventory.destroy();
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete inventory", details: error.message });
  }
};
