import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import { Job } from "@/lib/types";

export default async function JobPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", params.slug);

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (!jobs) {
    return <div>Loading...</div>;
  }

  const job: Job = jobs[0];

  return (
    <div className=" pt-16">
      <Link href="/" className="hover:underline">
        Go back home
      </Link>
      <div className="flex flex-col xl:flex-row xl:gap-16 justify-between py-16">
        <main className=" pt-16">
          <h1 className="text-2xl font-bold">{job.name}</h1>
          <p className="text-gray-500">{job.description}</p>

          <div className="pt-16">
            <p className="prose ">{job.content}</p>
          </div>
          <div className="py-16 max-w-xl">
            <code>{JSON.stringify(jobs, null, 2)}</code>
          </div>
        </main>
        <aside className="xl:w-1/3 group bg-white shadow-lg rounded-lg px-4 py-6">
          <div className="rounded-full bg-slate-200 group-hover:bg-slate-300 w-24 h-24 mb-8 " />
          <h2 className="text-xl font-semibold">{job.company_name}</h2>
          <span className="text-gray-500">
            {`lat: ${job.lat}, long: ${job.long}`}
          </span>
        </aside>
      </div>
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold">Apply for this job</h2>
        <p className="text-gray-500">
          You must be logged in to apply for this job.
        </p>
        <div className="pt-8">
          {user ? (
            <button className="bg-blue-500 text-white rounded px-4 py-2">
              Apply
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Login
            </Link>
          )}

          <div className="pt-8">
            <pre className="max-w-md">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
