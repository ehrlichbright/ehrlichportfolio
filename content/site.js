// ============================================================
// EDIT THIS FILE — everything on the site reads from here.
// Replace the [PLACEHOLDER] values with your real details.
// Images go in /public and are referenced as "/filename.jpg".
// ============================================================

export const site = {
  name: "[YOUR NAME]",
  role: "Digital Strategist",
  // Shown in the browser tab + search results
  metaTitle: "[YOUR NAME] — Digital Strategist",
  metaDescription:
    "[ONE SENTENCE: what you do and who you do it for. e.g. 'Digital strategist helping B2B SaaS brands turn paid media, SEO and story into compounding demand.']",
  // Set this once you buy your domain, e.g. "https://yourname.com"
  url: "https://[YOUR-DOMAIN].com",
  email: "[you@yourdomain.com]",
  location: "[City, Country] · Working with clients worldwide",
  // Put your photo at /public/portrait.jpg (or change the path)
  portrait: "/portrait.jpg",
  resume: "/[YOUR-NAME]-CV.pdf", // drop the PDF in /public, or set to null to hide

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/[HANDLE]" },
    { label: "X", href: "https://x.com/[HANDLE]" },
    { label: "Substack", href: "https://[HANDLE].substack.com" },
  ],
};

/**
 * A guaranteed-valid absolute URL for metadata, sitemap and robots.
 * While `site.url` is still the placeholder (or anything unparseable),
 * this falls back to localhost so the build never breaks. Once you set
 * a real domain above, everything picks it up automatically.
 */
export const siteUrl = (() => {
  try {
    return new URL(site.url).origin;
  } catch {
    return "http://localhost:3000";
  }
})();

export const hero = {
  eyebrow: "Digital strategy · Paid media · SEO · Content · Brand",
  // The headline renders as: headline + headlineAccent (in coral italic).
  // Put the words you want emphasised in headlineAccent.
  headline: "I make paid media work",
  headlineAccent: "harder than the budget suggests.",
  // [X] and [INDUSTRIES] are yours to fill — I'm not inventing your track record.
  subhead:
    "[X] years of campaigns for [INDUSTRIES] — the case studies, the numbers, and what I'd do differently.",
  ctaPrimary: { label: "Start a project", href: "#contact" },
  ctaSecondary: { label: "See the work", href: "#work" },
};

// Quick credibility strip under the hero. 3–4 items reads best.
export const stats = [
  { value: "[X]+", label: "Years in digital strategy" },
  { value: "$[X]M", label: "Ad spend managed" },
  { value: "[X]%", label: "Average organic growth" },
  { value: "[X]+", label: "Brands advised" },
];

// Logos: drop files in /public/logos/ and list them here.
// Leave `src` as null to render the name as text instead of an image.
export const clients = {
  title: "Trusted by",
  items: [
    { name: "[CLIENT ONE]", src: null },
    { name: "[CLIENT TWO]", src: null },
    { name: "[CLIENT THREE]", src: null },
    { name: "[CLIENT FOUR]", src: null },
    { name: "[CLIENT FIVE]", src: null },
  ],
};

