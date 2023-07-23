import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewJobForm from "./new-job";

export default async function NewJobPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="pt-16">
        <h1 className="text-2xl font-bold">Create a new Job</h1>
        <div className="">
          <p>You must be logged in to create a new job.</p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    );
  }
  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("*")
    .match({ user_id: user.id || "" });

  const c = company;

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold">Create a new Job</h1>
      <div className="">
        {/* <code>{JSON.stringify(c, null, 2)}</code> */}
        {/* @ts-ignore */}
        <NewJobForm company={c} />
      </div>
    </div>
  );
}
