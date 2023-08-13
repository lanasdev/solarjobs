import Link from "next/link";

import { Job } from "@/lib/types";

const resources = [
  {
    title: "Cookie-based Auth and the Next.js App Router",
    subtitle:
      "This free course by Jon Meyers, shows you how to configure Supabase Auth to use cookies, and steps through some common patterns.",
    url: "https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF",
    icon: "M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z",
  },
  {
    title: "Supabase Next.js App Router Example",
    subtitle:
      "Want to see a code example containing some common patterns with Next.js and Supabase? Check out this repo!",
    url: "https://github.com/supabase/supabase/tree/master/examples/auth/nextjs",
    icon: "M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8",
  },
  {
    title: "Supabase Auth Helpers Docs",
    subtitle:
      "This template has configured Supabase Auth to use cookies for you, but the docs are a great place to learn more.",
    url: "https://supabase.com/docs/guides/auth/auth-helpers/nextjs",
    icon: "M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528",
  },
];

export default function JobCard(job: Job) {
  return (
    <Link
      key={job.slug}
      className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground mb-4 bg-background text-foreground "
      href={`/job/${job.slug}`}
      // target="_blank"
      // rel="noreferrer"
    >
      <h3 className="font-bold mb-2 min-h-[40px] lg:min-h-[60px]">
        {job.name}
      </h3>
      <div className="flex flex-col grow gap-4 justify-between">
        <p className="text-sm opacity-70">{job.description}</p>
        <div className="flex justify-between items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-80 group-hover:opacity-100"
          >
            <path
              // use a random icon from the list
              d={resources[Math.floor(Math.random() * resources.length)].icon}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
