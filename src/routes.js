import SearchPage from "./pages/Search";
import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import AddCategory from "./admin/Pages/AddCategory";
import AddProduct from "./admin/Pages/AddProduct";

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
  {
    path: "/addCategory",
    element:<AddCategory/>
  },
  {
    path: "/addCategory",
    element: <AddCategory/>
  },
  {
    path: "/adminLogin",
    element: <Login/>
  },
  {
    path: "/addProduct",
    element: <AddProduct/>
  },
]);

export default routes;





