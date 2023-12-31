import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import { Job } from "@/lib/types";
import ProductGridItems from "@/app/JobCard";
import JobCard from "@/app/JobCard";
import { notFound } from "next/navigation";
import MainSearchBar from "@/components/MainSearchBar";
// import { defaultSort, sorting } from 'lib/constants';

export const runtime = "edge";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select()
    .textSearch("name", searchValue)
    .textSearch("description", searchValue)
    .textSearch("content", searchValue)
    .order("created_at", { ascending: false });

  //   console.log(jobs);
  const { data: allJobs, error: errallJobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error(error);
  }
  if (!jobs) notFound();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const resultsText = jobs.length > 1 ? "results" : "result";

  return (
    <>
      <div className="bg-background text-foreground">
        <h1 className="mb-2 pb-8 text-2xl font-bold ">Search Page</h1>
        <MainSearchBar />
        {searchValue ? (
          <p>
            {jobs.length === 0
              ? "There are no products that match "
              : `Showing ${jobs.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : null}
        <hr className="my-8" />
        {jobs.length > 0 ? (
          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: Job) => (
              <JobCard key={job.slug} {...job} />
            ))}
          </div>
        ) : (
          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {allJobs?.map((job: Job) => <JobCard key={job.slug} {...job} />)}
          </div>
        )}
        {/* <div className="py-16">
          <pre>{JSON.stringify(jobs, null, 2)}</pre>
        </div> */}
      </div>
    </>
  );
}
