import { Outlet } from "react-router";
import { Navbar } from "../../../components/navbar/Navbar";
import { Footer } from "../../../components/footer/Footer";
import { AdminDrawer } from "../Sidabar/AdminDrawer";

export const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
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
