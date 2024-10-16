// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const scholarshipsRouter = require('./routes/scholarship');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// backend/server.js
// ...

// Middleware with CORS options
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: 'GET,POST,PUT,DELETE',
  }));
  
  // ...
  

// Routes
app.use('/api/scholarships', scholarshipsRouter);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Scholarships API is running');
});

// Handle Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
