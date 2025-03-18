import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { BASE_URL } from "../../app/api/axios";
import logoMain from "../../assets/common/logoMain.png";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineDown,
} from "react-icons/ai";
import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import CartPanel from "../../features/cart/CartPanel";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
// import totalProductQuantity from '../../features/cart/cartSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    dispatch(logOut());
  };

  const totalQuantity = useSelector((state) => {
    return state.cartSlice?.products?.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  });

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);

  // const List = ({ searchTerm }) => {

  //     const {
  //         isLoading,
  //         error,
  //         data,
  //     } = useSWR(
  //         searchTerm ? searchTerm : null,
  //         getWikiSearchResults
  //     )

  //     let content
  //     if (isLoading) content = <p>Loading...</p>
  //     else if (error) content = <p>{error.message}</p>
  //     else if (data?.query?.pages) {
  //         const results = data?.query?.pages
  //         content = (
  //             <ul>
  //                 {Object.values(results).map(result => {
  //                     return <Item key={result.pageid} result={result} />
  //                 })}
  //             </ul>
  //         )
  //     }
  const fetchSearchResults = async (searchTerm) => {
    try {
      const response = await axios.get("http://localhost:5000/search", {
        params: { query: searchTerm },
      });

      //   console.log("Search Results:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching search results:",
        error.response?.data || error.message
      );
      return [];
    }
  };
  const { isLoading, data } = useSWR(
    debouncedSearchValue ? debouncedSearchValue : null,
    // fetchSearchResults(debouncedSearchValue)
    () => fetchSearchResults(debouncedSearchValue)
  );
  console.log("Search Results: swr", data);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0 ml-10">
            <img className="h-10 w-auto" src={logoMain} alt="Logo" />
          </div>

          {/* location */}
          <div className="p-2 px-4">
            <div className="flex items-center">
              <span className="font-bold text-lg">Delivery in</span>
              <span className="font-bold text-lg ml-1">7 Mins</span>
            </div>
            <div className="flex items-center">
              <button className="text-gray-600 text-sm">
                Lower Parel, Friends Colony, Hallow Pul, ...
              </button>
              <AiOutlineDown className="ml-1 text-gray-600" size={16} />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 rounded-lg">
            <div className="relative">
              <input
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <AiOutlineSearch
                className="absolute right-3 top-3 text-gray-500"
                size={20}
              />
            </div>
            {/* Search Results */}
            {debouncedSearchValue && (
              <div className="mt-4 border border-gray-300 rounded-lg shadow-md">
                {isLoading ? (
                  <div className="px-4 py-2 text-gray-500">Loading...</div>
                ) : data?.products?.length > 0 ? (
                  data.products.map((product) => (
                    // <a href=""></a>http://localhost:3000/productDetails/1
                    <Link to={`/productDetails/${product.id}`}>
                    <div
                      key={product.id}
                      className="flex items-center px-4 py-2 border-b last:border-none hover:bg-indigo-100"
                    >
                      <img
                        src={`${BASE_URL}/${product.image_path}`}
                        alt={product.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <span>{product.name}</span>
                    </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Login Icon */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AiOutlineUser className="text-gray-700 mx-4" size={28} />

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
                <p className="px-4 py-2 text-gray-700 font-semibold">
                  {name || "Guest"}
                </p>
                <hr />
                <button
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="flex-shrink-0">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <AiOutlineShoppingCart
                className="text-gray-700 mr-10"
                size={28}
              />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] rounded-full px-2 py-1 mr-10">
                {totalQuantity}
              </span>
            </div>
          </div>

          {/* Side Panel Component */}
          <CartPanel isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
