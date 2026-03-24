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
          <p>Email: ${data.email}</p>
          <p>Nombre: ${data.name} ${data.surname}</p>
          <p>Dirección: ${data.address}</p>
          <p>Ciudad: ${data.city}</p>
          <p>Pedido: ${orderCode}</p>
  `,
      })
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: data.email, // 🔥 email del cliente
        subject: `${orderCode} - Tu Pedido IAV ha sido recibido ✅`,
        html: `
          <h1>Nuevo pedido</h1>
          <p>Email: ${data.email}</p>
          <p>Nombre: ${data.name} ${data.surname}</p>
          <p>Dirección: ${data.address}</p>
          <p>Ciudad: ${data.city}</p>
          <p>Pedido: ${orderCode}</p>
  `,
      })

    }

    return Response.json({ received: true })

  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err)
    return Response.json({ error: err.message }, { status: 400 })
  }
}