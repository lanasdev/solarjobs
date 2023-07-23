import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditCompany from "./edit-company";

export default async function CompanyEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: company, error } = await supabase
    .from("company")
    .select(
      `
      *, 
    jobs (
      slug,
      name,
        description
    )
  `
    )
    .eq("slug", params.slug);

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (!company) {
    return <div>Loading...</div>;
  }
  const c = company[0];

  if (!user) {
    redirect("/login");
  }
  if (user?.id !== c.user_id) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 pt-16">
      <h1 className="text-2xl font-bold">Edit the company</h1>
      <EditCompany company={c} />
    </div>
  );
}
