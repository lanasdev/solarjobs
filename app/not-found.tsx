import SectionContainer from "@/components/SectionContainer";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-[80vh] flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-semibold">404</h1>
      <p className="text-2xl font-semibold">Page not found</p>
      <Link
        href="/"
        className="group mt-4 flex items-center text-slate-600 hover:text-slate-700"
      >
        Go back home
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-2"
        >
          {" "}
          &rarr;
        </span>
      </Link>
    </div>
  );
}
