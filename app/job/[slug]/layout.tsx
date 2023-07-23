export default function JobPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="container mx-auto">{children}</section>;
}
