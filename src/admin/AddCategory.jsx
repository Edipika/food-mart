import React, { useState, useEffect } from 'react';
function AddCategory() {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log('Field name:', name);
    // console.log('Field value:', value);
    // console.log('Previous category state:', category );
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Category</button>
      </form>

      {/* Displaying the message */}
      {message && (
        <div >
          {message}
        </div>
      )}
    </>
  );
}

export default AddCategory;
// className={`message ${isError ? 'error' : 'success'}`}