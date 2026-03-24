import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // 🎯 EVENTO CLAVE
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      console.log("💰 PAGO COMPLETADO")

      // 📦 datos del cliente
      const {
        email,
        name,
        surname,
        address,
        postalCode,
        city,
        province,
        image,
      } = session.metadata

      console.log("📦 PEDIDO:", session.metadata)

      // 👉 aquí puedes:
      // - generar PDF
      // - enviar email (Resend)
      // - guardar pedido
      const data = session.metadata
      const orderCode = data.orderCode
      console.log("📦 DATA:", data)
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "iavcustomgaming@gmail.com",
        subject: `${orderCode} - Nuevo pedido pagado 💰`,
        html: `
        <h1>Nuevo pedido</h1>
        <p><strong>Código:</strong> ${orderCode}</p>
        <p><strong>Email cliente:</strong> ${data.email}</p>
        <p><strong>Nombre:</strong> ${data.name} ${data.surname}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Dirección:</strong><br/>
        ${data.address}<br/>
        ${data.postalCode}, ${data.city}<br/>
        ${data.province}, ${data.country}
        </p>
        <p><strong>Diseño:</strong></p>
        <img src="${data.image}" width="400" />
        `,
      })
      await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "iavcustomgaming@gmail.com",
  subject: `${orderCode} - Nuevo pedido recibido 💰`,
  html: `
    <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px; margin: auto;">

      <!-- LOGO -->
      <div style="text-align:center; margin-bottom: 30px;">
        <img src="https://res.cloudinary.com/dsnxlhgj5/image/upload/v1774363311/IAVLogo_kea3wn.png" style="width:140px;" />
      </div>

      <h1 style="color:#4C1D95; text-align:center;">
        Nuevo pedido recibido 🚀
      </h1>

      <p style="text-align:center; margin-bottom:20px;">
        <strong>Código:</strong> ${orderCode}
      </p>

      <hr/>

      <h3>Datos del cliente</h3>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Nombre:</strong> ${data.name} ${data.surname}</p>
      <p><strong>Teléfono:</strong> ${data.phone}</p>

      <h3>Dirección</h3>
      <p>
        ${data.address}<br/>
        ${data.postalCode}, ${data.city}<br/>
        ${data.province}, ${data.country}
      </p>

      <h3>Diseño del tapete</h3>
      <div style="text-align:center;">
        <img src="${data.image}" style="width:100%; max-width:400px; border-radius:8px;" />
      </div>

      <hr style="margin: 30px 0;" />

      <!-- Firma -->
      <p>
        Un saludo,<br/>
        <strong>Equipo IAV Custom Gaming</strong>
      </p>

      <!-- Footer -->
      <div style="margin-top: 30px; font-size: 12px; color: #666; text-align:center;">
        <p>
          Este es un correo automático generado por IAV Custom Gaming.
        </p>

        <p>
          © ${new Date().getFullYear()} IAV Custom Gaming — Todos los derechos reservados
        </p>
      </div>

    </div>
  `,
})

    }

    return Response.json({ received: true })

  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err)
    return Response.json({ error: err.message }, { status: 400 })
  }
}