"use client";

import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  // Umumiy hisob-kitoblar
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4 pb-12">
      <Navbar cartCount={totalQuantity} />

      <main className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-cyan-400">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center space-y-4">
            <p className="text-gray-300 text-lg">Savatingiz hozircha bo'sh.</p>
            <Link
              href="/"
              className="inline-block bg-cyan-500 text-black font-bold px-6 py-2.5 rounded-xl hover:bg-cyan-400 transition-colors"
            >
              Xarid qilishni boshlash
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mahsulotlar ro'yxati */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="w-20 h-20 object-contain rounded-xl bg-black/20 p-2"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-white">
                        {item.title}
                      </h3>
                      <p className="text-cyan-400 font-bold">${item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Controller & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-cyan-400 text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="font-semibold px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center hover:text-cyan-400 text-lg font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-400 hover:text-rose-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Hisob-kitob paneli */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-fit space-y-6 shadow-xl">
              <h2 className="text-xl font-bold border-b border-white/10 pb-3">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span className="font-semibold text-white">
                    {totalQuantity} pcs
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400">${totalAmount}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-3 rounded-xl transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
