export default function CompanyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="container mx-auto">{children}</section>;
}
