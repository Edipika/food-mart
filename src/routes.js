import SearchPage from "./pages/Search";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import AddCategory from "./admin/Pages/AddCategory";
import AddProduct from "./admin/Pages/AddProduct";
import CategoryList from "./admin/Pages/CategoryList.jsx";

import Login from "./admin/Pages/Login"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/search",
    element:<SearchPage/>
  },
  // {
  //   path: "/addCategory",
  //   element:<AddCategory/>
  // },
  {
    path: "/addCategory",
    element: <ProtectedRoute element={AddCategory}/> 
  },
  {
    path: "/adminLogin",
    element: <Login/>
  },
  {
    path: "/categoryList",
    element: <CategoryList/>
  },
  {
    path: "/addProduct",
    element: <AddProduct/>
  },
]);

export default routes;





