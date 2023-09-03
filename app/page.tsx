import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import { Job, Company } from "@/lib/types";
import JobCard from "./JobCard";
import CompanyCard from "./CompanyCard";
import Hero from "@/components/Hero";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase.from("jobs").select("*");
  const { data: company, error: errcompany } = await supabase
    .from("company")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="">
      <Hero />

      <div className=" container mx-auto flex max-w-4xl flex-col gap-14 px-3 py-16 text-foreground opacity-0 animate-in lg:py-24">
        <div className="w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />

        <h2 className="text-2xl font-bold">Solar Jobs</h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {jobs && jobs.map((job) => <JobCard key={job.id} {...job} />)}
        </div>

        <div className="w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />

        <div className="flex">
          <h2 className="text-2xl font-bold">Companies</h2>
          <Link
            href="/company/new"
            className="ml-auto rounded-md bg-btn-background px-4 py-2 no-underline transition-colors hover:bg-btn-background-hover"
          >
            Add Company
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
