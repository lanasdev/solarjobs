"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      className="rounded-md bg-btn-background px-4 py-2 font-medium no-underline transition-colors hover:bg-btn-background-hover"
      onClick={signOut}
    >
      Logout
    </button>
  );
}
