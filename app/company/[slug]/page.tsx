import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import { Job } from "@/lib/types";
import JobCard from "@/app/JobCard";

export default async function JobPage({
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
  `,
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

  return (
    <div className=" pt-16">
      <Link href="/" className="hover:underline">
        Go back home
      </Link>
      <div className="flex flex-col justify-between py-16 xl:flex-row xl:gap-16">
        <main className="">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <img
              src={c.logo}
              className="h-24 w-24 rounded-full bg-slate-200 group-hover:bg-slate-300 "
            />
            <div className="">
              <h1 className="text-2xl font-bold">{c.name}</h1>
              <p className="text-gray-500">{c.description}</p>
            </div>
          </div>
          <p className="prose pt-16">{c.content}</p>

          {user?.id === c.user_id && (
            <Link
              href={`/company/${c.slug}/edit`}
              className="mt-8 inline-block rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
            >
              Edit Company Profile
            </Link>
          )}

          <div className="pt-12 ">
            <h2 className="text-xl font-semibold">Jobs</h2>
            <div className="flex space-x-8 overflow-x-auto pt-8 [&>*]:flex-shrink-0 ">
              {c.jobs.map((job: Job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>
          </div>

          {/* <div className="max-w-xl py-16">
            <pre>{JSON.stringify(c, null, 2)}</pre>
          </div> */}
        </main>
        {/* <aside className="xl:w-1/3 group bg-white shadow-lg rounded-lg px-4 py-6">
          <div className="rounded-full bg-slate-200 group-hover:bg-slate-300 w-24 h-24 mb-8 " />
          <h2 className="text-xl font-semibold">{c.company_name}</h2>
          <span className="text-gray-500">
            {`lat: ${c.lat}, long: ${c.long}`}
          </span>
        </aside> */}
      </div>
    </div>
  );
}
