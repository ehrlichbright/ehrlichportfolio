/**
 * A wall hook whose prongs are generated from your portfolio, hanging
 * over a still lake. One prong (and one hanging bag) per case study,
 * capped at 4.
 *
 * Add a case study to the `work` array in content/site.js and a prong
 * grows here automatically. Nothing to edit in this file.
 *
 * Pure SVG + CSS — no JavaScript runs at all. The sway and the ripples
 * are defined in globals.css and stop under prefers-reduced-motion.
 */

const MAX_PRONGS = 4;

// -- geometry ------------------------------------------------------------
const VB_W = 420;
const VB_H = 486;
const CENTRE = VB_W / 2;

const PLATE_Y = 26;    // wall plate
const RAIL_Y = 104;    // horizontal rail the prongs hang off
const HOOK_BEND = 140; // where the prong starts curling
const CRADLE_Y = 152;  // low point of the hook — the handle rests here
const GAP = 86;        // spacing between prongs

const BAG_W = 64;
const BAG_TOP = 200;
const BAG_BOTTOM = 336;

const WATER_Y = 356;   // the surface. Reflections mirror about this line.
const RIPPLE_PERIOD = 48;

// Bags hang 13px right of each prong shaft (at the hook's cradle), so the
// prongs sit slightly left of centre to keep the whole group visually centred.
const CRADLE_OFFSET = 13;

function prongPositions(count) {
  const span = (count - 1) * GAP;
  return Array.from(
    { length: count },
    (_, i) => CENTRE - span / 2 + i * GAP - CRADLE_OFFSET / 2
  );
}

function bagLabel(item, index) {
  // Use the real client name once it's filled in; until then, Client 1, 2, 3…
  const name = item?.client ?? "";
  const isPlaceholder = !name || name.includes("[");
  return isPlaceholder ? `Client ${index + 1}` : name;
}

/**
 * A horizontal sine wave. Drawn wider than the viewBox and animated by
 * exactly one period, so the loop is seamless with no visible jump.
 */
function wavePath(y, amp, period = RIPPLE_PERIOD) {
  const from = -period * 4;
  const to = VB_W + period * 4;
  const half = period / 2;
  const steps = Math.ceil((to - from) / half);

  let d = `M ${from} ${y} q ${half / 2} ${-amp} ${half} 0`;
  for (let i = 1; i < steps; i++) d += ` t ${half} 0`;
  return d;
}

