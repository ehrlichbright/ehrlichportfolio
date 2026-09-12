"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © {new Date().getFullYear()} {site.name}. {site.location}
        </span>
        <span>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ marginLeft: 18 }}>
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
