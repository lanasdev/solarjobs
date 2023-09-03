import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import UserNav from "@/components/UserNav";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background text-foreground">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <div className="">
          <Link href="/" className=" text-xl font-bold">
            SolarJobs
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/hire"
            className="rounded-md bg-yellow-400 px-4 py-2 font-medium no-underline transition-colors hover:bg-yellow-700 hover:text-white"
          >
            Post a Job
          </Link>
          {user ? (
            <UserNav />
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-btn-background px-4 py-2 font-medium no-underline transition-colors hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
