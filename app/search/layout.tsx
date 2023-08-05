export const metadata = {
  title: "Solar Jobs",
  description: "Find a job in the solar industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto container pt-16 pb-64">{children}</div>;
}
