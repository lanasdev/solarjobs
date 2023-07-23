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

  return (
    <div className=" pt-16">
      <Link href="/" className="hover:underline">
        Go back home
      </Link>
      <div className="flex flex-col xl:flex-row xl:gap-16 justify-between py-16">
        <main className="">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <img
              src={c.logo}
              className="rounded-full bg-slate-200 group-hover:bg-slate-300 w-24 h-24 "
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
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mt-8 inline-block"
            >
              Edit Company Profile
            </Link>
          )}

          <div className="pt-12 ">
            <h2 className="text-xl font-semibold">Jobs</h2>
            <div className="flex overflow-x-auto space-x-8 pt-8 [&>*]:flex-shrink-0 ">
              {c.jobs.map((job: Job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>
          </div>

          <div className="py-16 max-w-xl">
            <pre>{JSON.stringify(c, null, 2)}</pre>
          </div>
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
