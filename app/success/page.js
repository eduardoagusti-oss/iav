"use client"
export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function Success() {
const params = useSearchParams()
const code = params.get("code")

const [image, setImage] = useState(null)

useEffect(() => {
const cart = JSON.parse(localStorage.getItem("cart")) || []

// 🖼️ guardar imagen antes de limpiar
if (cart[0]?.image) {
  setImage(cart[0].image)
}

// 🧹 limpiar carrito correctamente
localStorage.setItem("cart", JSON.stringify([]))

// 🔄 actualizar header (contador carrito)
window.dispatchEvent(new Event("cartUpdated"))


}, [])

return ( <div className="bg-[#0B0B0F] text-white min-h-screen flex items-center justify-center px-6">


  <div className="max-w-[600px] w-full text-center space-y-8">

    {/* ✅ ICONO */}
    <div className="text-5xl">✅</div>

    {/* 🧾 TITULO */}
    <h1 className="text-4xl font-black">
      Pedido confirmado
    </h1>

    {/* 🔑 CODIGO PEDIDO */}
    {code && (
      <div className="bg-[#1A1A22] p-4 rounded-xl">
        <p className="text-gray-400 text-sm">
          Código de pedido
        </p>
        <p className="text-2xl font-bold tracking-widest">
          {code}
        </p>
      </div>
    )}

    {/* 🖼️ IMAGEN DEL PRODUCTO */}
    {image && (
      <div className="bg-[#1A1A22] p-4 rounded-xl">
        <img
          src={image}
          alt="Producto"
          className="rounded-lg mx-auto max-h-[300px]"
        />
      </div>
    )}

    {/* 📩 TEXTO */}
    <p className="text-gray-400 leading-relaxed">
      Hemos recibido tu pedido correctamente.  
      Te enviaremos un email con todos los detalles.
    </p>

    {/* 🔙 BOTON */}
    <a
      href="/"
      className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition font-semibold"
    >
      Volver al inicio
    </a>

  </div>

</div>

)
}
