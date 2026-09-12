import Link from "next/link";
import { site, contact } from "@/content/site";

export const metadata = {
  title: `Contact — ${site.name}`,
  description: contact.body,
};

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="wrap">
        <div className="contact-box">
          <div>
            {contact.availability && <div className="avail">{contact.availability}</div>}
            <h1>{contact.title}</h1>
            <p>{contact.body}</p>
          </div>
          <div>
            <a className="contact-mail" href={`mailto:${site.email}`}>{site.email}</a>
            <div className="contact-links">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              ))}
            </div>
            <p style={{ marginTop: 30, fontSize: 14, color: "var(--ink-3)" }}>
              {site.location}
            </p>
          </div>
        </div>

        <p style={{ marginTop: 40 }}>
          <Link href="/" className="back">← Back to the work</Link>
        </p>
      </div>
    </section>
  );
}
