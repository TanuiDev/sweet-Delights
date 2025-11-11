import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Ready } from "./pages/Ready";
import { Templates } from "./pages/Templates";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/ready",
      element: <Ready />,
    },
    {
      path: "/templates",
      element: <Templates />,
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
