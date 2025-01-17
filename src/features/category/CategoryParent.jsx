import React, { useState } from 'react';
import Layout from '../../admin/common/Layout';
import AddCategory from './CategoryForm';
import CategoryList from './CategoryList';
import { useAddCategoryMutation, useUpdateCategoryMutation } from './categoryApi';

function CategoryParent() {
    const [isEditing, setIsEditing] = useState(false);
    const [category, setCategory] = useState(null);
    // const [categoryData, setCategoryData] = useState(null);
    const [addCategory, { error: addError }] = useAddCategoryMutation();
    const [updateCategory, { error: updateError }] = useUpdateCategoryMutation();

    const handleEditClick = (category) => {
        setCategory(category);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        console.log('Editing Category:', category);
        setCategory(null);
        setIsEditing(false);
    };
    const onAddClick = () => {
        setCategory(null);
        setIsEditing(true);
    };

    const handleSaveCategory = async (category) => {
        try {
            if (category.get('categoryId')) {
                await updateCategory(category).unwrap();
            } else {
                await addCategory(category).unwrap();
            }
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };
     // Extract error message from the error format
     const extractErrorMessage = (error) => {
        if (!error || !error.data || !error.data.error) {
            return ''; // Return an empty string if no error
        }
        return error.data.error; // Return the error message string
    };

    const error = extractErrorMessage(addError) || extractErrorMessage(updateError);

    // const error = addError?.data?.errors || updateError?.data?.errors || {};

    return (
        <Layout>
            {isEditing ? (
                <AddCategory
                    Category={category}
                    onSave={handleSaveCategory}
                    onCancel={handleCancelEdit} // Back button action
                    error={error}
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
