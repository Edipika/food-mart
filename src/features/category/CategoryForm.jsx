import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../admin/common/Layout';
import { useGetCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation } from './categoryApi';
import { useSelector, useDispatch } from 'react-redux';
import { stopEditing,setSuccessMsg } from '../editSlice';


function AddCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        parent_id: '',
        name: '',
        description: '',
        image: '',
    });
    const { data: categories, isLoading: categoriesLoading } = useGetCategoryQuery();
    const [addCategory, { isError, error, isSuccess, }] = useAddCategoryMutation();
    const [updateCategory, {
        //  isLoading: isUpdating,
        isError: isUpdateError,
        error: updateError,
        isSuccess: isUpdateSuccess }] = useUpdateCategoryMutation();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    useEffect(() => {
        if (isSuccess || isUpdateSuccess) {
            dispatch(setSuccessMsg('Category Saved successfully.'));
            dispatch(stopEditing());
            navigate('/category');
            // navigate('/category', { state: { message: 'Category saved successfully!' } });

        }
    }, [isSuccess, isUpdateSuccess, navigate]);

    const onCancel = () => {
        navigate('/category')
    };
      const selectedCategory = useSelector((state) => state.editSlice.selectedItem);
    //    const categorySlice = useSelector((state) => state.editSlice);
    //    console.log("selectedCategory from Redux state:", selectedCategory);
    //    console.log("categorySlice", categorySlice);

    useEffect(() => {
        // console.log("Redux State:", store.getState());
        console.log("selectedCategory from Redux state:", selectedCategory);
        if (selectedCategory) {
            console.log('Category from state:', selectedCategory);
            setCategory({
                parent_id: selectedCategory.parent_id || '',
                name: selectedCategory.name || '',
                description: selectedCategory.description || '',
                image: selectedCategory.image_path || '',
            });
        }
    }, [selectedCategory]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a FormData object to handle the file upload properly
        const formData = new FormData();
        formData.append('parent_id', category.parent_id);
        formData.append('name', category.name);
        formData.append('description', category.description);
        formData.append('image', category.image);
        if (selectedCategory && selectedCategory.id) {
            formData.append('categoryId', selectedCategory.id);
        }
        if (selectedCategory && selectedCategory.id) {
            await updateCategory(formData)
            
        } else {
            await addCategory(formData)
        }
    };
    if (categoriesLoading) return <p>categories Loading...</p>;
    return (
        <>
            <Layout>
                <button
                    className="mt-3 ml-3 p-2 w-1/12 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                >
                    {selectedCategory ? 'Edit Category' : 'Add Category'}
                </button>

                <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
                    {(isError || isUpdateError) && (
                        <span className="text-red-500 text-sm">
                            {error?.data?.message || updateError?.data?.message || 'An error occurred'}
                        </span>
                    )}

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="parent_id" className="font-semibold mb-1">
                                Select Category:
                            </label>
                            <select
                                name="parent_id"
                                id="parent_id"
                                value={category.parent_id}
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

                            {/* {category.image && (
                            <img
                                src={`http://localhost:5000${category.image}`}
                                alt="Category preview"
                                className="mt-2 w-32 h-32 object-cover"
                            />
                        )} */}
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
                                onClick={() => onCancel()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
}

export default AddCategory;



