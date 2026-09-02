import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: {
    default: "CyanMart — Modern Glassmorphic E-Commerce Store",
    template: "%s | CyanMart",
  },
  description:
    "Explore top-quality products with a futuristic UI, fast delivery, and seamless shopping experience.",
  keywords: [
    "e-commerce",
    "nextjs",
    "online shop",
    "electronics",
    "groceries",
    "cyanmart",
  ],
  authors: [{ name: "David" }],
  openGraph: {
    title: "CyanMart — Modern E-Commerce Experience",
    description:
      "Discover exclusive deals on tech, fashion, and home accessories in a sleek glassmorphism interface.",
    url: "https://cyanmart.vercel.app", // Loyihangiz domenini qo'yasiz
    siteName: "CyanMart",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyanMart Store",
    description:
      "Next-gen shopping platform powered by Next.js and Tailwind CSS.",
  },
};
export default async function Home({ searchParams }) {
  const params = await searchParams;
  const currentCategory = params?.category;
  const categoryUrl = "https://dummyjson.com/products/categories";
  const productUrl = currentCategory
    ? `https://dummyjson.com/products/category/${currentCategory}`
    : "https://dummyjson.com/products";

  const [catRes, prodRes] = await Promise.all([
    fetch(categoryUrl),
    fetch(productUrl, { cache: "no-store" }),
  ]);

  const categories = await catRes.json();
  const productsData = await prodRes.json();
  const products = productsData.products || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center pt-24 px-4 pb-12">
      <Navbar />

      <main className="max-w-7xl w-full space-y-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/"
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap border ${
              !currentCategory
                ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-lg shadow-cyan-500/20"
                : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20"
            }`}
          >
            All Products
          </Link>

          {categories.map((cat) => {
            const categorySlug = typeof cat === "object" ? cat.slug : cat;
            const categoryName = typeof cat === "object" ? cat.name : cat;
            const isActive = currentCategory === categorySlug;

            return (
              <Link
                key={categorySlug}
                href={`/?category=${categorySlug}`}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm capitalize transition-all duration-300 whitespace-nowrap border ${
                  isActive
                    ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-lg shadow-cyan-500/20"
                    : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20"
                }`}
              >
                {categoryName}
              </Link>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </main>
    </div>
  );
}
