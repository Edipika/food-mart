import { Link } from 'react-router-dom';
import logoMain from '../../assets/common/logoMain.png';
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown } from 'react-icons/ai';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
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
                    <div className="flex-shrink-0">
                        <AiOutlineUser className="text-gray-700 mx-4" size={28} />
                    </div>

                    {/* Cart Icon */}
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <AiOutlineShoppingCart className="text-gray-700 mr-10" size={28}  />
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] rounded-full px-2 py-1 mr-10">
                                1
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
       
    );
};

export default Header;