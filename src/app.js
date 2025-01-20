import { Routes, Route } from 'react-router-dom'

import HomePage from "./pages/HomePage.jsx";
import Login from "./features/auth/Login.jsx";
import Register from './features/auth/Register.jsx';
import SearchPage from './pages/Search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AddCategory from './features/category/CategoryForm.jsx';
import CategoryList from './features/category/CategoryList.jsx';
import AddProduct from './features/products/ProductForm.jsx';
import Product from './features/products/Product.jsx';


function App() {
  return (
    <Routes>

      <Route index element={<HomePage />} />
      <Route path="welcome" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="productDetails" element={<ProductDetails />} />

      <Route path="product" element={<Product />} />
      <Route path="category" element={<CategoryList />} />
      <Route path="addcategory" element={<AddCategory />} />


    </Routes>
  );
}

export default App;





