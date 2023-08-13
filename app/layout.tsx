import Footer from "./Footer";
import Navbar from "./Navbar";
import "./globals.css";

export const metadata = {
  title: "Solar Jobs",
  description: "Find a job in the solar industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
