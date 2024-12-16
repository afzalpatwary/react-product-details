import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const product = {
    title: "Stylish Smartwatch",
    oldPrice: 199.99,
    newPrice: 149.99,
    intro: "A stylish and modern smartwatch with advanced features.",
    type: "Wearable",
    model: "SW-2024",
    images: {
      red: "https://via.placeholder.com/150/FF0000",
      blue: "https://via.placeholder.com/150/0000FF",
      green: "https://via.placeholder.com/150/00FF00",
    },
    sizes: {
      S: 149.99,
      M: 154.99,
      L: 159.99,
      XL: 164.99,
    },
    colors: ["red", "blue", "green"],
  };

  const handleAddToCart = () => {
    const item = {
      image: product.images[selectedColor],
      title: product.title,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.sizes[selectedSize] * quantity,
    };

    setCartItems([...cartItems, item]);
    setCartVisible(true);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Product Images */}
      <div className="flex justify-center items-center">
        <img
          src={product.images[selectedColor]}
          alt="Product"
          className="w-3/4 rounded-lg shadow-lg"
        />
      </div>

      {/* Right: Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-xl">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          <span className="ml-2">4.0 (120 reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-gray-500 line-through mr-2">${product.oldPrice}</span>
          <span className="text-green-600 font-bold text-xl">${product.newPrice}</span>
        </div>

        {/* Intro */}
        <p className="mb-4">{product.intro}</p>

        {/* Type and Model */}
        <p className="mb-4">
          <strong>Type:</strong> {product.type}
        </p>
        <p className="mb-4">
          <strong>Model:</strong> {product.model}
        </p>

        {/* Band Color Options */}
        <div className="mb-4">
          <p className="mb-2 font-bold">Band Color:</p>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color
                    ? "border-black"
                    : "border-gray-300"
                  }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="mb-4">
          <p className="mb-2 font-bold">Size:</p>
          <div className="flex space-x-2">
            {Object.keys(product.sizes).map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded ${selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size} (${product.sizes[size].toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Buttons */}
        <div className="mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <button
              className="px-4 py-2 bg-gray-200"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-4 py-2 bg-gray-200"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded mr-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button className="px-6 py-2 bg-gray-300 rounded">Wishlist</button>
        </div>

        {/* Checkout Button */}
        <button
          className="w-full px-6 py-3 bg-green-500 text-white rounded mt-4"
          onClick={() => setCartVisible(true)}
        >
          Checkout ({cartItems.length})
        </button>
      </div>

      {/* Cart Popup */}
      {cartVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Color</th>
                  <th className="border p-2">Size</th>
                  <th className="border p-2">Qnt</th>
                  <th className="border p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <img src={item.image} alt="" className="w-12 h-12" />
                      {item.title}
                    </td>
                    <td className="border p-2">{item.color}</td>
                    <td className="border p-2">{item.size}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold">${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <button
                className="px-6 py-2 bg-gray-300 rounded"
                onClick={() => setCartVisible(false)}
              >
                Continue Shopping
              </button>
              <button className="px-6 py-2 bg-green-500 text-white rounded">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
