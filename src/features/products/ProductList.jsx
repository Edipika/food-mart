import React from 'react';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../app/api/axios';
import { useGetProductQuery } from './productApi';
import { useDeleteProductMutation } from './productApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startEditing ,nullSuccessMsg } from '../editSlice';
import Layout from '../../common/admin/Layout';

function ProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: products, isLoading, refetch } = useGetProductQuery();
    const productArray = products?.data || [];

    const [deleteProduct, { isSuccess, isError, error }] = useDeleteProductMutation();
    const deleteProd = (productId) => {
        deleteProduct(productId);
    };

    const successMessage = useSelector((state) => state.editSlice.successMsg);

    useEffect(() => {
        refetch();
    }, [refetch, isSuccess]);

    const handleEdit = (category) => {
        dispatch(startEditing(category));
        navigate('/addproduct');
    };

    if (isLoading ||!productArray) return <p>Loading...</p>;
    return (
        <>
        <Layout>
            <div className="m-10">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <button
                        onClick={() => (navigate('/addproduct'))}
                        className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                        Add Product
                    </button>
                </div>
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
                <table className="min-w-full border-gray-200 rounded-lg">
                    {/* Table Header */}
                    <thead className="bg-slate-200">
                        <tr>
                            <th className="text-left p-4 border-b font-semibold">Sr.No</th>
                            <th className="text-left p-4 border-b font-semibold">Image</th>
                            <th className="text-left p-4 border-b font-semibold">Category</th>
                            <th className="text-left p-4 border-b font-semibold">Name</th>
                            <th className="text-left p-4 border-b font-semibold">Edit</th>
                            <th className="text-left p-4 border-b font-semibold">Delete</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {productArray && productArray.length > 0 ? (
                        productArray.map((item, index) => (
                            <tr key={item.product.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b">{index + 1}</td>
                                <td className="p-4 border-b">
                                    {item.metaData?.image_path ? (
                                        <img
                                            src={`${BASE_URL}/${item.metaData.image_path}`}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td className="p-4 border-b">{item.category.name}</td>
                                <td className="p-4 border-b">{item.product.name}</td>

                                <td className="p-4 border-b">
                                    {/* {item.product.id} */}
                                    <button
                                        onClick={() => handleEdit(item.product)}
                                        //onClick={editProduct(item.product)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200">
                                        Edit
                                    </button>
                                </td>
                                <td className="p-4 border-b">
                                    <button
                                        onClick={() => deleteProd(item.product.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-4 text-center">
                                No Products found.
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

export default ProductList;


