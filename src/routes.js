import SearchPage from "./pages/Search";
import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import AddCategory from "./admin/AddCategory";

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
]);

export default routes;

