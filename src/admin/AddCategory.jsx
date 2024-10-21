function AddCategory() {

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