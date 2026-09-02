"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import React from "react";

export default function home() {
  let res = await fetch("https://dummyjson.com/products");
const products = await res.json();
  return (
    <div>
      <Navbar  />
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.products.map((prod) => {
          return <ProductCard key={prod.id} product={prod} />;
        })}
        </div>
    </div>
  );
}
