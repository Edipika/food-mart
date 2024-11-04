import SearchPage from "./pages/Search";
import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import AddCategory from "./admin/AddCategory";
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
    path: "/admin",
    element: <AddCategory/>
  },
  {
    path: "/adminLogin",
    element: <Login/>
  },
]);

export default routes;





