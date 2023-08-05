import { Skeleton } from "@/components/Skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="relative flex flex-col  rounded-lg border p-6 hover:border-foreground mb-4">
      <Skeleton className="h-2 w-16 mb-2 " />
      <Skeleton className="h-4 pt-6 text-sm opacity-70" />
      <Skeleton className="h-8 w-full mt-8 " />

      {/* <div className="flex flex-col grow gap-4 justify-between">
        <Skeleton className="text-sm opacity-70" />
      </div> */}
    </div>
  );
}
