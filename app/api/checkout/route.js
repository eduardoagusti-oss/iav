import Stripe from "stripe"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
console.log("🌍 BASE URL:", baseUrl)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const generateOrderCode = () => {
  return "IAV-" + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req) {
  const orderCode = generateOrderCode()
  try {
    const body = await req.json()

    console.log("📦 BODY:", body)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Tapete personalizado",
            },
            unit_amount: 2000, // 20€
          },
          quantity: 1,
        },
      ],

      

      success_url: `${baseUrl}/success2?code=${orderCode}`,
      cancel_url: `${baseUrl}/checkout`,

      metadata: {
        orderCode,
        email: body.email || "",
        name: body.name || "",
        surname: body.surname || "",
        address: body.address || "",
        address2: body.address2 || "",
        postalCode: body.postalCode || "",
        city: body.city || "",
        province: body.province || "",
        country: body.country || "",
        phone: body.phone || "",
       image: body.image || "",
      }
    })

    console.log("✅ SESSION URL:", session.url)

    return Response.json({
      url: session.url,
    })

  } catch (err) {
    console.error("❌ CHECKOUT ERROR:", err)


    return Response.json(
      { error: err.message || "Stripe error" },
      { status: 500 }
    )

  }
}
