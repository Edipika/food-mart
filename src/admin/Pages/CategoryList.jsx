import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:5000/categories/show');
            const data = await response.json();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    async function deleteCategory(e) {
        e.preventDefault();
        const categoryId = e.target.categoryId.value;
        console.log(categoryId);
        try {
            const response = await fetch('http://localhost:5000/categories/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryId }),
            });

        } catch (error) {
            console.error('Error:', error);
        }
        // const response = await fetch('http://localhost:5000/categories/delete');
        // const data = await response.json();
        // setMessage(data.message);
    }

    return (
        <>
            <Layout>
                <div className="m-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Categories</h2>
                        <button
                            // onClick={onAddCategory}
                            className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                            Add Category
                        </button>
                    </div>


                    <table className="min-w-full border-gray-200 rounded-lg">
                        {/* Table Header */}
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="text-left p-4 border-b font-semibold">Sr No</th>
                                <th className="text-left p-4 border-b font-semibold">Name</th>
                                <th className="text-left p-4 border-b font-semibold">Image</th>
                                <th className="text-left p-4 border-b font-semibold">Edit</th>
                                <th className="text-left p-4 border-b font-semibold">Delete</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50" >
                                    <td className="p-4 border-b ">1</td>
                                    <td className="p-4 border-b">{category.name}</td>
                                    <td className="p-4 border-b">{category.description}</td>
                                    <td className="p-4 border-b">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200">
                                            Edit
                                        </button>
                                    </td>
                                    <td className="p-4 border-b ">
                                        {/* <form action="http://localhost:5000/categories/delete" method='POST'> */}
                                        <form onSubmit={deleteCategory}>
                                            <input type="hidden" name='categoryId' value={category.id} />
                                            <button type='submit' className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout >
        </>
    );
}

export default CategoryList;


