import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap" style={{ textAlign: "center", padding: "140px 24px" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 400 }}>
        That page doesn’t exist.
      </h1>
      <p style={{ color: "var(--ink-2)", marginTop: 16 }}>
        The link may be old, or the page may have moved.
      </p>
      <Link className="btn" href="/" style={{ marginTop: 32 }}>Back home</Link>
    </section>
  );
}
