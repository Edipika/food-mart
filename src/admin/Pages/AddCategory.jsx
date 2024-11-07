// import React, { useState, useEffect } from 'react';
// import Layout from '../common/Layout';

// function AddCategory({ existingCategory }) {
//   const [category, setCategory] = useState({
//     name: '',
//     description: '',
//   });

//   useEffect(() => {
//     if (existingCategory) {
//       setCategory({
//         name: existingCategory.name || '',
//         description: existingCategory.description || '',
//       });
//     }
//   }, [existingCategory]);

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


//     const url = existingCategory
//       ? `http://localhost:5000/categories/delete` // Update URL if editing
//       : 'http://localhost:5000/categories/add'; // Add URL if creating new

//     try {
//       const response = await fetch(url, {
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

//   return (
//     <>

//       <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
//         <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="name" className="font-semibold mb-1">
//               Enter Category Name:
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={category.name}
//               onChange={handleChange}
//               className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
//               placeholder="Category name"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="description" className=" font-semibold mb-1">
//               Enter Description:
//             </label>
//             <textarea
//               type='text'
//               name="description"
//               value={category.description}
//               onChange={handleChange}
//               className="p-2  rounded-md bg-gray-200 text-gray-900 border border-gray-400 focus:border-slate-500 focus:ring focus:ring-slate-300 focus:ring-opacity-50"
//               placeholder="Category description"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="image" className="font-semibold mb-1">
//               Upload Image:
//             </label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleFileChange}
//               className="p-2  bg-gray-200 text-gray-900 border border-gray-400 rounded-md"
//             />
//           </div>

//           <button
//             type="submit"
//             className="p-2 w-1/4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition duration-200"
//           >
//             Add Category
//           </button>
//         </form>

//         {/* Displaying the message */}
//         {message && (
//           <div className="mt-4">
//             {message}
//           </div>
//         )}
//       </div>

//     </>
//   );
// }

// export default AddCategory;

import React, { useState, useEffect } from 'react';

function AddCategory({ existingCategory, onCancel }) {
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (existingCategory) {
            setCategory({
                name: existingCategory.name || '',
                description: existingCategory.description || '',
            });
        }
    }, [existingCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }
        const url = existingCategory
            ? `http://localhost:5000/categories/update` // Update URL if editing
            : 'http://localhost:5000/categories/add';
        try {
            const response = await fetch(url, { method: 'POST', body: formData });
            const data = await response.json();
            if (!response.ok) {
                setIsError(true);
                setMessage(data.error || 'Something went wrong.');
                return;
            }
            setIsError(false);
            setMessage(data.message);
            setCategory({ name: '', description: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-slate-300 h-5/6 m-10 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    className="p-2 rounded-md bg-gray-200 text-gray-900"
                    placeholder="Category name"
                />
                <textarea
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    className="p-2 rounded-md bg-gray-200 text-gray-900"
                    placeholder="Category description"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="p-2 bg-gray-200 text-gray-900 rounded-md"
                />
                <button type="submit" className="p-2 bg-gray-900 text-white rounded-md">Submit</button>
                <button type="button" onClick={onCancel} className="p-2 bg-gray-400 text-white rounded-md mt-2">Cancel</button>
            </form>
            {message && <div className="mt-4">{message}</div>}
        </div>
    );
}

export default AddCategory;

