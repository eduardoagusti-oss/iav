"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [count, setCount] = useState(0);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCount(cart.length);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  return (
    <header className="bg-[#0B0B0F] border-b border-gray-800">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">

        <a href="/">
          <img src="/IAVLogo.svg" className="h-8" />
        </a>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">

          <a className="hover:text-white transition cursor-pointer">
            Contacto
          </a>

          <a href="/cart" className="hover:text-white transition">
            Carrito ({count})
          </a>

          <button className="
            px-4 py-2 
            rounded-lg 
            border border-white/20 
            text-gray-300
            hover:text-white
            hover:border-white/40 
            hover:bg-white/5 
            transition
          ">
            Log in
          </button>

        </div>

      </div>
    </header>
  );
}