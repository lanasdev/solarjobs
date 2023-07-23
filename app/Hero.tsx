import Link from "next/link";
import Balancer from "react-wrap-balancer";

import SupabaseLogo from "@/components/SupabaseLogo";
import NextJsLogo from "@/components/NextJsLogo";

export default function Hero() {
  return (
    <div className="flex flex-col items-center mb-4 lg:mb-12">
      <div className="flex gap-8 justify-center items-center">
        <Link href="https://supabase.com/" target="_blank">
          <SupabaseLogo />
        </Link>
        <span className="border-l rotate-45 h-6" />
        <NextJsLogo />
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
        <Balancer>
          The fastest way to get hired in the <strong>solar industry</strong>.
        </Balancer>
      </p>
      <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
        Get started by editing <strong>app/page.tsx</strong>
      </div>
    </div>
  );
}
