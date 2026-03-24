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
    <div style="background:#0B0B0F; padding:40px 20px; font-family: Arial, sans-serif;">

      <!-- CARD -->
      <div style="max-width:600px; margin:auto; background:#111118; border-radius:16px; padding:30px; border:1px solid #1f1f2a;">

        <!-- LOGO -->
        <div style="text-align:center; margin-bottom:25px;">
          <img src="https://res.cloudinary.com/dsnxlhgj5/image/upload/v1774363311/IAVLogo_kea3wn.png" style="width:120px;" />
        </div>

        <!-- TITLE -->
        <h1 style="color:#ffffff; text-align:center; font-size:24px; margin-bottom:10px;">
          Nuevo pedido recibido
        </h1>

        <p style="text-align:center; color:#a1a1aa; margin-bottom:20px;">
          Código: <strong style="color:#A78BFA;">${orderCode}</strong>
        </p>

        <!-- DIVIDER -->
        <div style="height:1px; background:#1f1f2a; margin:20px 0;"></div>

        <!-- CLIENT INFO -->
        <h3 style="color:#A78BFA; margin-bottom:10px;">Cliente</h3>

        <p style="color:#e4e4e7; margin:4px 0;">
          ${data.name} ${data.surname}
        </p>
        <p style="color:#a1a1aa; margin:4px 0;">
          ${data.email}
        </p>
        <p style="color:#a1a1aa; margin:4px 0;">
          ${data.phone}
        </p>

        <!-- ADDRESS -->
        <h3 style="color:#A78BFA; margin-top:20px;">Envío</h3>

        <p style="color:#e4e4e7; line-height:1.5;">
          ${data.address}<br/>
          ${data.postalCode}, ${data.city}<br/>
          ${data.province}, ${data.country}
        </p>

        <!-- IMAGE -->
        <h3 style="color:#A78BFA; margin-top:20px;">Diseño</h3>

        <div style="text-align:center; margin-top:10px;">
          <img src="${data.image}" style="width:100%; max-width:420px; border-radius:12px; border:1px solid #1f1f2a;" />
        </div>

        <!-- DIVIDER -->
        <div style="height:1px; background:#1f1f2a; margin:30px 0;"></div>

        <!-- SIGNATURE -->
        <p style="color:#e4e4e7;">
          Un saludo,<br/>
          <strong>IAV Custom Gaming</strong>
        </p>

      </div>

      <!-- FOOTER -->
      <div style="text-align:center; margin-top:20px; font-size:12px; color:#6b7280;">
        © ${new Date().getFullYear()} IAV Custom Gaming  
        <br/>
        Este es un correo automático
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