/**
 * A wall hook whose prongs are generated from your portfolio.
 * One prong (and one hanging bag) per case study, capped at 4.
 *
 * Add a case study to the `work` array in content/site.js and a prong
 * grows here automatically. Nothing to edit in this file.
 *
 * Pure SVG + CSS — no JavaScript runs at all. The sway is defined in
 * globals.css and is disabled under prefers-reduced-motion.
 */

const MAX_PRONGS = 4;

// -- geometry ------------------------------------------------------------
const VB_W = 420;
const VB_H = 356; // just past BAG_BOTTOM — no dead space under the bags
const CENTRE = VB_W / 2;

const PLATE_Y = 26;    // wall plate
const RAIL_Y = 104;    // horizontal rail the prongs hang off
const HOOK_BEND = 140; // where the prong starts curling
const CRADLE_Y = 152;  // low point of the hook — the handle rests here
const GAP = 86;        // spacing between prongs

const BAG_W = 64;
const BAG_TOP = 200;
const BAG_BOTTOM = 336;

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

export default function HangingBags({ items = [] }) {
  const count = Math.min(Math.max(items.length, 1), MAX_PRONGS);
  const xs = prongPositions(count);

  const railLeft = xs[0] - 26;
  const railRight = xs[count - 1] + 26;

  return (
    <div className="hanger" aria-hidden="false">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="hanger-svg"
        role="img"
        aria-label={`${count} client ${count === 1 ? "bag" : "bags"} hanging from a ${count}-pronged hook`}
      >
        <defs>
          <linearGradient id="bagFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.075)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.022)" />
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

        {/* ---- prongs: down from the rail, cradling, then curling back up.
                Drawn behind the bags; the tip is repainted on top further
                down so the handle reads as threaded over the hook. ---- */}
        {xs.map((x, i) => (
          <path
            key={`prong-${i}`}
            d={`M ${x} ${RAIL_Y}
                V ${HOOK_BEND}
                Q ${x} ${CRADLE_Y} ${x + 13} ${CRADLE_Y}
                Q ${x + 25} ${CRADLE_Y} ${x + 25} ${CRADLE_Y - 22}`}
            fill="none"
            stroke="url(#metal)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        ))}

        {/* ---- bags ---- */}
        {xs.map((x, i) => {
          // The bag hangs from the cradle of the hook, not from the prong's
          // vertical shaft — so everything centres on cradleX.
          const cradleX = x + 13;
          const left = cradleX - BAG_W / 2;
          const right = cradleX + BAG_W / 2;
          const handleL = left + 14;
          const handleR = right - 14;

          const item = items[i];
          const href = item?.slug ? `/work/${item.slug}` : null;
          const label = bagLabel(item, i);

          const bag = (
            <g
              key={`bag-${i}`}
              className={`bag bag-${i % 4}`}
              /* pivot at the hook's cradle, so it swings from where it hangs */
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
                fill="url(#bagFace)"
                stroke="var(--line-2)"
                strokeWidth="1.4"
              />

              {/* fold along the top edge */}
              <line
                x1={left + 1} y1={BAG_TOP + 15} x2={right - 1} y2={BAG_TOP + 15}
                stroke="var(--line-2)" strokeWidth="1.1" opacity=".75"
              />

              {/* accent band */}
              <rect
                x={left + 1} y={BAG_TOP} width={BAG_W - 2} height="15"
                fill="var(--accent)" opacity=".16"
              />

              {/* label, stacked so it fits the narrow bag */}
              <text
                x={cradleX}
                y={BAG_TOP + 56}
                className="bag-label"
                textAnchor="middle"
              >
                {label
                  .split(" ")
                  .slice(0, 2)
                  .map((word, wi) => (
                    <tspan key={wi} x={cradleX} dy={wi === 0 ? 0 : 17}>
                      {word}
                    </tspan>
                  ))}
              </text>

              {/* "view" cue, revealed on hover/focus */}
              <text
                x={cradleX}
                y={BAG_BOTTOM - 16}
                className="bag-cue"
                textAnchor="middle"
              >
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
            </g>
          );

          // Each bag links straight into its case study.
          return href ? (
            <a
              key={`link-${i}`}
              href={href}
              className="bag-link"
              aria-label={`${label} — read the case study`}
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
      </svg>
    </div>
  );
}
