import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.json()

    const { name, email, orderCode, message } = body

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "iavcustomgaming@gmail.com",
      subject: `Nuevo mensaje de contacto`,
      html: `
        <h2>Nuevo mensaje desde la web</h2>

        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pedido:</strong> ${orderCode || "No especificado"}</p>

        <hr/>

        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({ success: true })

  } catch (err) {
    console.error("❌ CONTACT ERROR:", err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}