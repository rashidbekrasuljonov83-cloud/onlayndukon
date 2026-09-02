"use client";

import React, { useState } from "react";
import { Home, Grid, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 ">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between text-white transition-all duration-300">
        <div className="text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer">
          new products store
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="flex bg-gradient-to-r text-cyan-400 text-blue-500 bg-clip-text items-center gap-2 text-black hover:text-cyan-600 transition-colors duration-200"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link
            href="cart"
            className="relative bg-gradient-to-r text-cyan-400 text-blue-500 bg-clip-text flex items-center gap-2 text-black hover:text-cyan-600 transition-colors duration-200"
          >
            <ShoppingBag size={18} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-cyan-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white/40">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black hover:text-cyan-500 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 text-white shadow-xl animate-fadeIn">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Home size={20} />
            Home
          </Link>

          <Link
            href="cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} />
              <span>Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-cyan-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
