const express = require('express');
const router = express.Router();
const { adminlogin } = require('../controllers/login-controller'); 

// Define the POST route for adding a category
router.post('/adminLogin',adminlogin);
// router.get('/adminLogin',adminlogin);

module.exports = router; // Export the router


