import { Outlet } from "react-router";
import { Navbar } from "../../../components/navbar/Navbar";
import { Footer } from "../../../components/footer/Footer";
import { AdminDrawer } from "../Sidebar/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <Navbar />
      <div className=" flex justify-between items-center mr-4  p-2  w-full bg-gray-500 text-white  lg:hidden">
        <button onClick={handleToggle} className="text-3xl">
          {isOpen ? "" : <FaBars />}
        </button>
        <div className="text-lg font-semibold">Admin Dashboard</div>
      </div>
      <div className="flex lg:flex-row">
        <aside
          className={`
        fixed   z-40 w-40 bg-gray-500
          ${isOpen ? " " : "hidden"}
        lg:static lg:block lg:w-40         
          `}
          style={{ minHeight: "100vh" }}
        >
          <div>
            <button
              onClick={handleToggle}
              className="absolute right-1  top-3 text-3xl text-white lg:hidden"
            >
              <IoCloseOutline />
            </button>
            <AdminDrawer />
          </div>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
};
