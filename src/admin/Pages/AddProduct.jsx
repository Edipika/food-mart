import React, { useState } from 'react';
import Layout from '../common/Layout';

function AddProduct() {
    //   const [category, setCategory] = useState({
    //     name: '',
    //     description: '',
    //   });
    //   const [message, setMessage] = useState('');
    //   const [isError, setIsError] = useState(false);
    //   const [selectedFile, setSelectedFile] = useState(null);

    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCategory((prevCategory) => ({
    //       ...prevCategory,
    //       [name]: value,
    //     }));
    //   };

    //   const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]); // Capture the selected file
    //     // console.log('category image:', selectedFile );
    //   };


    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('name', category.name);
    //     formData.append('description', category.description);
    //     if (selectedFile) {
    //       formData.append('image', selectedFile); // Add the image file to the form data
    //     }

    //     try {
    //       const response = await fetch('http://localhost:5000/categories/add', {
    //         method: 'POST',
    //         // headers: {
    //         //   'Content-Type': 'application/json',
    //         // },
    //         body: formData,
    //         // body:JSON.stringify(category),
    //       });

    //       const data = await response.json();
    //       // ok = (status in the range 200-299)
    //       if (!response.ok) {
    //         // const errorData = await response.json();
    //         // throw new Error(errorData.error || 'Something went wrong');
    //         setIsError(true); // Set error state
    //         setMessage(data.error || 'Something went wrong.'); // Display error message
    //         return;
    //       }

    //       // console.log('Category added:', data);
    //       setIsError(false); // Reset error state
    //       setMessage(data.message);

    //       // Reset the form after successful submission
    //       setCategory({ name: '', description: '' });
    //     } catch (error) {
    //       console.error('Error adding category:', error);
    //     }
    //   };

    return (
        <>
            <Layout>
                <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
                    <form  encType="multipart/form-data" className="flex flex-col space-y-4">
                        {/* Category Dropdown */}
                        <div className="flex flex-col">
                            <label htmlFor="category" className="font-semibold mb-1">
                                Select Category:
                            </label>
                            <select
                                name="category"
                                // value={product.category}
                                // onChange={handleChange}
                                className="p-2 rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                            >
                                <option value="">--Select Category--</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home</option>
                                <option value="books">Books</option>
                                {/* Add more categories as needed */}
                            </select>
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold mb-1">
                                Product Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                // value={product.name}
                                // onChange={handleChange}
                                className="p-2 rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Product name"
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="font-semibold mb-1">
                                Product Description:
                            </label>
                            <textarea
                                name="description"
                                // value={product.description}
                                // onChange={handleChange}
                                className="p-2 rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
                                placeholder="Product description"
                                rows="3"
                            />
                        </div>

                        {/* Product Image */}
                        <div className="flex flex-col">
                            <label htmlFor="image" className="font-semibold mb-1">
                                Upload Product Image:
                            </label>
                            <input
                                type="file"
                                name="image"
                                // onChange={handleFileChange}
                                className="p-2 bg-gray-200 text-gray-900 border border-gray-400 rounded-md"
                            />
                        </div>

                        {/* Add Product Button */}
                        <button
                            type="submit"
                            className="p-2 w-1/4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            Add Product
                        </button>
                    </form>

                    {/* Displaying the message */}
                    {/* {message && (
                        <div className="mt-4 text-white">
                            {message}
                        </div>
                    )} */}
                </div>

            </Layout>
        </>
    );
}

export default AddProduct;
// className={`message ${isError ? 'error' : 'success'}`}

