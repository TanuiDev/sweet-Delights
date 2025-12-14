import { FaOpencart } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { NavLink } from "react-router";
import { useState } from "react";
import { MdClose, MdAdd, MdRemove } from "react-icons/md";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../features/cart/cartSlice";
import { logout } from "../../features/Auth/userSlice";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isCustomerLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "customer",
  );
  const isAdminLoggedIn = useSelector(
    (state: RootState) => state.user.user?.role === "admin",
  );
  const cartItemsCount = useSelector(
    (state: RootState) => state.cart.totalItems,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(price);

  const handleQuantityChange = (cakeId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(cakeId));
    } else {
      dispatch(updateQuantity({ cakeId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (cakeId: number) => {
    dispatch(removeFromCart(cakeId));
  };

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
              {!isCustomerLoggedIn && !isAdminLoggedIn ? (
                <>
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
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    className="rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 w-full text-left px-4 py-2"
                  >
                    Logout
                  </button>
                </li>
              )}
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

        {/* Desktop Menu */}
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
            {!isCustomerLoggedIn && !isAdminLoggedIn ? (
              <>
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
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                  className="px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Cart Icon */}
        <div className="navbar-end">
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-3 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
            >
              <FaOpencart className="text-2xl md:text-3xl text-pink-600 dark:text-pink-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-300" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-linear-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown Dialog */}
            {isCartOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCartOpen(false)}
                ></div>

                {/* Cart Dialog */}
                <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Shopping Cart ({cartItemsCount})
                    </h3>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <MdClose className="text-xl text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <FaOpencart className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        Your cart is empty
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-y-auto flex-1 p-4 space-y-3">
                        {cartItems.map((item) => (
                          <div
                            key={item.cakeId}
                            className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 hover:shadow-md transition-shadow"
                          >
                            {/* Image */}
                            <img
                              src={item.imageURL}
                              alt={item.cakeName}
                              className="w-20 h-20 object-cover rounded-lg shrink-0"
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                  {item.cakeName}
                                </h4>
                                <button
                                  onClick={() => handleRemoveItem(item.cakeId)}
                                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors shrink-0"
                                  title="Remove"
                                >
                                  <MdClose
                                    className="text-red-600 dark:text-red-400"
                                    size={16}
                                  />
                                </button>
                              </div>

                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                {formatPrice(item.price)} each
                              </p>

                              <div className="flex items-center justify-between">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.cakeId,
                                        item.quantity - 1,
                                      )
                                    }
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    <MdRemove
                                      size={14}
                                      className="text-gray-700 dark:text-gray-300"
                                    />
                                  </button>
                                  <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        item.cakeId,
                                        item.quantity + 1,
                                      )
                                    }
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                  >
                                    <MdAdd
                                      size={14}
                                      className="text-gray-700 dark:text-gray-300"
                                    />
                                  </button>
                                </div>

                                {/* Item Total */}
                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
                        <div className="flex items-center justify-between text-lg font-bold">
                          <span className="text-gray-900 dark:text-white">
                            Total
                          </span>
                          <span className="text-purple-600 dark:text-purple-400">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>

                        <button className="w-full bg-linear-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                          Checkout
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm("Clear all items from cart?")) {
                              dispatch(clearCart());
                            }
                          }}
                          className="w-full text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg transition-colors"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
