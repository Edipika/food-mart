const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { addCategory,UpdateCategory,deleteCategory,showCategories } = require('../controllers/category-controller'); 

// Define the POST route for adding a category
router.post('/add',  upload.single('image'),addCategory);
// router.post('/edit', UpdateCategory);
// router.post('/delete', deleteCategory);
// router.post('/show', showCategories);



module.exports = router; // Export the router


