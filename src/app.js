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
import ExploreCategories from './pages/ExploreCategories.jsx';
import PersistLogin from './features/auth/PersistLogin.js';
import RequireAuth from './features/auth/RequireAuth.js';
import Unauthorized from './features/auth/Unauthorized.js';

const ROLES = {
  'superAdmin': 1,
  'admin': 2,
  'user': 3,
}

function App() {
  return (
    <Routes>

      <Route index element={<HomePage />} />
      <Route path="welcome" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="explore/:categoryId" element={<ExploreCategories />} />
      <Route path="productDetails/:productId" element={<ProductDetails />} />
      <Route path="unauthorized" element={<Unauthorized />} />


      {/* Admin Routes */}
      <Route element={<PersistLogin />}>
        {/* both admin and superadmin allowed */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.superAdmin]} />}>
          <Route path="admin" element={<AdminList />} />
          {/* <Route path="explore/:categoryId" element={<ExploreCategories />} /> */}
          <Route path="userlist" element={<UsersList />} />

          <Route path="product" element={<ProductList />} />
          <Route path="addproduct" element={<AddProduct />} />

          <Route path="category" element={<CategoryList />} />
          <Route path="addcategory" element={<AddCategory />} />
        </Route>

        {/* only superadmin allowed */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.superAdmin]} />}>
          <Route path="addAdmin" element={<AddAdmin />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;

// comment added to push these changes to new branch




