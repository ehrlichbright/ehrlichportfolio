import Link from "next/link";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import { work, site, contact } from "@/content/site";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — ${site.name}`,
    description: item.teaser,
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  const index = work.findIndex((w) => w.slug === slug);
  const next = work[(index + 1) % work.length];

  return (
    <>
      {/* ---------------- TITLE ---------------- */}
      <div className="cs-hero wrap">
        <Link href="/" className="back">← All work</Link>
        <p className="eyebrow" style={{ marginTop: 28, marginBottom: 0 }}>
          {item.client} · {item.discipline} · {item.year}
        </p>
        <h1>{item.title}</h1>
        {item.teaser && <p className="cs-teaser">{item.teaser}</p>}
      </div>

      {/* ---------------- FULL-BLEED COVER ---------------- */}
      <div className="cs-cover-bleed">
        <Media src={item.cover} alt={item.title} label={`Cover image → /public${item.cover}`} />
      </div>

      {/* ---------------- RESULTS BAND ---------------- */}
      <div className="cs-band">
        <div className="wrap cs-band-inner">
          <p className="cs-band-label">Results</p>
          <div className="cs-band-metrics">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="v">{m.value}</div>
                <div className="l">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- NARRATIVE ---------------- */}
      <div className="wrap cs-narrative">
        <section className="cs-block">
          <h2>The challenge</h2>
          <p className="cs-lede">{item.challenge}</p>
        </section>

        <section className="cs-block cs-approach">
          <h2>The approach</h2>
          <ol className="cs-steps">
            {item.approach.map((step, i) => (
              <li key={i}>
                <span className="cs-step-no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="cs-step-body">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="cs-block">
          <h2>The outcome</h2>
          <p className="cs-lede">{item.outcome}</p>
        </section>
      </div>

      {/* ---------------- CLIENT QUOTE ---------------- */}
      {item.testimonial && (
        <div className="pull-bleed">
          <div className="wrap">
            <blockquote>{item.testimonial.quote}</blockquote>
            <cite className="pull-cite">
              {item.testimonial.author} — {item.testimonial.title}
            </cite>
          </div>
        </div>
      )}

      {/* ---------------- ONWARD ---------------- */}
      <div className="wrap cs-onward">
        <Link className="btn" href="/contact">{contact.title} →</Link>
        {next && next.slug !== item.slug && (
          <Link className="cs-next" href={`/work/${next.slug}`}>
            <span className="cs-next-label">Next case study</span>
            <span className="cs-next-title">{next.title}</span>
          </Link>
        )}
      </div>
    </>
  );
}
