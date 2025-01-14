import React, { useState } from 'react';
import Layout from '../../admin/common/Layout';
import AddCategory from './CategoryForm';
import CategoryList from './CategoryList'; 
import { useAddCategoryMutation,useUpdateCategoryMutation } from './categoryApi';

function CategoryParent() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setSelectedCategory(null);
        setIsEditing(false);
    };
    const onAddClick = () => {
        setSelectedCategory(null);
        setIsEditing(true);
    }

    const handleSaveCategory = async (category) => {
        if (selectedCategory) {
            await updateCategory(category); // Update existing category
        } else {
            await addCategory(category); // Add new category
        }
        setSelectedCategory(null); // Reset after saving
    };

    return (
        <Layout>
            {isEditing ? (
                <AddCategory
                    existingCategory={selectedCategory}
                    onSave={handleSaveCategory}
                    onCancel={handleCancelEdit} // Back button action
                />
            ) : (
                <CategoryList
                    onEditClick={handleEditClick} // Pass edit function
                    onAddClick={onAddClick} // Pass add function
                />
            )}
        </Layout>
    );
}

export default CategoryParent;
