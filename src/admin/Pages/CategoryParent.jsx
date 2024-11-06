import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList'

function CategoryParent() {
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is on
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log("Is Editing:", isEditing);
    console.log("Selected Category:", selectedCategory);

    return (
        <>
            <Layout>
                {isEditing ? (
                    <AddCategory
                        existingCategory={selectedCategory}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <CategoryList
                        setSelectedCategory={setSelectedCategory}
                        setIsEditing={setIsEditing}
                    />
                )}
            </Layout >
        </>
    );
}

export default CategoryParent;


