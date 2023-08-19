"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      className="m-0 p-0"
      variant="ghost"
      // className="rounded-md bg-btn-background px-4 py-2 font-medium no-underline transition-colors hover:bg-btn-background-hover"
      // give me an alternative to onclick

      onClick={signOut}
    >
      Logout
    </Button>
  );
}
