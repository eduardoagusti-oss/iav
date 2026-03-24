import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export async function POST(req) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json({ error: "No image" }, { status: 400 })
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "tapetes",
    })

    return Response.json({ url: result.secure_url })

  } catch (err) {
    console.error(err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}