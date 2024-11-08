import React, { useState, useEffect } from 'react';


function AddCategory({ existingCategory, onCancel }) {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        if (existingCategory) {
            console.log(existingCategory);
            setCategory({
                name: existingCategory.name || '',
                description: existingCategory.description || '',
                image: existingCategory.image_path || '',
            });
        }
    }, [existingCategory]);

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Capture the selected file
        // console.log('category image:', selectedFile );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        if (selectedFile) {
            formData.append('image', selectedFile); // Add the image file to the form data
        }


        const url = existingCategory
            ? `http://localhost:5000/categories/delete` // Update URL if editing
            : 'http://localhost:5000/categories/add'; // Add URL if creating new

        try {
            const response = await fetch(url, {
                method: 'POST',
                // headers: {
                //   'Content-Type': 'application/json',
                // },
                body: formData,
                // body:JSON.stringify(category),
            });

            const data = await response.json();
            // ok = (status in the range 200-299)
            if (!response.ok) {
                // const errorData = await response.json();
                // throw new Error(errorData.error || 'Something went wrong');
                setIsError(true); // Set error state
                setMessage(data.error || 'Something went wrong.'); // Display error message
                return;
            }

            // console.log('Category added:', data);
            setIsError(false); // Reset error state
            setMessage(data.message);

            // Reset the form after successful submission
            setCategory({ name: '', description: '' });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <>

            <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
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
                        {/* Display the existing or newly selected image preview */}
                        {(category.image && !selectedFile) ? (
                            <img
                                src={`http://localhost:5000${category.image}`} // Show existing image
                                alt="Category preview"
                                className="mt-2 w-32 h-32 object-cover"
                            />
                        ) : selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)} // Show selected file preview
                                alt="Selected file preview"
                                className="mt-2 w-32 h-32 object-cover"
                            />
                        ) : null}
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
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

                {/* Displaying the message */}
                {message && (
                    <div className="mt-4">
                        {message}
                    </div>
                )}
            </div>

        </>
    );
}

export default AddCategory;



