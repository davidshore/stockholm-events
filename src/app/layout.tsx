import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stockholm Pulse",
  description: "Handplockade events i Stockholm.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="sv">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            Stockholm <span>Pulse</span>
          </Link>
          <nav aria-label="Huvudmeny">
            <Link href="/#events">Alla events</Link>
            <Link href="/#events">Veckans urval</Link>
            <Link href="/#about">Om guiden</Link>
            <Link className="nav-cta" href="/#events">
              Planera besöket
            </Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer" id="about">
          <strong>Stockholm Pulse</strong>
          <span>En liten guide till stora upplevelser.</span>
        </footer>
      </body>
    </html>
  );
}
