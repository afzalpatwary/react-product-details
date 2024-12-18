import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "./App.css";

import purpleImg from '../src/assets/img/product-img1.png';
import blackImg from '../src/assets/img/product-img2.png';
import blueImg from '../src/assets/img/product-img3.png';
import cyanImg from '../src/assets/img/product-img4.png';
import starbl from '../src/assets/img/star-bl.svg';
import starhf from '../src/assets/img/star-hf.svg';
import star from '../src/assets/img/star.svg';

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const product = {
    title: "Classy Modern Smart watch",
    oldPrice: 199.99,
    newPrice: 149.99,
    intro: "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
    type: "Watch",
    model: "Forerunner 290XT",
    images: {
      purple: purpleImg,
      cyan: cyanImg,
      blue: blueImg,
      black: blackImg,
    },
    sizes: {
      S: 149.99,
      M: 154.99,
      L: 159.99,
      XL: 164.99,
    },
    colors: [
      { name: "purple", hex: "#816BFF" },
      { name: "cyan", hex: "#1FCEC9" },
      { name: "blue", hex: "#4B97D3" },
      { name: "black", hex: "#3B4747" },
    ],
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
    <div className="pt-[50px] lg:pt-[120px]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-[30px] lg:gap-[60px] items-center pb-[50px] lg:pb-[112px]">
        {/* Left: Product Images */}
        <div className="flex justify-center items-center">
          <img
            src={product.images[selectedColor]}
            alt="Product"
            className="w-3/4 rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-s28 lg:text-s40 text-dark_blue font-bold mb-[10px] leading-tight capitalize">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="flex gap-1 items-center">
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={star} alt="star" />
              <img src={starhf} alt="star" />
              <img src={starbl} alt="star" />
            </span>
            <span className="ml-2 text-gray text-s14 leading-snug capitalize font-normal">(2 reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-gray text-s20 font-normal leading-snug line-through mr-2">${product.oldPrice}</span>
            <span className="font-bold text-s24 text-purple" style={{ color: "#6576FF" }}>
              ${product.newPrice}
            </span>
          </div>

          {/* Intro */}
          <p className="text-[14px] lg:text-[18px] leading-[24px] lg:leading-[30px] text-gray font-normal mb-[20px]">{product.intro}</p>

          {/* Type and Model */}
          <div className="flex gap-[43px] mb-[20px]">
            <div className="">
              <span className="text-s14 font-normal text-gray leading-snug block mb-1">Type:</span>
              <span className="text-s16 font-bold text-dark_blue leading-snug block">
                {product.type}
              </span>
            </div>
            <div className="">
              <span className="text-s14 font-normal text-gray leading-snug block mb-1">Model:</span>
              <span className="text-s16 font-bold text-dark_blue leading-snug block">
                {product.model}
              </span>
            </div>
          </div>

          {/* Band Color Options */}
          <div className="mb-5">
            <p className="mb-2 text-s[18px] font-bold text-dark_blue leading-snug block">
              Band Color
            </p>
            <div className="flex space-x-4 items-center">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-[16px] h-[16px] rounded-full transition-all ${selectedColor === color.name
                    ? "border-2 border-emerald-300 w-[24px] h-[24px]"
                    : "border-0"
                    }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mb-4">
            <p className="mb-2 font-bold text-s[18px] text-dark_blue leading-snug">
              Wrist Size
            </p>
            <div className="flex gap-[12px] lg:space-x-[12px] flex-wrap">
              {Object.keys(product.sizes).map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded transition-all flex items-center justify-center ${selectedSize === size
                    ? "border-[#6576FF] text-[#6576FF]"
                    : "text-[#364A63] border-gray"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  <span
                    className={`font-bold text-s14 ${selectedSize === size ? "text-[#6576FF]" : ""
                      }`}
                  >
                    {size}
                  </span>
                  <span
                    className="ml-2 text-[#8091A7] text-s12 text-gray"
                  >{`($${product.sizes[size].toFixed(2)})`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Buttons */}
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex items-center text-gray text-s14 font-normal border border-gray rounded-[4px] overflow-hidden">
              <button
                className="px-3 text-s14 flex justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1607 1.675H1.03926C0.825977 1.675 0.642318 1.60391 0.488281 1.46172C0.346094 1.30768 0.275 1.12402 0.275 0.910742C0.275 0.70931 0.346094 0.5375 0.488281 0.395312C0.642318 0.241276 0.825977 0.164257 1.03926 0.164257H13.1607C13.374 0.164257 13.5518 0.241276 13.6939 0.395312C13.848 0.5375 13.925 0.70931 13.925 0.910742C13.925 1.12402 13.848 1.30768 13.6939 1.46172C13.5518 1.60391 13.374 1.675 13.1607 1.675Z" fill="#8091A7" />
                </svg>


              </button>
              <span className="border-l border-r border-gray w-[60px] h-[36px] text-center flex items-center justify-center ">{quantity}</span>
              <button
                className="px-3 text-s14"
                onClick={() => setQuantity(quantity + 1)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.1607 6.16426C13.374 6.16426 13.5518 6.24128 13.6939 6.39531C13.848 6.5375 13.925 6.70931 13.925 6.91074C13.925 7.12402 13.848 7.30768 13.6939 7.46172C13.5518 7.60391 13.374 7.675 13.1607 7.675H7.86426V12.9893C7.86426 13.1907 7.78724 13.3684 7.6332 13.5225C7.49102 13.6646 7.31328 13.7357 7.1 13.7357C6.88672 13.7357 6.70306 13.6646 6.54902 13.5225C6.40684 13.3684 6.33574 13.1907 6.33574 12.9893V7.675H1.03926C0.825977 7.675 0.642318 7.60391 0.488281 7.46172C0.346094 7.30768 0.275 7.12402 0.275 6.91074C0.275 6.70931 0.346094 6.5375 0.488281 6.39531C0.642318 6.24128 0.825977 6.16426 1.03926 6.16426H6.33574V0.849999C6.33574 0.636718 6.40684 0.458984 6.54902 0.316796C6.70306 0.16276 6.88672 0.0857416 7.1 0.0857416C7.31328 0.0857416 7.49102 0.16276 7.6332 0.316796C7.78724 0.458984 7.86426 0.636718 7.86426 0.849999V6.16426H13.1607Z" fill="#8091A7" />
                </svg>

              </button>
            </div>
            <button
              className="px-[18px] py-[8px] bg-blue text-[13px] font-bold text-white rounded h-[36px]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button type="button">
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 15.3729C9.39102 15.3729 9.28809 15.3547 9.19121 15.3184C9.10645 15.2699 9.02773 15.2154 8.95508 15.1549L2.39785 8.59766C1.96191 8.14961 1.6168 7.63496 1.3625 7.05371C1.1082 6.46035 0.981055 5.83066 0.981055 5.16465C0.981055 4.48652 1.1082 3.85684 1.3625 3.27559C1.6168 2.68223 1.96191 2.16758 2.39785 1.73164C2.83379 1.28359 3.34844 0.932422 3.9418 0.678125C4.53516 0.423828 5.16484 0.296679 5.83086 0.296679C6.49687 0.296679 7.12656 0.423828 7.71992 0.678125C8.31328 0.932422 8.82793 1.28359 9.26387 1.73164L9.5 1.96777L9.73613 1.71348C10.1721 1.27754 10.6807 0.932422 11.2619 0.678125C11.8553 0.423828 12.485 0.296679 13.151 0.296679C13.1631 0.296679 13.1691 0.296679 13.1691 0.296679C13.1813 0.296679 13.1873 0.296679 13.1873 0.296679C13.8533 0.296679 14.477 0.423828 15.0582 0.678125C15.6516 0.932422 16.1662 1.28359 16.6021 1.73164C17.0381 2.16758 17.3832 2.68223 17.6375 3.27559C17.8918 3.85684 18.0189 4.48652 18.0189 5.16465C18.0189 5.83066 17.8918 6.46035 17.6375 7.05371C17.3832 7.63496 17.0381 8.14961 16.6021 8.59766L10.0449 15.1549C9.97227 15.2154 9.8875 15.2699 9.79063 15.3184C9.70586 15.3547 9.60898 15.3729 9.5 15.3729ZM5.83086 1.85879C4.92266 1.85879 4.1416 2.17969 3.4877 2.82148C2.8459 3.46328 2.525 4.24434 2.525 5.16465C2.525 5.6127 2.60977 6.04258 2.7793 6.4543C2.96094 6.85391 3.19707 7.19902 3.4877 7.48965L9.5 13.502L15.5123 7.48965C15.8029 7.19902 16.033 6.85391 16.2025 6.4543C16.3842 6.04258 16.475 5.6127 16.475 5.16465C16.475 4.70449 16.3842 4.27461 16.2025 3.875C16.033 3.47539 15.8029 3.12422 15.5123 2.82148C15.2096 2.51875 14.8584 2.28262 14.4588 2.11309C14.0592 1.94355 13.6354 1.85879 13.1873 1.85879C13.1752 1.85879 13.1691 1.85879 13.1691 1.85879C12.709 1.85879 12.2791 1.94355 11.8795 2.11309C11.4799 2.28262 11.1348 2.51875 10.8441 2.82148H10.826L10.0449 3.60254C9.97227 3.6752 9.8875 3.73574 9.79063 3.78418C9.70586 3.82051 9.60898 3.83867 9.5 3.83867C9.39102 3.83867 9.28809 3.82051 9.19121 3.78418C9.10645 3.73574 9.02773 3.6752 8.95508 3.60254L8.17402 2.82148C7.87129 2.51875 7.52012 2.28262 7.12051 2.11309C6.7209 1.94355 6.29102 1.85879 5.83086 1.85879Z" fill="#6576FF" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Popup */}
        {cartVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-[20px] lg:p-[44px] rounded-[20px] shadow-lg w-3/4 max-w-[651px] min-h-[480px] overscroll-behavior overflow-x-auto">
              <h2 className="text-[22px] text-dark_blue font-bold">Your Cart</h2>
              <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th className="border-b border-gray text-s14 font-normal text-gray py-[16px] pr-[40px] lg:pr-[0] text-left">Item</th>
                    <th className="border-b border-gray text-s14 font-normal text-gray py-[16px] pr-[40px] lg:pr-[0] text-left">Color</th>
                    <th className="border-b border-gray text-s14 font-normal text-gray py-[16px] pr-[40px] lg:pr-[0] text-left">Size</th>
                    <th className="border-b border-gray text-s14 font-normal text-gray py-[16px] pr-[40px] lg:pr-[0] text-left">Qnt</th>
                    <th className="border-b border-gray text-s14 font-normal text-gray py-[16px] pr-[40px] lg:pr-[0] text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-gray py-[16px] pr-[40px] lg:pr-[0] flex gap-[8px] items-center">
                        <img src={item.image} alt="" className="w-[36px] h-[36px] rounded" />
                        <span className="text-dark_blue text-s14 font-normal capitalize text-nowrap">
                          {item.title}
                        </span>
                      </td>
                      <td className="border-b border-gray text-dark_blue text-s14 font-normal capitalize p-2 pr-[40px] lg:pr-[0]">{item.color}</td>
                      <td className="border-b border-gray py-[16px] pr-[40px] lg:pr-[0] text-dark_blue text-s14 font-bold capitalize">{item.size}</td>
                      <td className="border-b border-gray py-[16px] pr-[40px] lg:pr-[0] text-dark_blue text-s14 font-bold capitalize">{item.quantity}</td>
                      <td className="border-b border-gray py-[16px] pr-[40px] lg:pr-[0] text-dark_blue text-s14 font-bold capitalize">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mb-4">
                <span className="text-dark_blue font-bold text-s16">Total:</span>
                <span className="text-dark_blue font-bold text-[18px]">${calculateTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-4 items-center">
                <button
                  className="px-[15px] lg:px-[18px] py-[8px] border border-gray rounded text-dark_blue font-bold text-[10px] lg:text-[13px]"
                  onClick={() => setCartVisible(false)}
                >
                  Continue Shopping
                </button>
                <button className="px-[15px] lg:px-[18px] py-[8px] bg-blue text-white font-bold rounded text-[10px] lg:text-[13px]">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto pb-[20px]">
        <div className="checkout-btn flex justify-center">
          {/* Checkout Button */}
          <button type="button"
            className="px-[24px] py-[11px] text-center bg-yellow text-dark_blue rounded-[20px] font-bold flex gap-[10px] shadow-lg"
            onClick={() => setCartVisible(true)}
          >
            Checkout
            <span className="bg-white w-[19px] h-[20px] rounded-[5px] text-center inline-block text-s12 text-dark_blue leading-[20px]">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
