"use client";
import { CartContext } from "@/context/CartContext";
import React, { useState, useContext } from "react";

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const { addToCart } = useContext(CartContext);
  return (
    <div className="group relative w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 text-white shadow-xl hover:shadow-2xl hover:border-white/40 transition-all duration-300 flex flex-col justify-between">
      <div className="relative w-full h-52 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
        <img
          src={product.images[0] || product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-rose-500/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-rose-400/30">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isLiked
                ? "fill-rose-500 stroke-rose-500"
                : "fill-none stroke-white"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span className="uppercase tracking-wider font-semibold text-cyan-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
            <span className="text-yellow-400">★</span>
            <span className="font-medium text-white">{product.rating}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">{product.brand}</p>
          <h3 className="text-lg font-semibold tracking-tight text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {product.title}
          </h3>
        </div>

        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="text-xs text-emerald-400 font-medium mt-1">
          ✓ {product.availabilityStatus} ({product.stock} left)
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-white">${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-md active:scale-95 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