export const services = [
  {
    id: "paid-media",
    number: "01",
    title: "Paid Media",
    summary:
      "[Describe your paid offer. e.g. 'Full-funnel media planning and buying across search, social and programmatic — built around incrementality, not last-click vanity.']",
    bullets: [
      "Channel strategy & budget allocation",
      "Google, Meta, LinkedIn & TikTok campaign builds",
      "Creative testing frameworks",
      "Measurement, attribution & incrementality testing",
    ],
  },
  {
    id: "seo",
    number: "02",
    title: "SEO",
    summary:
      "[Describe your SEO offer. e.g. 'Technical, content and authority work that compounds — the traffic you keep after the ad budget stops.']",
    bullets: [
      "Technical audits & site architecture",
      "Keyword and search-intent mapping",
      "Programmatic & editorial content strategy",
      "Digital PR and authority building",
    ],
  },
  {
    id: "content",
    number: "03",
    title: "Content Marketing",
    summary:
      "[Describe your content offer. e.g. 'Editorial systems that produce useful work on a schedule, and distribution that makes sure it lands.']",
    bullets: [
      "Content strategy & editorial calendars",
      "Pillar / cluster architecture",
      "Distribution and repurposing systems",
      "Performance reporting and iteration",
    ],
  },
  {
    id: "brand",
    number: "04",
    title: "Brand Storytelling",
    summary:
      "[Describe your brand offer. e.g. 'Positioning, narrative and message architecture — so every channel says the same true thing in the same voice.']",
    bullets: [
      "Positioning & competitive narrative",
      "Messaging frameworks & tone of voice",
      "Founder and executive storytelling",
      "Campaign concepting",
    ],
  },
];

// Case studies. `slug` becomes the URL: /work/[slug]
export const work = [
  {
    slug: "case-study-one",
    client: "[CLIENT NAME]",
    title: "[RESULT-LED TITLE: e.g. 'Cut CAC 38% while tripling qualified pipeline']",
    discipline: "Paid Media",
    year: "[2025]",
    cover: "/work/case-one.jpg", // add image to /public/work/
    teaser:
      "[ONE LINE: the headline outcome in plain language.]",
    metrics: [
      { value: "[-38%]", label: "Cost per acquisition" },
      { value: "[3.1x]", label: "Qualified pipeline" },
      { value: "[X mo]", label: "Time to result" },
    ],
    challenge:
      "[THE CHALLENGE: where the business was when you arrived. What was broken, what had been tried, what was at stake. 2–4 sentences.]",
    approach: [
      "[STEP ONE: what you did first and why.]",
      "[STEP TWO: the core strategic move.]",
      "[STEP THREE: how you built the system that kept it going.]",
    ],
    outcome:
      "[THE OUTCOME: the numbers, plus what changed for the business beyond the numbers. 2–4 sentences.]",
    testimonial: {
      quote: "[CLIENT QUOTE — one or two sentences, specific if you can get it.]",
      author: "[NAME]",
      title: "[TITLE, COMPANY]",
    },
  },
  {
    slug: "case-study-two",
    client: "[CLIENT NAME]",
    title: "[RESULT-LED TITLE: e.g. 'From page 4 to category authority in 9 months']",
    discipline: "SEO & Content",
    year: "[2025]",
    cover: "/work/case-two.jpg",
    teaser: "[ONE LINE: the headline outcome in plain language.]",
    metrics: [
      { value: "[+412%]", label: "Organic sessions" },
      { value: "[#1–3]", label: "Rankings for [X] head terms" },
      { value: "[$X]", label: "Traffic value / month" },
    ],
    challenge: "[THE CHALLENGE.]",
    approach: [
      "[STEP ONE.]",
      "[STEP TWO.]",
      "[STEP THREE.]",
    ],
    outcome: "[THE OUTCOME.]",
    testimonial: null,
  },
  {
    slug: "case-study-three",
    client: "[CLIENT NAME]",
    title: "[RESULT-LED TITLE: e.g. 'A rebrand that finally sounded like the company']",
    discipline: "Brand Storytelling",
    year: "[2024]",
    cover: "/work/case-three.jpg",
    teaser: "[ONE LINE: the headline outcome in plain language.]",
    metrics: [
      { value: "[+X%]", label: "Brand search volume" },
      { value: "[+X%]", label: "Landing page conversion" },
      { value: "[X]", label: "Markets launched" },
    ],
    challenge: "[THE CHALLENGE.]",
    approach: ["[STEP ONE.]", "[STEP TWO.]", "[STEP THREE.]"],
    outcome: "[THE OUTCOME.]",
    testimonial: null,
  },
];

