import SectionContainer from "@/components/SectionContainer";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center h-[80vh]">
      <h1 className="text-6xl font-semibold">404</h1>
      <p className="text-2xl font-semibold">Page not found</p>
      <Link
        href="/"
        className="text-slate-600 hover:text-slate-700 flex items-center mt-4 group"
      >
        Go back home
        <span
          aria-hidden="true"
          className="inline-block group-hover:translate-x-2 transition-transform"
        >
          {" "}
          &rarr;
        </span>
      </Link>
    </div>
  );
}
