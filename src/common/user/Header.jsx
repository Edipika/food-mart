import { useRef, useState, useEffect } from "react";
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
import { Link,useNavigate} from "react-router-dom";
import { useGetSearchProductsQuery } from "../../features/products/productApi";

const Header = () => {
  const navigate = useNavigate(); 
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);
  const {
    data: products,
    isResLoading,
    refetch,
  } = useGetSearchProductsQuery(debouncedSearch, {
    skip: debouncedSearch.trim() === "", // Don't run the query if search is empty
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const { name, token } = useSelector((state) => state.auth);
  const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // delay in ms

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [search]);

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
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4 gap-4">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0 ml-2 sm:ml-4">
            <img className="h-8 sm:h-10 w-auto" src={logoMain} alt="Logo" />
          </div>

          {/* Delivery Location */}
          <div className="hidden lg:block p-2 px-4">
            <div className="flex items-center">
              <span className="font-bold text-sm lg:text-lg">Delivery in</span>
              <span className="font-bold text-sm lg:text-lg ml-1">20 Mins</span>
            </div>
            <div className="flex items-center">
              <button className="text-gray-600 text-xs lg:text-sm">
                Lower Parel, Friends Colony, Hallow Pul, ...
              </button>
              <AiOutlineDown className="ml-1 text-gray-600" size={14} />
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full order-3 lg:order-none lg:flex-1 lg:mx-4">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm"
                placeholder="Search products..."
                value={search}
                ref={searchBoxRef}
                onChange={handleSearchChange}
              />
              <AiOutlineSearch className="absolute right-3 top-3 text-gray-500" size={18} />

              {isResLoading && (
                <p className="absolute bg-white z-50 mt-2">Loading...</p>
              )}
              {showSuggestions && products?.products?.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {products.products.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearch(product.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <Link to={`/search/${product.name}`} className="block w-full h-full">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Profile Icon */}
          <div
            className="relative flex-shrink-0 cursor-pointer"
            onClick={() => setIsOpenProfile(!isOpenProfile)}
          >
            <AiOutlineUser className="text-gray-700 mx-2 sm:mx-4" size={24} />
            {isOpenProfile && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border rounded-lg shadow-lg p-2 z-50">
                {token ? (
                  <>
                    <p className="px-4 py-2 text-gray-700 font-semibold">{name}</p>
                     <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => navigate('/orders')}
                    >
                      orders
                    </button>
                    {/* <hr /> */}
                    <button
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                    onClick={() => setIsOpenProfile(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative flex-shrink-0 cursor-pointer mr-2 sm:mr-4" onClick={() => setIsOpen(true)}>
            <AiOutlineShoppingCart className="text-gray-700" size={24} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5">
              {totalQuantity}
            </span>
          </div>
        </div>
      </div>

      {/* Side Panel Component */}
      <CartPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>

  );
};

export default Header;
