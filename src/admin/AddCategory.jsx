import React, { useState, useEffect } from 'react';
import Layout from './common/Layout';
function AddCategory() {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
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

    try {
      const response = await fetch('http://localhost:5000/categories/add', {
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
      <Layout>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="name">Enter Category Name:</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
          />

          <label htmlFor="description">Enter Description:</label>
          <input
            type="text"
            name="description"
            value={category.description}
            onChange={handleChange}
          />

          <label htmlFor="image">Upload Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />

          <button type="submit">Add Category</button>
        </form>

        {/* Displaying the message */}
        {message && (
          <div >
            {message}
          </div>
        )}
      </Layout>
    </>
  );
}

export default AddCategory;
// className={`message ${isError ? 'error' : 'success'}`}

