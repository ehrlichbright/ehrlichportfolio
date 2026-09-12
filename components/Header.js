"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();

  // The landing page is the hanger and nothing else — it carries its own
  // minimal identity block, so the chrome stays out of its way.
  if (pathname === "/") return null;

  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" className="logo">
          {site.name}
          <span>{site.role}</span>
        </Link>
        <nav className="nav">
          <Link href="/" className="nav-hide">Work</Link>
          <Link href="/story" className="nav-hide">Story</Link>
          <Link href="/contact" className="btn">Get in touch</Link>
        </nav>
      </div>
    </header>
  );
}
