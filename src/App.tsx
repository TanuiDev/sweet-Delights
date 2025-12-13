import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";

import "./App.css";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Verify } from "./pages/Verify";
import { AdminDashboard } from "./Dashboards/adminDashboards/content/AdminDashboard";
import { UserDashboard } from "./Dashboards/userDashboards/content/UserDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { Users } from "./Dashboards/adminDashboards/content/User/Users";
import { Orders } from "./Dashboards/adminDashboards/content/Orders/Orders";
import { ReadyMade } from "./Dashboards/adminDashboards/content/Cakes/ReadyMade";
import { Templates } from "./Dashboards/adminDashboards/content/Cakes/Templates";
import { Cake } from "./Dashboards/userDashboards/content/Cakes/Cakes";
import { MyOrders } from "./Dashboards/userDashboards/content/Orders/MyOrders";
import { Profile } from "./Dashboards/userDashboards/content/Profile/Profile";
import { UserTemplates } from "./Dashboards/userDashboards/content/Templates/UserTemplates";
import { Cart } from "./pages/Cart";

function App() {
  const isCustomerLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "customer",
  );
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "admin",
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/admin/dashboard/",
      element: isAdminLoggedIn ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: "ready",
          element: <ReadyMade />,
        },
        {
          path: "templates",
          element: <Templates />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "users",
          element: <Users />,
        },
      ],
    },
    {
      path: "/customer/dashboard/",
      element: isCustomerLoggedIn ? <UserDashboard /> : <Login />,
      children: [
        {
          path: "cakes",
          element: <Cake />,
        },
        {
          path: "designs",
          element: <UserTemplates />,
        },
        {
          path: "myorders",
          element: <MyOrders />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
