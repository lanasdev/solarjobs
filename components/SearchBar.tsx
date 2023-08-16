"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    if (!e.target.search) return;
    // @ts-ignore
    const q = e.target?.search.value;
    if (!q) return;
    console.log("search", q);
    router.push(`/search?q=${q}`);
  };

  return (
    <form
      onSubmit={(e) => handleSearch(e)}
      className="flex flex-col justify-center px-8 pt-8 md:flex-row"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for jobs"
        autoFocus
        className="rounded-t-md border-b-0 border-gray-300 text-slate-900 accent-yellow-500 shadow-sm sm:text-sm sm:leading-5 md:rounded-l-md md:border-r-0"
      />
      <button
        type="submit"
        className="btn btn-primary border-t-none rounded-b-md border-2 border-t-0 border-white bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 md:rounded-l-none md:rounded-r-md md:border-l-0 md:border-t-2"
      >
        Search
      </button>
    </form>
  );
}
