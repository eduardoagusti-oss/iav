"use client";
import { useState, useRef, useEffect } from "react";

export default function Custom() {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  const canvasRef = useRef(null);

  // 📥 Upload imagen
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setScale(1);
    }
  };

  // 🧠 Zoom
  const handleWheel = (e) => {
    e.preventDefault();

    setScale((prev) => {
      const newScale = prev - e.deltaY * 0.001;
      return Math.min(Math.max(newScale, 1.0), 3);
    });
  };

  // 🚫 Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isHovering ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isHovering]);

  // 🎨 Render preview
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const userImg = new Image();
    userImg.src = image;

    const overlayImg = new Image();
    overlayImg.src = "/6035.png";

    Promise.all([
      new Promise((res) => (userImg.onload = res)),
      new Promise((res) => (overlayImg.onload = res)),
    ]).then(() => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const imgRatio = userImg.width / userImg.height;
      const canvasRatio = width / height;

      let drawWidth, drawHeight;

      if (imgRatio > canvasRatio) {
        drawHeight = height * scale;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = width * scale;
        drawHeight = drawWidth / imgRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(userImg, x, y, drawWidth, drawHeight);
      ctx.drawImage(overlayImg, 0, 0, width, height);
    });
  }, [image, scale]);

  // 🛒 AÑADIR AL CARRITO (CON SUBIDA)
  const handleAddToCart = async () => {
    try {
      if (!image) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = 1200;
      const height = 700;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      const userImg = new Image();
      userImg.src = image;

      const overlayImg = new Image();
      overlayImg.src = "/6035.png";

      await Promise.all([
        new Promise((res) => (userImg.onload = res)),
        new Promise((res) => (overlayImg.onload = res)),
      ]);

      const imgRatio = userImg.width / userImg.height;
      const canvasRatio = width / height;

      let drawWidth, drawHeight;

      if (imgRatio > canvasRatio) {
        drawHeight = height * scale;
        drawWidth = drawHeight * imgRatio;
      } else {
        drawWidth = width * scale;
        drawHeight = drawWidth / imgRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(userImg, x, y, drawWidth, drawHeight);
      ctx.drawImage(overlayImg, 0, 0, width, height);

      const imageData = canvas.toDataURL("image/png");

      // 🚀 subir al servidor
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // 🛒 guardar en carrito
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({
        id: Date.now(),
        image: data.url,
        price: 20,
        shipping: 0,
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      window.location.href = "/cart";

    } catch (err) {
      console.error(err);
      alert("Error al añadir al carrito");
    }
  };

  return (
    <div className="bg-[#0B0B0F] text-white min-h-screen py-20">
      <div className="max-w-[900px] mx-auto px-6 text-center">

        <h1 className="text-4xl font-black mb-6">
          Configura tu tapete
        </h1>

        <p className="text-gray-400 mb-6">
          Recomendado: imagen en proporción 60:35
        </p>

        <label className="block border-2 border-dashed border-gray-600 rounded-xl p-10 mb-10 cursor-pointer hover:border-purple-500 transition">
          <p>Haz click o arrastra tu imagen</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {image && (
          <>
            <canvas
              ref={canvasRef}
              width={600}
              height={350}
              onWheel={handleWheel}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="w-[600px] aspect-[60/35] bg-black rounded-lg mx-auto"
            />

            <button
              onClick={handleAddToCart}
              className="mt-8 px-8 py-4 rounded-xl font-bold 
              bg-gradient-to-r from-[#4C1D95] to-[#6D28D9]
              border border-cyan-400
              hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]
              transition"
            >
              Añadir al carrito — 20€
            </button>
          </>
        )}

      </div>
    </div>
  );
}