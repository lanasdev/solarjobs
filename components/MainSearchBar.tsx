"use client";
import { useRouter } from "next/navigation";

export default function MainSearchBar() {
  const router = useRouter();

  return (
    <input
      type="search"
      onChange={(e) => {
        router.push(`/search?q=${e.target.value}`);
      }}
      // name="search"
      // id="search"
      placeholder="Search for jobs"
      className="rounded-md shadow-sm text-slate-900 border-gray-300 sm:text-sm sm:leading-5"
    />
  );
}
