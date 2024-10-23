const { Category } = require('../models'); // Adjust the path as necessary

const addCategory = async (req, res) => {
    try {
        console.log('Form data:', req.body);
        const { name, description } = req.body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                error: 'Name is required and must be a non-empty string',
            });
        }

        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({
                error: 'Description is required and must be a non-empty string',
            });
        }

        // Create a new category
        const newCategory = await Category.create({
            name: name,          
            description: description, 
        });

        return res.status(201).json({
            success: true,
            message: 'Category added successfully!',
            data: newCategory, // Return the created category
        });
    } catch (error) {
        console.error('Error adding category:', error);
        return res.status(500).json({
            error: 'An error occurred while adding the category',
        });
    }
};

const UpdateCategory = (req, res) => {
};

const deleteCategory = (req, res) => {
};

const showCategories = (req, res) => {
};

module.exports = {
    addCategory, UpdateCategory, deleteCategory, showCategories
};