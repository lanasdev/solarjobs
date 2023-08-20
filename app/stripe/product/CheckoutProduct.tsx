"use client";

import React, { useEffect, useState } from "react";

import { formatAmountForDisplay } from "@/lib/stripe-helpers";
// import * as config from "@/config";
import { createCheckoutSessionProduct } from "@/app/actions/stripeProduct";
import { cn } from "@/lib/utils";

export default function CheckoutProduct(): JSX.Element {
  const [loading] = useState<boolean>(false);

  const basePrice = 250;
  const premiumSupportPrice = 80;
  const highlightedPrice = 49;
  const [premiumSupport, setPremiumSupport] = useState<boolean>(false);
  const [highlighted, setHighlighted] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(basePrice);

  // useEffect(() => {
  //   if (premiumSupport) setTotalPrice(totalPrice + premiumSupportPrice);
  //   if (!premiumSupport) setTotalPrice(totalPrice - premiumSupportPrice);

  //   if (highlighted) setTotalPrice(totalPrice + highlightedPrice);
  //   if (!highlighted) setTotalPrice(totalPrice - highlightedPrice);
  // }, [premiumSupport, highlighted]);

  // const price = 100;
  // const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = (
  //   e
  // ): void =>
  //   setTotalPrice({
  //     ...totalPrice,
  //     [e.currentTarget.name]: e.currentTarget.value,
  //   });

  // const handlePriceChange = () =>

  return (
    <form action={createCheckoutSessionProduct} className="flex flex-col gap-8">
      <div className="gap-4">
        <input
          id="premiumSupport"
          name="premiumSupport"
          type="checkbox"
          defaultChecked
          // onChange={(e) => setPremiumSupport(!premiumSupport)}
          // onChange={(e) => setPremiumSupport(e.target.value ? false : true)}
        />
        <label htmlFor="premiumSupport">{`Premium Support (89€)`}</label>
      </div>
      <div className="gap-4">
        <input
          id="highlighted"
          name="highlighted"
          type="checkbox"
          defaultChecked
          // onChange={(e) => setHighlighted(e.target.value ? false : true)}
        />

        <label htmlFor="highlighted">{`Highlighted (49€)`}</label>
      </div>
      <button
        className={cn(
          "rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700",
          loading && "cursor-not-allowed bg-gray-500",
        )}
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Loading…"
          : `Buy for ${formatAmountForDisplay(totalPrice, "eur")}`}
      </button>
    </form>
  );
}
