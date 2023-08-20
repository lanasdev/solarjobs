import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-background py-4 text-center text-xs text-foreground">
      <p>
        Developed with {"<3"} by{" "}
        <Link href="https://lanas.dev" target="_blank" className="font-bold">
          Lanas.dev
        </Link>
      </p>
    </footer>
  );
}
