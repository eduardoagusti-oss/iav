export async function GET() {
  return Response.json({
    key: process.env.RESEND_API_KEY || "NO_KEY",
  })
}
