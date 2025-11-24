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
      <div className="bg-slate-100 min-h-screen">
        <div className="flex justify-between items-center px-5 py-4 w-full bg-slate-900 text-white shadow lg:hidden">
          <button
            onClick={handleToggle}
            className="text-3xl"
            aria-label="Toggle admin menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <IoCloseOutline /> : <FaBars />}
          </button>
          <div className="text-lg font-semibold tracking-wide">Admin Dashboard</div>
        </div>

        {isOpen && (
          <aside className="lg:hidden border-b border-slate-800 shadow-inner">
            <AdminDrawer />
          </aside>
        )}

        <div className="flex lg:flex-row">
          <aside className="hidden lg:block lg:w-64 bg-slate-900 text-white min-h-screen">
            <AdminDrawer />
          </aside>
          <main className="flex-1 px-4 py-6 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};
