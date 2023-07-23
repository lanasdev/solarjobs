import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import NewCompany from "./new-company";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CompanyCard() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("*");

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold">Create a new Company</h1>
      <NewCompany />
    </div>
  );
}
