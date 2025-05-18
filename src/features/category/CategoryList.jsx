import React from 'react';
import { useEffect } from 'react';
import { useGetCategoryQuery, useDeleteCategoryMutation } from './categoryApi'
import { BASE_URL } from '../../app/api/apiSlice';
import Layout from '../../common/admin/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startEditing } from '../editSlice';
import { useSelector } from 'react-redux';
import { nullSuccessMsg } from '../editSlice';

function CategoryList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: categories, isLoading, refetch } = useGetCategoryQuery();

    const [deleteCategory, { isSuccess, isError, error }] = useDeleteCategoryMutation();
    const handleDelete = (id) => {
        deleteCategory(id);
    };
    const successMessage = useSelector((state) => state.editSlice.successMsg);
    useEffect(() => {
        refetch();
    }, [refetch, isSuccess]);

    const handleEdit = (category) => {
        dispatch(startEditing(category));
        navigate('/addcategory');
    };
    // const selectedCategory = useSelector((state) => state.editSlice.selectedItem);
    // const categorySlice = useSelector((state) => state.editSlice);
    // console.log("selectedCategory from Redux state:", selectedCategory);
    // console.log("categorySlice", categorySlice);

    const onAddClick = () => {
        navigate('/addcategory');
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <Layout>
                {/* Success or error state handling */}
                {isSuccess && <p>Category deleted successfully!</p>}
                {isError && <p>Error: {error?.data?.message || "Deletion failed"}</p>}
                {/* {successMessage && <div className="bg-green-700 p-1 rounded text-white">{successMessage}</div>} */}

                {successMessage && (
                    <div className="bg-green-700 p-1 rounded text-white flex justify-between items-center">
                        <span>{successMessage}</span>
                        <button
                            onClick={() => dispatch(nullSuccessMsg())}
                            className="bg-green-900 text-white px-2 py-1 rounded hover:bg-green-800 transition duration-200"
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className="m-10">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Categories</h2>
                        <button
                            onClick={onAddClick}
                            className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                            Add Category
                        </button>
                    </div>

                    <table className="min-w-full border-gray-200 rounded-lg">
                        {/* Table Header */}
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="text-left p-4 border-b font-semibold">SrNo</th>
                                <th className="text-left p-4 border-b font-semibold">Image</th>
                                <th className="text-left p-4 border-b font-semibold">Name</th>
                                <th className="text-left p-4 border-b font-semibold">Edit</th>
                                <th className="text-left p-4 border-b font-semibold">Delete</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {categories && categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <tr key={category.id} className="hover:bg-gray-50" >
                                        <td className="p-4 border-b ">{index + 1}</td>
                                        <td className="p-4 border-b">
                                            <img
                                                src={`${BASE_URL}${category.image_path}`}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        </td>
                                        <td className="p-4 border-b">{category.name}</td>
                                        <td className="p-4 border-b">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="p-4 border-b">
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        No Categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </Layout>
        </>
    );
}

export default CategoryList;

