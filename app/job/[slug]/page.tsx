import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

import { Job, Company } from "@/lib/types";
import ExpandableText from "@/components/ExpandableText";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


interface JobDataProps {
  Job: Job & {
    company_slug: Company;
  };
}

// export async function generateStaticParams() {
//   const supabase = createServerComponentClient({ cookies });
//   const { data: jobs, error } = await supabase.from("jobs").select("*");
//   console.log("jobs", jobs);

//   if (error) return [];

//   const slugs = jobs.map((job) => job.slug);
//   console.log("slugs", slugs);
//   // return [{ id: "1" }, { id: "2" }, { id: "3" }];
//   return slugs;
// }

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
    .select(
      `
    *,
    company_slug (
      slug,
      name,
      description,
      logo,
      city_name,
      content,
      website,
      user_id
    )
    `,
    )
    .eq("slug", params.slug);

  // console.log("jobs", jobs);

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (!jobs) {
    return <div>Loading...</div>;
  }

  const job = jobs[0];
  const company: Company = job.company_slug;

  return (
    <div className=" pt-16">
      <Link href="/" className="hover:underline">
        Go back home
      </Link>
      <div className="flex flex-col justify-between py-16 xl:flex-row xl:gap-16">
        <main className="">
          <h1 className="text-2xl font-bold">
            <Balancer>{job.name}
          {job.company_slug.user_id === user?.id && (
            <Link className={cn(badgeVariants({ variant: job.is_active ? "success": "default" }), "ml-2")} href={""}>
            {job.is_active ? "Active" : "Inactive"}
          </Link>
          )}
          </Balancer>
          </h1>
          
          <p className="text-gray-500"><Balancer>{job.description}</Balancer></p>

          <div className="pt-16">
            <p className="prose whitespace-pre-line">{job.content}</p>
          </div>
          {/* <div className="py-16 max-w-xl">
            <code>{JSON.stringify(jobs, null, 2)}</code>
          </div> */}
          <div className=" py-8">
            <h2 className="text-xl font-bold">Apply for this job</h2>
            <p className="text-slate-500">
              You must be logged in to apply for this job.
            </p>
            <div className="pt-8">
              {user ? (
                <>
                  {job.hire_url ? (
                    <Link
                      href={job.hire_url}
                      className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                      Apply
                    </Link>
                  ) : (
                    <button className="inline-block rounded bg-gray-300 px-4 py-2 text-white">
                      No application link
                    </button>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Login
                </Link>
              )}

              {/* <div className="pt-8">
            <pre className="max-w-md">{JSON.stringify(user, null, 2)}</pre>
          </div> */}
            </div>
          </div>
        </main>
        <aside className="group rounded-lg bg-white px-4 py-6 shadow-lg md:w-1/3">
          {company?.logo ? (
            <img
              src={company.logo}
              alt={company.name || "Company logo"}
              className="mb-8 h-24 w-24 rounded-full hover:bg-slate-300 "
            />
          ) : (
            <span className="mb-8 h-24 w-24 rounded-full bg-slate-200 group-hover:bg-slate-300 " />
          )}
          <Link href={`/company/${company?.slug}`} className="">
            <h2 className="text-xl font-semibold ">{company.name}</h2>
          </Link>
          <span className="text-slate-500">
            {/* {`lat: ${job.lat}, long: ${job.long}`} */} {company.website} -{" "}
            {company.city_name}
          </span>

          {company.content && (
            <ExpandableText
              content={company.content}
              maxLines={6}
              classNames="text-slate-700 pt-16 "
            />
          )}
          <div className="flex flex-col gap-2 pt-8">
            <Link
              href={`/company/${company.slug}`}
              className=" hover:underline"
            >
              View company
            </Link>
            {company.website && (
              <Link href={company.website} className=" hover:underline">
                {company.website}
              </Link>
            )}
            {company.twitter && (
              <Link href={company.twitter} className=" hover:underline">
                Twitter
              </Link>
            )}
            {company.instagram && (
              <Link href={company.instagram} className=" hover:underline">
                Instagram
              </Link>
            )}
            {company.youtube && (
              <Link href={company.youtube} className=" hover:underline">
                YouTube
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
