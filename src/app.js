import { Routes, Route } from 'react-router-dom'

import HomePage from "./pages/HomePage.jsx";
import Login from "./features/auth/Login.jsx";
import Register from './features/auth/Register.jsx';
import  SearchPage from './pages/Search.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AddCategory from './admin/Pages/AddCategory.jsx';


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      {/* public routes */}
      <Route index element={<HomePage />} />
      <Route path="welcome" element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="productDetails" element={<ProductDetails />} />
      <Route path="category" element={<AddCategory />} />

      {/* <Route element={<PersistLogin />}> */}
      {/* protected routes */}
      {/* <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
          </Route>
        </Route> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;





