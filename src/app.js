import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx";
import Login from "./features/auth/Login.jsx";
import Register from './features/auth/Register.jsx';
import SearchPage from './pages/Search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AddCategory from './features/category/CategoryForm.jsx';
import CategoryList from './features/category/CategoryList.jsx';
import AddProduct from './features/products/ProductForm.jsx';
import ProductList from './features/products/ProductList.jsx';
import AddAdmin from './features/userAdminManagement/AddAdmin.jsx';
import AdminList from './features/userAdminManagement/AdminList.jsx';
import UsersList from './features/userAdminManagement/UsersList.jsx';


function App() {
  return (
    <Routes>

      <Route index element={<HomePage />} />
      <Route path="welcome" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="productDetails" element={<ProductDetails />} />


      {/* Admin Routes */}
      <Route path="admin" element={<AdminList />} />
      <Route path="addAdmin" element={<AddAdmin />} />
      <Route path="userlist" element={<UsersList />} />

      <Route path="product" element={<ProductList />} />
      <Route path="addproduct" element={<AddProduct />} />

      <Route path="category" element={<CategoryList />} />
      <Route path="addcategory" element={<AddCategory />} />

    </Routes>
  );
}

export default App;





