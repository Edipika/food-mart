require('dotenv').config(); // Load the .env file before anything else
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database'); // This needs access to environment variables

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import routes here
// const userRoutes = require('./routes/users');
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

