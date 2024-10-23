const express = require('express');
const router = express.Router();
const { addCategory,UpdateCategory,deleteCategory,showCategories } = require('../controllers/categoryController'); // Import the controller function

// Define the POST route for adding a category
router.post('/add', addCategory);
router.post('/edit', UpdateCategory);
router.post('/delete', deleteCategory);
router.post('/show', showCategories);

module.exports = router; // Export the router


