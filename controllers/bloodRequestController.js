const BloodRequest = require("../models/BloodRequest");
const Inventory = require("../models/Inventory");
const User = require("../models/User");

// **Create a Blood Request**
exports.createRequest = async (req, res) => {
  try {
    const { UserID, RequestedBloodType, Quantity } = req.body;

    // Check if blood type exists in inventory
    const stock = await Inventory.findOne({ where: { bloodtype: RequestedBloodType } });

    if (!stock || stock.quantity < Quantity) {
      return res.status(400).json({ error: "Insufficient blood stock available." });
    }

    // Create blood request
    const request = await BloodRequest.create({
      UserID,
      RequestedBloodType,
      Quantity,
    });

    res.status(201).json({ message: "Blood request submitted successfully.", request });
  } catch (error) {
    res.status(500).json({ error: "Failed to create request.", details: error.message });
  }
};

// **Get all Blood Requests**
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.findAll({
      include: [
        { model: User, as: "Requester", attributes: ["id", "Name", "Email"] },
        { model: User, as: "Admin", attributes: ["id", "Name", "Email"] },
      ],
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests.", details: error.message });
  }
};

// **Approve Blood Request (Admin)**
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { ApprovedBy } = req.body;

    const request = await BloodRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: "Request not found." });

    if (request.Status !== "Pending") {
      return res.status(400).json({ error: "Request is already processed." });
    }

    // Deduct blood from inventory
    const stock = await Inventory.findOne({ where: { bloodtype: request.RequestedBloodType } });
    if (!stock || stock.quantity < request.Quantity) {
      return res.status(400).json({ error: "Insufficient stock to approve request." });
    }

    stock.quantity -= request.Quantity;
    await stock.save();

    // Approve request
    request.Status = "Approved";
    request.ApprovedBy = ApprovedBy;
    request.ApprovalDate = new Date();
    await request.save();

    res.status(200).json({ message: "Request approved successfully.", request });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve request.", details: error.message });
  }
};

// **Reject Blood Request**
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: "Request not found." });

    request.Status = "Rejected";
    await request.save();

    res.status(200).json({ message: "Request rejected successfully.", request });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject request.", details: error.message });
  }
};

// **Delete Blood Request**
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await BloodRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: "Request not found." });

    await request.destroy();
    res.status(200).json({ message: "Request deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete request.", details: error.message });
  }
};
