import { CgProfile } from "react-icons/cg";
import { MdPerson } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";


function Navbar() {

    return (
        <>
            <div className="h-12 bg-slate-300 flex flex-row justify-end">
                <button >
                    <div className="flex">
                        <CgProfile className="m-2 text-gray-900" size={26} />
                        <p className="mr-5 mt-2 text-gray-900">Admin</p>
                    </div>
                </button>
            </div>
            <div className="flex">
                <MdPerson className="m-2 text-gray-900" size={26} />
                <p className="mr-5 mt-2 text-gray-900">Profile</p>
            </div>
            <div className="flex">
                <FiLogOut className="m-2 text-gray-900" size={26} />
                <p className="mr-5 mt-2 text-gray-900">Logout</p>
            </div>
        </>
    ); 
}

export default Navbar;