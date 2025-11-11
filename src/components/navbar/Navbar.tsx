import { FaOpencart } from "react-icons/fa6";

import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-white dark:bg-gray-400 shadow-md px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content text-3xl text-black bg-red-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/ready">Ready made</NavLink>
            </li>
            <li>
              <NavLink to="/templates ">Templates</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl md:text-xl font-bold">
          <span className="text-2xl md:text-3xl text-purple-500">Sweet</span>
          Delights
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  text-xl font-bold px-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/ready">Ready made</NavLink>
          </li>
          <li>
            <NavLink to="/templates">Templates</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <FaOpencart className="text-3xl font-bold text-purple-500 hover:text-purple-700 cursor-pointer" />
      </div>
    </div>
  );
};
