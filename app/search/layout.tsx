export const metadata = {
  title: "Solar Jobs",
  description: "Find a job in the solar industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto pb-64 pt-16">{children}</div>;
}
