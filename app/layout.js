import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "./components/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IAV - Personaliza tu tapete de juego",
  description: "Marketplace de tapetes personalizados para juegos de cartas. Diseña el tuyo o descubre arte exclusivo de artistas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-[#0B0B0F] text-white`}>

        {/* HEADER */}
        <Header />
        {children}
        <footer className="bg-[#0B0B0F]">

          <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* LOGO + DESC */}
            <div>
              <img src="/IAVLogo.svg" className="h-8 mb-4" />
              <p className="text-gray-400 text-sm">
                Marketplace de tapetes personalizados para juegos de cartas.
                Diseña el tuyo o descubre arte exclusivo de artistas.
              </p>
            </div>

            {/* EMPRESA */}
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className="hover:text-white">Sobre nosotros</a></li>
                <li><a className="hover:text-white">Artistas</a></li>
                <li><a className="hover:text-white">Contacto</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className="hover:text-white">Términos y condiciones</a></li>
                <li><a className="hover:text-white">Política de privacidad</a></li>
                <li><a className="hover:text-white">Política de cookies</a></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Recibe novedades y nuevos diseños
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-3 py-2 rounded-l-lg bg-[#1A1A22] text-white text-sm outline-none"
                />
                <button className="bg-purple-600 px-4 rounded-r-lg hover:bg-purple-500 transition">
                  OK
                </button>
              </div>
            </div>

          </div>

          {/* BOTTOM */}
          <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} IAV. Todos los derechos reservados.
          </div>

        </footer>
      </body>

    </html>
  );
}
