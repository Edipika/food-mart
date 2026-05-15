import Navbar from "./Navbar";
import SidePanel from "./SidePanel";

const Layout = ({ children }) => {
    return (
        <div>
            <div className="flex">
                <SidePanel />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;