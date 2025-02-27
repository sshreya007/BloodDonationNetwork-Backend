const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../database/db');

const Inventory = sequelize.define('Inventories',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    bloodtype: {
        type:DataTypes.STRING,
        autoIncrement: false,
     },
    Quantity: {
        type:DataTypes.STRING,
        autoIncrement: false,
    }
},{
    tableName: "Inventory",
    timestamps: false
})

module.exports = Inventory;