//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const userRoute = require('./routes/userRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
//Creating a Server
const app = express();

//Creating a port
const PORT = process.env.PORT || 8080

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/login',(req, res)=>{
    res.send("Welcome to the web page")
})


app.use('/users', userRoute);
app.use('/inventory', inventoryRoute);
app.use('/bloodRequest', bloodRequestRoutes);



//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})