/** One bag. `mirrored` drops the text, which shouldn't appear in a reflection. */
function Bag({ x, index, item, mirrored = false }) {
  const cradleX = x + CRADLE_OFFSET;
  const left = cradleX - BAG_W / 2;
  const right = cradleX + BAG_W / 2;
  const handleL = left + 14;
  const handleR = right - 14;

  return (
    <g
      className={`bag bag-${index % 4}`}
      style={{ transformOrigin: `${cradleX}px ${CRADLE_Y}px` }}
    >
      {/* handle — apex rests in the cradle of the hook */}
      <path
        d={`M ${handleL} ${BAG_TOP}
            C ${handleL} ${CRADLE_Y - 14}, ${handleR} ${CRADLE_Y - 14}, ${handleR} ${BAG_TOP}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".9"
      />

      {/* body — slightly wider at the base, like a paper carrier */}
      <path
        d={`M ${left} ${BAG_TOP}
            L ${right} ${BAG_TOP}
            L ${right + 5} ${BAG_BOTTOM - 8}
            q 0 8 -8 8
            L ${left + 3} ${BAG_BOTTOM}
            q -8 0 -8 -8
            Z`}
        fill={mirrored ? "url(#bagFaceRefl)" : "url(#bagFace)"}
        stroke="var(--line-2)"
        strokeWidth="1.4"
      />

      {/* fold along the top edge */}
      <line
        x1={left + 1} y1={BAG_TOP + 15} x2={right - 1} y2={BAG_TOP + 15}
        stroke="var(--line-2)" strokeWidth="1.1" opacity=".75"
      />

      {/* accent band across the top of the bag */}
      <rect
        x={left + 1} y={BAG_TOP} width={BAG_W - 2} height="15"
        fill="var(--accent)" opacity=".55"
      />

      {!mirrored && (
        <>
          <text x={cradleX} y={BAG_TOP + 56} className="bag-label" textAnchor="middle">
            {bagLabel(item, index)
              .split(" ")
              .slice(0, 2)
              .map((word, wi) => (
                <tspan key={wi} x={cradleX} dy={wi === 0 ? 0 : 17}>
                  {word}
                </tspan>
              ))}
          </text>

          <text x={cradleX} y={BAG_BOTTOM - 16} className="bag-cue" textAnchor="middle">
            View →
          </text>

          {/* generous invisible hit area — the bag art alone is fiddly */}
          <rect
            x={left - 6}
            y={CRADLE_Y - 8}
            width={BAG_W + 12}
            height={BAG_BOTTOM - CRADLE_Y + 16}
            fill="transparent"
          />
        </>
      )}
    </g>
  );
}

export default function HangingBags({ items = [] }) {
  const count = Math.min(Math.max(items.length, 1), MAX_PRONGS);
  const xs = prongPositions(count);

  const railLeft = xs[0] - 26;
  const railRight = xs[count - 1] + 26;

  const prongPath = (x) =>
    `M ${x} ${RAIL_Y}
     V ${HOOK_BEND}
     Q ${x} ${CRADLE_Y} ${x + 13} ${CRADLE_Y}
     Q ${x + 25} ${CRADLE_Y} ${x + 25} ${CRADLE_Y - 22}`;

  return (
    <div className="hanger">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="hanger-svg"
        role="img"
        aria-label={`${count} client ${count === 1 ? "bag" : "bags"} hanging from a ${count}-pronged hook above water`}
      >
        <defs>
          <linearGradient id="bagFace" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.15)" />
            <stop offset="55%" stopColor="rgba(255,255,255,.075)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.03)" />
          </linearGradient>

          {/* the reflected bags need a stronger face — they sit on top of
              the water gradient and under the ripples, and at the real
              bag's alpha they disappear entirely */}
          <linearGradient id="bagFaceRefl" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.30)" />
            <stop offset="55%" stopColor="rgba(255,255,255,.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.10)" />
          </linearGradient>

          {/* userSpaceOnUse is required: straight lines have a zero-area
              bounding box, so an objectBoundingBox gradient would not paint. */}
          <linearGradient
            id="metal"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={VB_W} y2="0"
          >
            <stop offset="0%" stopColor="#4a4a54" />
            <stop offset="38%" stopColor="#a2a2ad" />
            <stop offset="62%" stopColor="#7d7d88" />
            <stop offset="100%" stopColor="#43434c" />
          </linearGradient>

          {/* the reflection dissolves as it goes deeper */}
          <linearGradient
            id="reflectionFade"
            gradientUnits="userSpaceOnUse"
            x1="0" y1={WATER_Y} x2="0" y2={VB_H}
          >
            <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
            <stop offset="40%" stopColor="#fff" stopOpacity=".45" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="reflectionMask">
            <rect
              x="0" y={WATER_Y} width={VB_W} height={VB_H - WATER_Y}
              fill="url(#reflectionFade)"
            />
          </mask>

          {/* the water body itself, and a fade at the left/right shores */}
          <linearGradient
            id="waterBody"
            gradientUnits="userSpaceOnUse"
            x1="0" y1={WATER_Y} x2="0" y2={VB_H}
          >
            <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity=".16" />
            <stop offset="45%" stopColor="rgb(var(--accent-2-rgb))" stopOpacity=".07" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shoreFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VB_W} y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="16%" stopColor="#fff" />
            <stop offset="84%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <mask id="shoreMask">
            <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#shoreFade)" />
          </mask>
        </defs>

        {/* ---- wall plate + stem ---- */}
        <rect
          x={CENTRE - 26} y={PLATE_Y} width="52" height="13" rx="6.5"
          fill="url(#metal)" opacity=".9"
        />
        <line
          x1={CENTRE} y1={PLATE_Y + 13} x2={CENTRE} y2={RAIL_Y}
          stroke="url(#metal)" strokeWidth="5" strokeLinecap="round"
        />

        {/* ---- rail ---- */}
        {count > 1 && (
          <line
            x1={railLeft} y1={RAIL_Y} x2={railRight} y2={RAIL_Y}
            stroke="url(#metal)" strokeWidth="5.5" strokeLinecap="round"
          />
        )}

        {/* ---- prongs (behind the bags) ---- */}
        {xs.map((x, i) => (
          <path
            key={`prong-${i}`}
            d={prongPath(x)}
            fill="none"
            stroke="url(#metal)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        ))}

        {/* ---- bags, each linked to its case study ---- */}
        {xs.map((x, i) => {
          const item = items[i];
          const href = item?.slug ? `/work/${item.slug}` : null;
          const bag = <Bag key={`bag-${i}`} x={x} index={i} item={item} />;

          return href ? (
            <a
              key={`link-${i}`}
              href={href}
              className="bag-link"
              aria-label={`${bagLabel(item, i)} — read the case study`}
            >
              {bag}
            </a>
          ) : (
            bag
          );
        })}

        {/* ---- hook tips, repainted over the handles so each bag reads
                as hanging *on* its prong rather than beside it ---- */}
        {xs.map((x, i) => (
          <path
            key={`tip-${i}`}
            d={`M ${x + 13} ${CRADLE_Y}
                Q ${x + 25} ${CRADLE_Y} ${x + 25} ${CRADLE_Y - 22}`}
            fill="none"
            stroke="url(#metal)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        ))}

        {/* ================= THE LAKE ================= */}
        <g mask="url(#shoreMask)">
          {/* water body */}
          <rect
            x="0" y={WATER_Y} width={VB_W} height={VB_H - WATER_Y}
            fill="url(#waterBody)"
          />

          {/* mirrored bags, dissolving with depth */}
          <g
            mask="url(#reflectionMask)"
            transform={`translate(0 ${WATER_Y * 2}) scale(1 -1)`}
            aria-hidden="true"
          >
            {xs.map((x, i) => (
              <Bag key={`refl-${i}`} x={x} index={i} item={items[i]} mirrored />
            ))}
          </g>

          {/* the surface line */}
          <line
            x1="0" y1={WATER_Y} x2={VB_W} y2={WATER_Y}
            stroke="rgb(var(--accent-rgb))" strokeOpacity=".4" strokeWidth="1"
          />

          {/* ripples — each drifts at its own speed so they never march
              in step. Amplitude grows with depth for a little perspective. */}
          <g className="ripples" fill="none" strokeLinecap="round">
            <path className="ripple ripple-0" d={wavePath(WATER_Y + 13, 1.8)} stroke="rgb(var(--accent-rgb))" strokeOpacity=".34" strokeWidth="1.1" />
            <path className="ripple ripple-1" d={wavePath(WATER_Y + 30, 2.4)} stroke="rgb(var(--accent-rgb))" strokeOpacity=".26" strokeWidth="1.2" />
            <path className="ripple ripple-2" d={wavePath(WATER_Y + 50, 3.2)} stroke="rgb(var(--accent-rgb))" strokeOpacity=".19" strokeWidth="1.3" />
            <path className="ripple ripple-3" d={wavePath(WATER_Y + 74, 4.0)} stroke="rgb(var(--accent-2-rgb))" strokeOpacity=".16" strokeWidth="1.4" />
            <path className="ripple ripple-4" d={wavePath(WATER_Y + 101, 4.8)} stroke="rgb(var(--accent-rgb))" strokeOpacity=".11" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
