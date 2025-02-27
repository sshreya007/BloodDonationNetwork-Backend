const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "ASDFGHJKLAHVJVF3546523642635"; 

// **REGISTER USER**
exports.register = async (req, res) => {
  try {
    const { Name, Email, Phone, Address, Password, BloodType, Role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user
    const newUser = await User.create({
      Name,
      Email,
      Phone,
      Address,
      Password: hashedPassword,
      BloodType,
      Role,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ where: { Email } });
      if (!user) return res.status(401).json({ error: "Invalid email or password" });
  
      // Validate password
      const validPassword = await bcrypt.compare(Password, user.Password);
      if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });
  
      // Generate JWT Token
      const token = jwt.sign({ id: user.id, Role: user.Role }, SECRET_KEY, { expiresIn: "1h" });
  
      // Determine Redirect URL
      const redirectUrl = user.Role === "Admin" ? "/admin/dashboard" : "/user/dashboard";
  
      res.json({
        message: "Login successful",
        token,
        role: user.Role,
        redirect: redirectUrl, // Send the redirect URL
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed", details: error.message });
    }
  };
  // **GET USER PROFILE (PROTECTED)**
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["Password"] },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User profile retrieved", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profile", details: error.message });
  }
};

// **UPDATE USER PROFILE**
exports.updateProfile = async (req, res) => {
  try {
    const { Name, Phone, Address, BloodType } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ Name, Phone, Address, BloodType });

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile", details: error.message });
  }
};

// **DELETE USER**
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
};
