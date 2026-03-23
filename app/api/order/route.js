import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const order = await prisma.order.create({
    data: {
      status: "pending",
      email: data.email,
      name: data.name,
      surname: data.surname,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      province: data.province,
      phone: data.phone,
      imageUrl: data.image,
      price: data.price,
    },
  });

  return NextResponse.json({ orderId: order.id });
}