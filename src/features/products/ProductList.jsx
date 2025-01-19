import React from 'react';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../app/api/axios';
import { useGetProductQuery } from './productApi';
import { useDeleteProductMutation } from './productApi';
import { useNavigate } from 'react-router-dom';

function ProductList({ addProduct, editProduct, isEditing }) {
    const navigate = useNavigate();
    const [deleteProduct, { isSuccess, isError, error }] = useDeleteProductMutation();
    const [deleteMsg, setDeleteMsg] = useState('');
    const deleteProd = async (productId) => {
        console.log(productId);
        await deleteProduct(productId);
        setDeleteMsg('Product deleted successfully!');
    };
    const { data: products, isLoading, refetch } = useGetProductQuery();
    useEffect(() => {
        if (!isEditing || isSuccess) {
            refetch(); // Re-fetch products when editing is done
        }
    }, [isEditing, isSuccess, refetch]);
    if (isLoading) return <p>Loading...</p>;

    const productArray = products?.data || [];
    return (
        <>
            <div className="m-10">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <button
                        onClick={addProduct}
                        className="bg-gray-950 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200">
                        Add Product
                    </button>
                </div>
                {/* {(isSuccess) && (
                    <div className="bg-green-700 text-white p-1 mb-1 rounded">
                        <p>Product Deleted successfully!!</p>
                    </div>
                )} */}
                {isSuccess && deleteMsg && (
                    <div className="bg-green-700 text-white p-1 mb-1  rounded flex items-center justify-between">
                        <p>{deleteMsg}</p>
                        <button
                            className=" text-white px-2 py-1 ml-2 rounded"
                            onClick={() => setDeleteMsg('')}
                        >
                            X
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
                        {productArray.map((item, index) => (
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
                                   
                                        onClick={() => editProduct(item.product)}
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
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ProductList;


