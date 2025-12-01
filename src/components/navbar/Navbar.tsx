import { FaOpencart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

import { NavLink } from "react-router";

export const Navbar = () => {
  const isCustomerLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "customer",
  );
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "admin",
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
      isActive
        ? "text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50"
        : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8 py-3">
      
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-100 w-64 p-4 shadow-2xl rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              {isCustomerLoggedIn ? (
                <li>
                  <NavLink
                    to="/customer/dashboard/cakes"
                    className={({ isActive }) =>
                      `rounded-lg transition-all ${
                        isActive
                          ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                          : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : isAdminLoggedIn ? (
                <li>
                  <NavLink
                    to="/admin/dashboard/ready"
                    className={({ isActive }) =>
                      `rounded-lg transition-all ${
                        isActive
                          ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                          : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              ) : null}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-linear-to-r from-pink-500 to-rose-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/"
            className="btn btn-ghost text-xl md:text-2xl font-extrabold hover:bg-transparent p-2"
          >
            <span className="bg-linear-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
              Sweet
            </span>
            <span className="text-gray-800 dark:text-white ml-1">Delights</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            {isCustomerLoggedIn ? (
              <li>
                <NavLink
                  to="/customer/dashboard/cakes"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>
              </li>
            ) : isAdminLoggedIn ? (
              <li>
                <NavLink to="/admin/dashboard/ready" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
            ) : null}
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Cart Icon */}
        <div className="navbar-end">
          <div className="relative group">
            <button className="relative p-3 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 group">
              <FaOpencart className="text-2xl md:text-3xl text-pink-600 dark:text-pink-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300" />
              {/* Cart Badge - You can add dynamic count here */}
              <span className="absolute top-1 right-1 w-5 h-5 bg-linear-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </button>
            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
              <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                View Cart
                <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
