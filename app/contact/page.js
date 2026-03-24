"use client"

import { useState } from "react"

export default function ContactPage() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    orderCode: "",
    message: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      alert("Mensaje enviado correctamente ✅")
      setForm({
        name: "",
        email: "",
        orderCode: "",
        message: ""
      })
    } else {
      alert("Error al enviar mensaje ❌")
    }
  }

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen px-6 py-16">
      
      <div className="max-w-[600px] mx-auto">

        <h1 className="text-4xl font-black mb-8">
          Contacto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-3 rounded-lg bg-[#1A1A22]"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-[#1A1A22]"
          />

          <input
            name="orderCode"
            value={form.orderCode}
            onChange={handleChange}
            placeholder="Número de pedido (opcional)"
            className="w-full p-3 rounded-lg bg-[#1A1A22]"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Mensaje"
            rows="5"
            className="w-full p-3 rounded-lg bg-[#1A1A22]"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 rounded-lg"
          >
            Enviar mensaje
          </button>

        </form>

      </div>

    </div>
  )
}