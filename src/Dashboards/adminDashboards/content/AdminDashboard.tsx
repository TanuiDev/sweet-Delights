import { Outlet } from "react-router";
import { Navbar } from "../../../components/navbar/Navbar";
import { Footer } from "../../../components/footer/Footer";
import { AdminDrawer } from "../Sidabar/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <Navbar />
      <div>
     <button onClick={handleToggle} className="m-2 p-2 text-2xl lg:hidden">
          {isOpen ? <IoCloseOutline /> : <FaBars />}
     </button>
        
      </div>
      <div className="flex lg:flex-row">
        <aside className={`
        fixed  top-0 z-40 w-40 bg-gray-500
        lg:static lg:block lg:w-40         
          `}
      style={{minHeight:'100vh'}}
          >
          <AdminDrawer />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
};
