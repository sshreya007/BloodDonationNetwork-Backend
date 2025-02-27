const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./User");

const BloodRequest = sequelize.define("BloodRequests", {
  RequestID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "UserID" },
  },
  RequestedBloodType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM("Pending", "Approved", "Fulfilled", "Rejected"),
    defaultValue: "Pending",
  },
  RequestDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ApprovedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: User, key: "UserID" },
  },
  ApprovalDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},{
    tableName: "Blood_requests",
    timestamps: false
});

BloodRequest.belongsTo(User, { foreignKey: "UserID", as: "Requester" });
BloodRequest.belongsTo(User, { foreignKey: "ApprovedBy", as: "Admin" });

module.exports = BloodRequest;
