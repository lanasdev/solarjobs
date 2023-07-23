import Image from "next/image";
import Link from "next/link";

import { Company } from "@/lib/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewJobPage() {
  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold">Create a new Job</h1>
    </div>
  );
}