/**
 * THE STORY PAGE (/story)
 * Your profile told as narrative rather than a CV. Each chapter is a
 * beat in the story — keep them short and concrete. Aim for something
 * a stranger would actually read to the end.
 */
export const story = {
  kicker: "The story",
  title: "How I got here",
  standfirst:
    "[STANDFIRST: one or two sentences that make someone want to read on. The tension, not the summary. e.g. 'I spent four years watching brilliant campaigns die in the gap between the media plan and the story. This is what I did about it.']",

  chapters: [
    {
      no: "01",
      heading: "[CHAPTER TITLE: e.g. 'The spreadsheet years']",
      body: [
        "[Where you started. Be specific about the work, not the job title. What you were actually doing all day, and what it taught you.]",
        "[The moment something clicked, or didn't. Stories need a turn.]",
      ],
      pull: "[PULL QUOTE: the sharpest line from this chapter. Delete this field if you don't want one.]",
    },
    {
      no: "02",
      heading: "[CHAPTER TITLE: e.g. 'Learning that the story is the strategy']",
      body: [
        "[The middle of the story. What changed in how you work, and why.]",
        "[Name real constraints — small budgets, sceptical stakeholders, a category nobody cared about. Constraints make the story credible.]",
      ],
      pull: null,
    },
    {
      no: "03",
      heading: "[CHAPTER TITLE: e.g. 'What I do now']",
      body: [
        "[Where you've landed and what you believe as a result. This is the paragraph people quote back to you.]",
        "[What you want next, and who you want to do it with.]",
      ],
      pull: "[PULL QUOTE.]",
    },
  ],
};

export const about = {
  title: "About",
  // Each string is a paragraph.
  paragraphs: [
    "[PARAGRAPH ONE: the short version of who you are and what you're known for. Lead with the thing you want remembered.]",
    "[PARAGRAPH TWO: the path — where you've worked, the kinds of businesses, the disciplines you've stacked. Concrete beats abstract.]",
    "[PARAGRAPH THREE: your point of view. What you believe about marketing that not everyone does. This is the paragraph people quote back to you.]",
  ],
  // The toolbox / capability tags
  skills: [
    "Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "Google Tag Manager",
    "Looker Studio", "Ahrefs", "Semrush", "Screaming Frog", "HubSpot",
    "Webflow", "Figma", "[ADD YOUR OWN]",
  ],
};

export const testimonials = [
  {
    quote: "[TESTIMONIAL: what it was like to work with you, and what changed because of it.]",
    author: "[NAME]",
    title: "[TITLE, COMPANY]",
    avatar: null, // "/avatars/name.jpg"
  },
  {
    quote: "[TESTIMONIAL.]",
    author: "[NAME]",
    title: "[TITLE, COMPANY]",
    avatar: null,
  },
  {
    quote: "[TESTIMONIAL.]",
    author: "[NAME]",
    title: "[TITLE, COMPANY]",
    avatar: null,
  },
];

// Set to null (or empty array) to hide the writing section entirely.
export const writing = [
  {
    title: "[ARTICLE TITLE]",
    href: "https://[LINK-TO-ARTICLE]",
    outlet: "[WHERE IT WAS PUBLISHED]",
    date: "[Month 2025]",
  },
  {
    title: "[ARTICLE TITLE]",
    href: "https://[LINK-TO-ARTICLE]",
    outlet: "[WHERE IT WAS PUBLISHED]",
    date: "[Month 2025]",
  },
  {
    title: "[ARTICLE TITLE]",
    href: "https://[LINK-TO-ARTICLE]",
    outlet: "[WHERE IT WAS PUBLISHED]",
    date: "[Month 2025]",
  },
];

export const contact = {
  title: "Let's talk",
  body:
    "[INVITATION: who you want to hear from and what happens next. e.g. 'Tell me where you're stuck. If I'm the right person, I'll say so within two days — and if I'm not, I'll point you to someone who is.']",
  availability: "[e.g. 'Currently taking on projects from [Month].']",
};
