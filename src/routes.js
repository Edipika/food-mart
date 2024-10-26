import SearchPage from "./pages/Search";
import HomePage from "./pages/HomePage";
import {createBrowserRouter} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

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
    path: "/productDetails",
    element:<ProductDetails/>
  },
]);

export default routes;

