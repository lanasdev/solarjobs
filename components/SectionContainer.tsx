import { cn } from "@/lib/utils";

const SectionContainer = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <section className={cn("container mx-auto px-4 md:px-6", classNames)}>
      {children}
    </section>
  );
};

export default SectionContainer;
