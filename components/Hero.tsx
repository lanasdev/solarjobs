import Link from "next/link";
import Image from "next/image";

import Balancer from "react-wrap-balancer";

import HeroImg from "../public/images/heroimg.png";
import SupabaseLogo from "@/components/SupabaseLogo";
import NextJsLogo from "@/components/NextJsLogo";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

export default function Hero() {
  const handleSearch = async (formData: FormData) => {
    "use server";
    // e.preventDefault();
    const q = formData.get("q");
    if (!q) return;

    console.log("search", q);
    revalidatePath("/");
  };

  return (
    <div className="relative ">
      <Image
        src={HeroImg}
        alt="Hero Image"
        // fill={true}
        placeholder="blur"
        className="h-96 object-cover w-full bg-blend-saturation"
      />
      <div className=" z-10 inset-x-0 top-16 w-full backdrop-blur-sm my-16 text-white ">
        <h1 className="sr-only">
          The fastest way to get hired in the solar industry
        </h1>
        <p className="text-3xl lg:text-4xl !leading-tight font-semibold mx-auto max-w-xl text-center my-12">
          <Balancer>
            The fastest way to get hired in the <strong>solar industry</strong>.
          </Balancer>
        </p>
        <form action={handleSearch} className="flex flex-row justify-center">
          <input
            type="search"
            name="q"
            id="q"
            placeholder="Search for jobs"
            className="rounded-md shadow-sm text-slate-900 border-gray-300 sm:text-sm sm:leading-5"
          />
          <button
            type="submit"
            className="btn btn-primary bg-slate-900 rounded-md shadow-sm ml-2 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
