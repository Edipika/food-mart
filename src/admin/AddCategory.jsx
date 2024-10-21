function AddCategory() {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image_path: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
          ...prevCategory,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/api/categories', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Category added:', data);
    
          // Reset the form after successful submission
          setCategory({ name: '', description: '', image_path: '' });
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

            <label htmlFor="image_path">Image Path:</label>
            <input
                type="text"
                name="image_path"
                value={category.image_path}
                onChange={handleChange}
            />

            <button type="submit">Add Category</button>
        </form>
        </>
    );
}

export default AddCategory;