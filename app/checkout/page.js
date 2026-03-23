"use client";
import { useEffect, useState } from "react";
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [address, setAddress] = useState("")
  const [success, setSuccess] = useState(false);
  const [country, setCountry] = useState("España")
  const [address2, setAddress2] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [province, setProvince] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.price + item.shipping,
    0
  );

  const handleCheckout = async () => {
    try {
      // 🔐 EMAIL
      if (!email) {
        alert("Introduce tu email")
        return
      }

      if (!email.includes("@")) {
        alert("Introduce un email válido")
        return
      }

      // 👤 NOMBRE
      if (!name) {
        alert("Introduce tu nombre")
        return
      }

      if (!surname) {
        alert("Introduce tus apellidos")
        return
      }

      // 📦 DIRECCIÓN
      if (!address) {
        alert("Introduce la dirección")
        return
      }

      if (!postalCode) {
        alert("Introduce el código postal")
        return
      }

      if (!city) {
        alert("Introduce la ciudad")
        return
      }

      if (!province) {
        alert("Introduce la provincia")
        return
      }

      // 📞 TELÉFONO (opcional pero recomendado)
      if (!phone) {
        alert("Introduce un teléfono")
        return
      }

      // 🛒 comprobar carrito
      if (!cart || !cart[0]?.image) {
        alert("Error con la imagen")
        return
      }
      // 🧾 DEBUG: mostrar todos los datos antes de pagar
      alert(`
        📦 RESUMEN DEL PEDIDO

        Email: ${email}
        Nombre: ${name} ${surname}
        Teléfono: ${phone}

        Dirección:
        ${address}
        ${address2 || ""}
        ${postalCode}, ${city}
        ${province}, ${country}

        Imagen: ${cart[0]?.image ? "OK" : "ERROR"}
        Total: ${total}€
        `)
      // 🚀 1. SUBIR IMAGEN
      const imageUrl = cart[0].image
      // Si quieres subir la imagen al servidor, hazlo aquí. Por simplicidad, usaremos la URL directamente.


      // 🧾 2. CREAR PEDIDO (NUEVO)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          surname,
          address,
          address2,
          postalCode,
          city,
          province,
          country,
          phone,
          image: imageUrl,
        }),
      })

      const data = await res.json()

      console.log("CHECKOUT RESPONSE:", data)

      if (!res.ok) {
        throw new Error(data.error || "Error en el pago")
      }

      if (!data.url) {
        console.error("NO URL:", data)
        alert("Error creando sesión de pago")
        return
      }

      window.location.href = data.url




    } catch (err) {
      console.error("❌ ERROR:", err)
      alert(err.message)
    }
  }

  if (success) {
    return (
      <div className="bg-[#0B0B0F] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">

          <h1 className="text-4xl font-black mb-6">
            ✅ Pedido recibido
          </h1>

          <p className="text-gray-400 mb-6">
            Te contactaremos en breve en {email}
          </p>

          <a
            href="/"
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
          >
            Volver al inicio
          </a>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen py-20">

      <div className="max-w-[800px] mx-auto px-6">

        <h1 className="text-4xl font-black mb-10">
          Pago
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">No hay productos en el carrito</p>
        ) : (
          <div className="space-y-8">

            {/* RESUMEN */}
            <div className="bg-[#1A1A22] p-6 rounded-xl space-y-4">

              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">

                  <img
                    src={item.image}
                    className="w-24 rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">Tapete personalizado</p>
                    <p className="text-gray-400 text-sm">
                      {item.price}€ + {item.shipping}€ envío
                    </p>
                  </div>

                </div>
              ))}

              <div className="border-t border-gray-700 pt-4 flex justify-between">
                <span>Total</span>
                <span className="font-bold">{total}€</span>
              </div>

            </div>

            {/* FORM */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1A1A22] outline-none"
              />
              <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="País / Región" className="w-full p-3 rounded-lg bg-[#1A1A22] outline-none" />

              <div className="flex gap-4">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="w-1/2 p-3 rounded-lg bg-[#1A1A22] outline-none" />
                <input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Apellidos" className="w-1/2 p-3 rounded-lg bg-[#1A1A22] outline-none" />
              </div>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" className="w-full p-3 rounded-lg bg-[#1A1A22] outline-none" />
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Casa, apartamento, etc. (opcional)" className="w-full p-3 rounded-lg bg-[#1A1A22] outline-none" />
              <div className="flex gap-4">
                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Código postal" className="w-1/3 p-3 rounded-lg bg-[#1A1A22] outline-none" />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="w-1/3 p-3 rounded-lg bg-[#1A1A22] outline-none" />
                <input value={province} onChange={(e) => setProvince(e.target.value)} placeholder="Provincia" className="w-1/3 p-3 rounded-lg bg-[#1A1A22] outline-none" />
              </div>

              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" className="w-full p-3 rounded-lg bg-[#1A1A22] outline-none" />
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-bold 
                bg-gradient-to-r from-green-600 to-green-500
                hover:opacity-90 transition"
              >
                Pagar {total}€
              </button>


            </div>

          </div>
        )}

      </div>

    </div>
  );
}