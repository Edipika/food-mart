import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation } from './categoryApi';

function AddCategory({ Category, onSave, onCancel, error }) {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        parent_id: '',
        name: '',
        description: '',
        image: '',
    });
    const [formErrors, setFormErrors] = useState('');

    useEffect(() => {
        if (Category) {
            console.log(Category);
            setCategory({
                categoryId: Category.id || '',
                name: Category.name || '',
                description: Category.description || '',
                image: Category.image_path || '',
            });
        }
    }, [Category]);

    // const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    useEffect(() => {
        if (error) {
            setFormErrors(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a FormData object to handle the file upload properly
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        if (category.image) {
            formData.append('image', category.image);
        }
        if (Category && Category.id) {
            formData.append('categoryId', Category.id);
        }
        const saveSuccess = await onSave(formData);

        console.log(saveSuccess); //
        if (saveSuccess) {
            console.log("Navigating to /category");
            navigate('/category', { state: { message: 'Category saved successfully!' } });
        }
    };

    return (
        <>
            <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
                {formErrors && (
                    <span className="text-red-500 text-sm">{formErrors}</span>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold mb-1">
                            Enter Category Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={category.name}
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
                            value={category.description}
                            onChange={handleChange}
                            className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            placeholder="Category description"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image" className="font-semibold mb-1">
                            Upload Image:
                        </label>

                        {category.image && (
                            <img
                                src={`http://localhost:5000${category.image}`}
                                alt="Category preview"
                                className="mt-2 w-32 h-32 object-cover"
                            />
                        )}
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
                            className="p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default AddCategory;



