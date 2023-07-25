import clsx from "clsx";

const SectionContainer = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames: string;
}) => {
  return (
    <section className={clsx("mx-auto container px-4 md:px-6", classNames)}>
      {children}
    </section>
  );
};

export default SectionContainer;
