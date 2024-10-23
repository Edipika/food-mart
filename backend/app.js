// require('dotenv').config(); // Load the .env file before anything else
const express = require('express');
const cors = require('cors');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
// const db = require('./config/database'); // This needs access to environment variables

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// category routes
app.use('/categories', categoryRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.post('/addCategory', (req, res) => {
//   console.log('Request body:', req.body);
//   console.log('Form data:', req.body);
//   if(!req.body.description){
//     // res.json({
//     //   error: 'description required',
//     // });
//     return res.status(400).json({
//       error: 'description required',
//   });
//   }
//   res.json({ //not specifying any status code will bydefault set code 200
//     success: true,
//     message: 'Category added successfully!',
//     data: req.body // echoing back the form data received
//   });
// });