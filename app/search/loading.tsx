import { Skeleton } from "@/components/Skeleton";
import JobCardSkeleton from "@/components/Skeleton/JobCardSkeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    <div className="">
      <h1 className="mb-2 pb-8 text-2xl font-bold ">Search Page</h1>
      <Skeleton className="h-4 w-full" />

      <hr className="my-8" />
      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* create blank array and map over it */}
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
