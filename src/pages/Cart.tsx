import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import { MdDelete, MdRemove, MdAdd } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
import { Navbar } from "../components/navbar/Navbar";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

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

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {totalItems === 0
                ? "Your cart is empty"
                : `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <FaShoppingCart className="text-8xl text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any cakes yet. Browse our
                collection and find your perfect cake!
              </p>
              <Link
                to="/customer/dashboard/cakes"
                className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Cakes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cakeId}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-6">
                      {/* Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0">
                        <img
                          src={item.imageURL}
                          alt={item.cakeName}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.cakeName}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            {item.size && (
                              <p>
                                <span className="font-medium">Size:</span>{" "}
                                {item.size}
                              </p>
                            )}
                            {item.flavorsUsed && (
                              <p>
                                <span className="font-medium">Flavors:</span>{" "}
                                {item.flavorsUsed}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.cakeId,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                              <MdRemove size={18} />
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.cakeId,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                              <MdAdd size={18} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                            <p className="text-xl font-bold text-purple-600">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.cakeId)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Remove from cart"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <button
                  onClick={handleClearCart}
                  className="w-full sm:w-auto px-6 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-purple-600">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl mb-3">
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/customer/dashboard/cakes"
                    className="block w-full text-center text-pink-600 hover:text-pink-700 font-medium py-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
