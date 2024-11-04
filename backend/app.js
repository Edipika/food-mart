require('dotenv').config(); // Load the .env file before anything else
const express = require('express');
const cors = require('cors');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes= require('./routes/productRoutes')
const userRoutes= require('./routes/user-routes')
const authRoutes= require('./routes/authRoutes')
// const upload = require('./middleware/multer');
// const db = require('./config/database'); // This needs access to environment variables
// const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); 

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// category routes
app.use('/categories', categoryRoutes); 
app.use('/products', productRoutes); 
app.use('/api',userRoutes ); 

app.use('/auth', authRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

