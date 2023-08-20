import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Fragment } from "react";
import LogoutButton from "./LogoutButton";

export default async function UserNav() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles, error: errorProfiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id);

  let profile = profiles
    ? profiles[0]
    : {
        first_name: "John",
        last_name: "Doe",
        email: "",
        avatar: "/images/02.png",
      };

  const avatar = "https://avatars.githubusercontent.com/u/9609790?v=4";

  // console.log(generateInitials(profile.first_name, profile.last_name));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile.avatar} alt="@shadcn" />
            <AvatarFallback>{generateInitials(profile) || "ME"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.first_name || "Hello"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || "m@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem textValue="Profile">
            <Link href="/profile">Profile</Link>
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/company/new">New Company</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 *  generate the initials from the first and last name as a placeholder for the avatar
 * @param first_name
 * @param last_name
 * @returns the initials (max 2 chars) as a string
 */
function generateInitials({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) {
  if (!first_name && !last_name) {
    return "ME";
  }

  const firstInitial = first_name ? first_name.charAt(0).toUpperCase() : "";
  const lastInitial = last_name ? last_name.charAt(0).toUpperCase() : "";

  if (firstInitial && lastInitial) {
    return firstInitial + lastInitial;
  } else if (firstInitial) {
    return firstInitial;
  } else if (lastInitial) {
    return lastInitial;
  } else {
    return "ME";
  }
}
