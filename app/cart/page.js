"use client";
import { useEffect, useState } from "react";

export default function Cart() {
    const [item, setItem] = useState(null);

    // 📦 Cargar carrito (solo 1 item)
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setItem(storedCart[0] || null);
        window.dispatchEvent(new Event("cartUpdated"));
    }, []);

    // ❌ Eliminar producto
    const removeItem = () => {
        localStorage.removeItem("cart");
        setItem(null);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // 💰 Total
    const total = item ? item.price + item.shipping : 0;

    return (
        <div className="bg-[#0B0B0F] text-white min-h-screen py-20">

            <div className="max-w-[1000px] mx-auto px-6">

                <h1 className="text-4xl font-black mb-10">
                    Tu carrito
                </h1>

                {!item ? (
                    <div className="text-center text-gray-400">
                        <p className="mb-6">Tu carrito está vacío</p>

                        <a
                            href="/custom"
                            className="inline-block px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
                        >
                            Crear tu tapete
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* 🧾 ITEM ÚNICO */}
                        <div className="flex gap-6 bg-[#1A1A22] p-4 rounded-xl items-center">

                            {/* IMAGEN */}
                            <img
                                src={item.image}
                                className="w-40 rounded-lg"
                            />

                            {/* INFO */}
                            <div className="flex-1">

                                <p className="font-bold text-lg">
                                    Tapete personalizado
                                </p>

                                <p className="text-gray-400 text-sm">
                                    Precio: {item.price}€
                                </p>

                                <p className="text-gray-400 text-sm">
                                    Envío: {item.shipping}€
                                </p>

                            </div>

                            {/* ELIMINAR */}
                            <button
                                onClick={removeItem}
                                className="text-red-400 hover:text-red-300 transition"
                            >
                                Eliminar
                            </button>

                        </div>

                        {/* 💰 TOTAL */}
                        <div className="border-t border-gray-700 pt-6 flex justify-between items-center">

                            <p className="text-xl font-bold">
                                Total: {total}€
                            </p>

                            <a
                                href="/checkout"
                                className="px-8 py-4 rounded-xl font-bold 
                                bg-gradient-to-r from-green-600 to-green-500
                                hover:opacity-90 transition"
                            >
                                Proceder al pago
                            </a>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}