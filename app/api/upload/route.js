import fs from "fs"
import path from "path"

export async function POST(req) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json({ error: "No image" }, { status: 400 })
    }

    // quitar header base64
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "")

    const buffer = Buffer.from(base64Data, "base64")

    const fileName = `image-${Date.now()}.png`
    const filePath = path.join(process.cwd(), "public/uploads", fileName)

    // asegurar carpeta
    fs.mkdirSync(path.dirname(filePath), { recursive: true })

    fs.writeFileSync(filePath, buffer)

    const url = `/uploads/${fileName}`

    return Response.json({ url })

  } catch (err) {
    console.error(err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}