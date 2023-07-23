import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <div className="">
          <Link href="/" className=" font-bold text-xl">
            SolarJobs
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline transition-colors bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
          <div className="">
            <Link
              href="/job/hire"
              className="py-2 px-4 rounded-md no-underline bg-yellow-400 hover:bg-yellow-700 transition-colors hover:text-white"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
