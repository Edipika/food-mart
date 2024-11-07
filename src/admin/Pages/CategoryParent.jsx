import React, { useState } from 'react';
import Layout from '../common/Layout';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

function CategoryParent() {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setSelectedCategory(null);
        setIsEditing(false);
    };

    return (
        <Layout>
            {isEditing ? (
                <AddCategory
                    existingCategory={selectedCategory}
                    onCancel={handleCancelEdit} // Back button action
                />
            ) : (
                <CategoryList
                    onEditClick={handleEditClick} // Pass edit function
                />
            )}
        </Layout>
    );
}

export default CategoryParent;
