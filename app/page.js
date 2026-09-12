import Link from "next/link";
import HangingBags from "@/components/HangingBags";
import { site, hero, work } from "@/content/site";

export default function Home() {
  return (
    <div className="landing">
      <div className="landing-inner">
        <header className="landing-id">
          <h1 className="landing-name">{site.name}</h1>
          <p className="landing-line">
            {hero.headline} <em>{hero.headlineAccent}</em>
          </p>
        </header>

        {/* One bag per case study, hung on a prong. Capped at 4. */}
        <HangingBags items={work} />

        <p className="landing-hint">
          Pick a bag to open the case study
        </p>

        <nav className="landing-nav">
          <Link href="/story">The story</Link>
          <span className="dot" aria-hidden="true">·</span>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
