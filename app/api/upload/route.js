import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 })
    }

    // 🔥 convertir a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 🚀 subir a cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "tapetes",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return Response.json({ url: result.secure_url })

  } catch (err) {
    console.error("❌ UPLOAD ERROR:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}