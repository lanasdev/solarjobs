import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SectionContainer from "@/components/SectionContainer";
import CreateJobListing from "./CreateJobListing";

export default async function NewJobPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <SectionContainer>
        <div className="pt-16">
          <h1 className="text-2xl font-bold">Create a new Job</h1>
          <div className="">
            <p>You must be logged in to create a new job.</p>
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </SectionContainer>
    );
  }
  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("slug, name, description, website, user_id")
    .match({ user_id: user.id || "" })
    .order("name", { ascending: true });

  const c = company;

  return (
    <SectionContainer>
      <div className="pt-16">
        <h1 className="text-2xl font-bold">Create a job listing</h1>
        <div className="">
          {!c ? (
            <p>There was an error loading the form. Please try again.</p>
          ) : (
            <CreateJobListing company={c} />
          )}
          {/* <code className="block pt-64">{JSON.stringify(c, null, 2)}</code> */}
        </div>
      </div>
    </SectionContainer>
  );
}
