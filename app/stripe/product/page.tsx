import type { Metadata } from "next";

import CheckoutProduct from "./CheckoutProduct";
import SectionContainer from "@/components/SectionContainer";

export const metadata: Metadata = {
  title: "Buy a Product | Next.js + TypeScript Example",
};

export default function ProductPage(): JSX.Element {
  return (
    <SectionContainer classNames="pt-16">
      <div className="page-container">
        <h1 className="text-3xl font-semibold">Buy a Product</h1>
        <p className="pb-8">and have fun with it 💖</p>
        <CheckoutProduct />
      </div>
    </SectionContainer>
  );
}
