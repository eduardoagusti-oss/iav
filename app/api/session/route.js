import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const session_id = searchParams.get("session_id")

    if (!session_id) {
      return Response.json({ error: "No session_id" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(session_id)

    return Response.json({
      image: session.metadata.image,
      code: session.metadata.orderCode,
    })

  } catch (err) {
    console.error("❌ SESSION ERROR:", err)

    return Response.json(
      { error: err.message },
      { status: 500 }
    )
  }
}