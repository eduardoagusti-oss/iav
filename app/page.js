import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[100vh] bg-gradient-to-r from-[#6D28D9] to-[#9333EA]">

        {/* IMAGEN PNG */}
        <img
          src="/tapete.png"
          className="absolute left-0 top-0 w-full h-full object-cover" />

        {/* CONTENIDO */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-[1200px] mx-auto w-full flex justify-end px-6">
            <div className="text-right max-w-md">
              <h2 className="text-5xl font-black mb-4 leading-tight">
                <span className="block whitespace-nowrap">PERSONALIZA</span>
                <span className="block whitespace-nowrap">
                  TU TAPETE
                </span>
              </h2>
              <p className="mb-6 text-gray-200">
                Sube tu diseño y nosotros lo hacemos realidad
              </p>

              <div className="flex gap-4 justify-end">
                <Link
                  href="/custom"
                  className="px-10 py-5 rounded-xl text-xl font-bold 
                    bg-gradient-to-r from-[#4C1D95] to-[#6D28D9]
                    border-2 border-cyan-400 
                    text-white 
                    hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] 
                    transition duration-300
                    whitespace-nowrap inline-block"
                >
                  IR AL CONFIGURADOR
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 
      
      <section className="bg-gray-100 text-black p-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <h3 className="text-center text-2xl font-bold mb-10">
            DESTACADO
          </h3>

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white rounded-xl overflow-hidden shadow group">


              <div className="aspect-square overflow-hidden">
                <img
                  src="/novedades.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4">
                <button className="
                  w-full 
                  py-3 
                  rounded-lg 
                  text-sm font-semibold 
                  bg-[#4C1D95] 
                  border border-cyan-400/40 
                  text-white 
                  hover:bg-[#6D28D9] 
                  transition duration-200
                  ">
                  NOVEDADES
                </button>
              </div>

            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow group">


              <div className="aspect-square overflow-hidden">
                <img
                  src="/vertienda.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>


              <div className="p-4">
                <button className="
                w-full 
                py-3 
                rounded-lg 
                text-sm font-semibold 
                bg-[#4C1D95] 
                border border-cyan-400/40 
                text-white 
                hover:bg-[#6D28D9] 
                transition duration-200
                ">
                  OFERTAS
                </button>
              </div>

            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow group">


              <div className="aspect-square overflow-hidden">
                <img
                  src="/tudiseño.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>


              <div className="p-4">
                <button className="
                  w-full 
                  py-3 
                  rounded-lg 
                  text-sm font-semibold 
                  bg-[#4C1D95] 
                  border border-cyan-400/40 
                  text-white 
                  hover:bg-[#6D28D9] 
                  transition duration-200
                  ">
                  TU DISEÑO
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>
      */}

    </div>

  );

}