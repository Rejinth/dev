const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const registerRoutes=require('./routes/registerRoutes')
const vaccinationRoutes =require('./routes/vaccinationRoutes')
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);   
app.use('/api/auth', registerRoutes);  
app.use('/api/auth', vaccinationRoutes);  

app.get('/hello',(req,res)=>{
    return res.json('hello')
})

const uri ="mongodb://localhost:27017";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });


  