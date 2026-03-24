export default function ContactPage() {
  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen px-6 py-16">

      <div className="max-w-[600px] mx-auto">

        <h1 className="text-4xl font-black mb-8">
          Contacto
        </h1>

        <p className="text-gray-400 mb-8">
          ¿Tienes alguna duda o necesitas ayuda con tu pedido? Escríbenos y te responderemos lo antes posible.
        </p>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 rounded-lg bg-[#1A1A22] border border-gray-700 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-[#1A1A22] border border-gray-700 focus:outline-none"
          />

          {/* 🆕 NUMERO DE PEDIDO */}
          <input
            type="text"
            placeholder="Número de pedido (opcional)"
            className="w-full p-3 rounded-lg bg-[#1A1A22] border border-gray-700 focus:outline-none"
          />

          <textarea
            placeholder="Mensaje"
            rows="5"
            className="w-full p-3 rounded-lg bg-[#1A1A22] border border-gray-700 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-500 transition"
          >
            Enviar mensaje
          </button>

        </form>

      </div>

    </div>
  )
}