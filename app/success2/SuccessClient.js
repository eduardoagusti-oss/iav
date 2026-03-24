"use client"

import { useEffect, useState } from "react"

export default function SuccessClient() {

  const [image, setImage] = useState(null)
  const [code, setCode] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    console.log("🔥 COMPONENT MOUNTED")

    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get("session_id")

    console.log("SESSION ID:", sessionId)

    if (!sessionId) {
      console.error("❌ No session_id en la URL")
      return
    }

    fetch(`/api/session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        console.log("✅ DATA FROM API:", data)

        if (data.image) {
          setImage(data.image)
        }

        if (data.code) {
          setCode(data.code)
        }
      })
      .catch(err => {
        console.error("❌ FETCH ERROR:", err)
      })

  }, [])

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-[600px] w-full text-center space-y-8">

        <div className="text-5xl">✅</div>

        <h1 className="text-4xl font-black">
          Pedido confirmado
        </h1>

        {code && (
          <div className="bg-[#1A1A22] p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Código de pedido</p>
            <p className="text-2xl font-bold tracking-widest">{code}</p>
          </div>
        )}

        {image && (
          <div className="bg-[#1A1A22] p-4 rounded-xl">
            <img src={image} className="rounded-lg mx-auto max-h-[300px]" />
          </div>
        )}

        {!image && (
          <p className="text-gray-500">Cargando imagen...</p>
        )}

        <p className="text-gray-400">
          Te enviaremos un email con los detalles del pedido.
        </p>

        <a
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
        >
          Volver al inicio
        </a>

      </div>
    </div>
  )
}