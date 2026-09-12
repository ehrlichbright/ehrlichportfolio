"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders an image, and falls back to a labelled placeholder box
 * if the file isn't in /public yet. Drop your image in and it
 * appears automatically — no code change needed.
 *
 * Note: `onError` alone is not enough. The server-rendered <img> can
 * fail to load *before* React hydrates and attaches the handler, which
 * leaves a broken-image icon on screen forever. So we also check the
 * element's real state once on mount.
 */
export default function Media({ src, alt, label }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(!src);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // Already finished loading and has no pixels => it errored pre-hydration.
    if (img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return <span className="media-ph">{label || "Image placeholder"}</span>;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      ref={ref}
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
