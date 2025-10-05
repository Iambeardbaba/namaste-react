import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty p-8 text-center max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items from the menu to get started!
          </p>
          <a
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Restaurants
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart p-6 max-w-4xl mx-auto">
      <div className="cart-header bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <button
            onClick={handleClearCart}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Clear Cart
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-600">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
          </span>
          <span className="text-2xl font-bold text-green-600">
            Total: ₹{totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="cart-items space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cart-item bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-green-600 mb-2">
                  ₹{item.price}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center space-x-4">
                  <div className="quantity-controls flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-l-lg transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800 bg-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-r-lg transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              {item.imageId && (
                <div className="ml-6">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/w_150,h_150,c_fill/${item.imageId}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold text-gray-800">
            Grand Total ({totalItems} item{totalItems !== 1 ? "s" : ""})
          </span>
          <span className="text-3xl font-bold text-green-600">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex space-x-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg">
            Proceed to Checkout
          </button>
          <a
            href="/"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg text-center"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
