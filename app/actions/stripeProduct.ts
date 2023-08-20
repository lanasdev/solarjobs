"use server";

import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { formatAmountForStripe } from "@/lib/stripe-helpers";
import stripe from "@/lib/stripe";

const CURRENCY = "eur";

export async function createCheckoutSessionProduct(
  data: FormData,
): Promise<void> {
  const premiumSupport = data.get("premiumSupport") === "on";
  const highlighted = data.get("highlighted") === "on";

  const line_items = [
    {
      price: "price_1Nh8f8HAtYClIl6Eo72rfSjG",
      quantity: 1,
    },
    premiumSupport && {
      price: "price_1Nh8epHAtYClIl6EhgcH4jgz",
      quantity: 1,
    },
    highlighted && {
      price: "price_1Nh8iVHAtYClIl6ER5YEManq",
      quantity: 1,
    },
  ];

  const line = line_items.filter(Boolean);

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      // line_items: [
      //   {
      //     quantity: 1,
      //     price_data: {
      //       currency: CURRENCY,
      //       product_data: {
      //         name: "Custom amount donation",
      //       },
      //       unit_amount: formatAmountForStripe(
      //         Number(data.get("customDonation") as string),
      //         CURRENCY
      //       ),
      //     },
      //   },
      // ],
      // @ts-ignore
      line_items: line,
      // line_items: [
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: "price_1Nh8f8HAtYClIl6Eo72rfSjG",
      //     quantity: 1,
      //   },
      //   {
      //     price: "price_1Nh8epHAtYClIl6EhgcH4jgz",
      //     quantity: 1,
      //   },
      //   {
      //     price: "price_1Nh8iVHAtYClIl6ER5YEManq",
      //     quantity: 1,
      //   },
      // ],
      success_url: `${headers().get(
        "origin",
      )}/stripe/product/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get(
        "origin",
      )}/stripe/product?session_id={CHECKOUT_SESSION_ID}`,
    });

  redirect(checkoutSession.url as string);
}

export async function createPaymentIntentProduct(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
