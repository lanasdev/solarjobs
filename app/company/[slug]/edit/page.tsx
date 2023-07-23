import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function CompanyCard({ slug, name, logo }: Company) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("*");

  return (
    <Link
      href={`/company/${slug}`}
      className="flex flex-col items-center justify-center p-4 bg-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
    >
      <div className="relative w-24 h-24">
        {logo ? (
          <Image
            src={logo}
            alt={name || "Company Logo"}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-foreground/20 rounded-lg" />
        )}
      </div>
      <h3 className="text-xl font-bold">{name}</h3>
    </Link>
  );
}
