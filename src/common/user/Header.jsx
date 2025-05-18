import { useState } from 'react';
import logoMain from '../../assets/common/logoMain.png';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown } from 'react-icons/ai';
import { logOut } from "../../features/auth/authSlice";
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import CartPanel from '../../features/cart/CartPanel';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const dispatch = useDispatch();
    const { name, token } = useSelector((state) => state.auth);
    const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout();
        dispatch(logOut());
    };

    const totalQuantity = useSelector(state => {
        return state.cartSlice?.products?.reduce((sum, product) => sum + product.quantity, 0);
    });
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
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
                                placeholder="Search..."
                            />
                            <AiOutlineSearch className="absolute right-3 top-3 text-gray-500" size={20} />
                        </div>
                    </div>

                    {/* Login Icon */}
                    <div className="flex-shrink-0 cursor-pointer"
                        onClick={() => setIsOpenProfile(!isOpenProfile)}>
                        <AiOutlineUser className="text-gray-700 mx-4" size={28} />

                        {isOpenProfile && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
                                {token ? (
                                    <>
                                        <p className="px-4 py-2 text-gray-700 font-semibold">{name}</p>
                                        <hr />
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
                                        onClick={() => setIsOpenProfile(false)} // close dropdown after click
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart Icon */}
                    <div className="flex-shrink-0">
                        <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
                            <AiOutlineShoppingCart className="text-gray-700 mr-10" size={28} />
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