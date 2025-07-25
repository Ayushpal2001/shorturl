const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Serve static frontend from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', urlRoutes);

// MongoDB Connection + Server Start
connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });
