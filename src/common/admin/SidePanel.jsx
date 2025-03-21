import { Link } from 'react-router-dom';


function SidePanel() {

    return (
        <>
            <div className="w-64 h-screen bg-gray-950 opacity-85 flex flex-col p-4 sticky top-0">
                <div className="text-xl font-bold mb-6 text-white">Food Mart</div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="/category" className="text-white">Category</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/product" className="text-white">Products</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/userlist" className="text-white">Users</Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/admin" className="text-white">Manage Admins</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SidePanel;