import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  //   const res = await fetch("https://data.mongodb-api.com/...", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // generate some fake data
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // const res = await fetch("https://data.mongodb-api.com/...", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Nh8f8HAtYClIl6Eo72rfSjG",
          quantity: 1,
        },
      ],
      mode: "payment",
      // @ts-ignore
      success_url: `${request.headers.origin}/?success=true`,
      // @ts-ignore
      cancel_url: `${request.headers.origin}/?canceled=true`,
    });
  } catch (err) {
    // @ts-ignore
    res.status(err.statusCode || 500).json(err.message);
  }
  // @ts-ignore
  const data = await res.json();

  return NextResponse.json(data);
}
