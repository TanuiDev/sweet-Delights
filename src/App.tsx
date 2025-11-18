import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";

import "./App.css";
import { Home } from "./pages/Home";
import { Ready } from "./pages/Ready";
import { Templates } from "./pages/Templates";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Verify } from "./pages/Verify";
import { AdminDashboard } from "./Dashboards/adminDashboards/content/AdminDashboard";
import { UserDashboard } from "./Dashboards/userDashboards/content/UserDashboard";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import { Users } from "./Dashboards/adminDashboards/content/Users";

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
      path: "/admin/dashboard/ready",
      element: isAdminLoggedIn ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: "ready",
          element: <Ready />,
        },
        {
          path: "templates",
          element: <Templates />,
        },
        {
          path: "orders",
          element: <h1>Orders</h1>,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "profile",
          element: <h1>Profile</h1>,
        },
      ],
    },
    {
      path: "/customer/dashboard/",
      element: isCustomerLoggedIn ? <UserDashboard /> : <Login />,
      children: [
        {
          path: "ready",
          element: <Ready />,
        },
        {
          path: "templates",
          element: <Templates />,
        },
        {
          path: "myorders",
          element: <h1>Orders</h1>,
        },
        {
          path: "profile",
          element: <h1>Profile</h1>,
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
