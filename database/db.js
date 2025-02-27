
const { Sequelize } = require("sequelize");

// Replace these values with your database credentials
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',  // Your PostgreSQL username
  password: 'admin123',  // Your PostgreSQL password
  database: 'Blood_Donation_Network_db',  // Your database name
  logging: false,  // Set to true if you want to see SQL logs
});

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models to create tables in the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });  // Set force: true to drop and recreate the tables
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
};

// Call the sync function
syncDatabase();

module.exports = sequelize;
