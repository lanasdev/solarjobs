import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

import { Job } from "@/lib/types";
import JobCard from "./JobCard";
import CompanyCard from "./CompanyCard";
import Hero from "./Hero";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase.from("jobs").select("*");
  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("*");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <Hero />

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <h2 className="text-2xl font-bold">Solar Jobs</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {jobs && jobs.map((job) => <JobCard key={job.id} {...job} />)}
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex">
          <h2 className="text-2xl font-bold">Companies</h2>
          <Link
            href="/company/new"
            className="ml-auto py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover transition-colors"
          >
            Add Company
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {company ? (
            company.map((c) => <CompanyCard key={c.id} {...c} />)
          ) : (
            <div>Loading...</div>
          )}
        </div>

        {/* <pre>{JSON.stringify(company, null, 2)}</pre> */}
      </div>
    </div>
  );
}
