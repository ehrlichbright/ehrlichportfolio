import Link from "next/link";
import Media from "@/components/Media";
import { site, story, about, services, testimonials, writing } from "@/content/site";

export const metadata = {
  title: `The story — ${site.name}`,
  description: story.standfirst,
};

export default function Story() {
  return (
    <>
      {/* ---------------- OPENING ---------------- */}
      <section className="story-open">
        <div className="wrap">
          <p className="eyebrow">{story.kicker}</p>
          <h1 className="story-title">{story.title}</h1>
          <p className="story-standfirst">{story.standfirst}</p>

          <div className="story-portrait">
            <Media
              src={site.portrait}
              alt={site.name}
              label="Your portrait → /public/portrait.jpg"
            />
          </div>
        </div>
      </section>

      {/* ---------------- CHAPTERS ----------------
          Pull quotes sit OUTSIDE .wrap so they can run the full width
          of the viewport without any negative-margin trickery. */}
      <section className="story-body">
        {story.chapters.map((ch, i) => (
          <div key={ch.no}>
            <div className="wrap">
              <article className={`chapter ${i % 2 ? "chapter-alt" : ""}`}>
                <div className="chapter-no" aria-hidden="true">{ch.no}</div>
                <div className="chapter-text">
                  <h2>{ch.heading}</h2>
                  {ch.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            </div>

            {ch.pull && (
              <div className="pull-bleed">
                <div className="wrap">
                  <blockquote>{ch.pull}</blockquote>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ---------------- WHAT THAT MEANS IN PRACTICE ---------------- */}
      <section id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">In practice</p>
            <h2>Four disciplines, <em>one strategy.</em></h2>
          </div>
          <div className="services">
            {services.map((s) => (
              <article className="service" key={s.id}>
                <div className="service-n">{s.number}</div>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <ul>
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TOOLBOX ---------------- */}
      <section>
        <div className="wrap">
          <p className="eyebrow">Toolbox</p>
          <div className="tags" style={{ maxWidth: 760 }}>
            {about.skills.map((s) => <span className="tag" key={s}>{s}</span>)}
          </div>
          {site.resume && (
            <p style={{ marginTop: 32 }}>
              <a className="btn btn-ghost" href={site.resume}>Download CV</a>
            </p>
          )}
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section id="testimonials">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Testimonials</p>
            <h2>What clients <em>actually say.</em></h2>
          </div>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <figure className="quote" key={i}>
                <blockquote>“{t.quote}”</blockquote>
                <footer>
                  <div className="avatar">
                    {t.avatar && <Media src={t.avatar} alt={t.author} label="" />}
                  </div>
                  <div>
                    <div className="q-name">{t.author}</div>
                    <div className="q-title">{t.title}</div>
                  </div>
                </footer>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WRITING ---------------- */}
      {writing && writing.length > 0 && (
        <section id="writing">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Writing</p>
              <h2>Thinking <em>out loud.</em></h2>
            </div>
            <div className="writing-list">
              {writing.map((a, i) => (
                <a className="writing-item" href={a.href} target="_blank" rel="noreferrer" key={i}>
                  <h3>{a.title}</h3>
                  <div className="writing-side">{a.outlet}<br />{a.date}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- ONWARD ---------------- */}
      <section className="onward">
        <div className="wrap">
          <Link className="btn" href="/contact">Start a conversation →</Link>
          <Link className="btn btn-ghost" href="/" style={{ marginLeft: 12 }}>
            See the work
          </Link>
        </div>
      </section>
    </>
  );
}
