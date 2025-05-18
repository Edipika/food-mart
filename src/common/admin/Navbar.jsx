import { CgProfile } from "react-icons/cg";
import { MdPerson } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
// import {removeUser} from '../../slice/authSlice'


function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    return (
        <>
            <div className="relative">
                <div className="h-12 bg-slate-300 flex flex-row justify-end">
                    <button onClick={toggleDropdown}>
                        <div className="flex">
                            <CgProfile className="m-2 text-gray-900" size={26} />
                            {/* <p className="mr-5 mt-2 text-gray-900">Admin</p> */}
                            {/* <p className="mr-5 mt-2 text-gray-900">{userEmail || "Admin"}</p> Display email */}
                        </div>
                    </button>
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                        <button className="flex w-full px-4 py-2 text-gray-900 hover:bg-gray-100">
                            <MdPerson className="mr-2" size={20} />
                            Profile
                        </button>
                        <button className="flex w-full px-4 py-2 text-gray-900 hover:bg-gray-100">
                            <FiLogOut className="mr-2" size={20} />
                            Logout
                        </button>
                    </div>
                 )} 
            </div>
        </>
    );
}

export default Navbar;