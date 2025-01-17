import React, { useState, useEffect } from 'react';
import { useGetCategoryQuery } from '../category/categoryApi';
import { useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from './productApi';

function ProductForm({ onSave, isError, error, isSuccess, exisitingProduct,onCancel,onSuccess }) {
    console.log(exisitingProduct);
    const [updateProduct,
        { isLoading: isUpdating,
            isError: isUpdateError,
            error: updateError,
            isSuccess: isUpdateSuccess }] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        categoryId: '',
        name: '',
        description: '',
        price: '',
        image: null,
    });
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: type === 'file' ? files[0] : value }));
    }
    useEffect(() => {
        if (isSuccess || isUpdateSuccess) {
            onSuccess();
            // navigate('/product');
        }
    }, [isSuccess, isUpdateSuccess]);
    useEffect(() => {
        if (exisitingProduct) {
            setProduct({
                categoryId: exisitingProduct.category_id,
                name: exisitingProduct.name,
                description: exisitingProduct.description,
                price: exisitingProduct.price,
                image: null,
            });
        }
    }, [exisitingProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryId', product.categoryId);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);
        if (exisitingProduct) {
            try {
                formData.append('productId', exisitingProduct.id);
                await updateProduct(formData).unwrap();
            } catch (err) {
                console.error(err);
            }
        } else {
            await onSave(formData);
        }


    };
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    if (categoriesLoading) return <p>categories Loading...</p>;
    return (
        <>
            <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
                {/* {isError && error && (
                    <div className="bg-red-700 text-white p-1 mb-1 rounded">
                        <strong>Error:</strong> {error?.data?.message || 'An error occurred'}
                    </div>
                )} */}
                {(isError || isUpdateError) && (error || updateError) && (
                    <div className="bg-red-700 text-white p-1 mb-1 rounded">
                        <strong>Error:</strong>
                        {(error?.data?.message || updateError?.data?.message) || 'An error occurred'}
                    </div>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="categoryId" className="font-semibold mb-1">
                            Select Category:
                        </label>
                        <select
                            name="categoryId"
                            id="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                            className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                        >
                            <option value="" disabled>-- Select a Category --</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold mb-1">
                            Enter Product Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="Category name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className=" font-semibold mb-1">
                            Enter Description:
                        </label>
                        <textarea
                            type='text'
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="Category description"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="description" className=" font-semibold mb-1">
                            Enter Price:
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="Category price in rs."
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image" className="font-semibold mb-1">
                            Upload Image:
                        </label>

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="p-2  bg-gray-200 text-gray-900 border border-gray-400 rounded-md"
                        />
                    </div>
                    <div className='flex gap-3'>
                        <button
                            type="submit"
                            className="p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default ProductForm;
// className={`message ${isError ? 'error' : 'success'}`}

