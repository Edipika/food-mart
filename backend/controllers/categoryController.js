const { Category } = require('../models');
const fs = require('fs');
const path = require('path');

const addCategory = async (req, res) => {
    try {
        // console.log('Form data:', req.body);
        const { name, description, image } = req.body;

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
        if (!req.file) {
            return res.status(400).json({
                error: 'Image is required',
            });
        }

        // Create a new category
        const newCategory = await Category.create({
            name: name,
            description: description,
        });

        // Now save the image in the category-specific directory
        // Create the category folder if it does not exist
        const categoryDir = `uploads/categories/${newCategory.id}`;
        fs.mkdirSync(categoryDir, { recursive: true });

        // Move the uploaded file to the category-specific folder
        const oldPath = req.file.path;
        const newPath = path.join(categoryDir, req.file.filename);

        fs.renameSync(oldPath, newPath);

        // Update category with image path (optional)
        newCategory.image_path = `/uploads/categories/${newCategory.id}/${req.file.filename}`;
        await newCategory.save();


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