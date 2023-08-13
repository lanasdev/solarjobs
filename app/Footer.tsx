import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background py-4 text-foreground flex justify-center text-center text-xs">
      <p>
        Developed with {"<3"} by{" "}
        <Link href="https://lanas.dev" target="_blank" className="font-bold">
          Lanas.dev
        </Link>
      </p>
    </footer>
  );
}
