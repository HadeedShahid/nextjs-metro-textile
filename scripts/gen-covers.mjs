import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/covers";
mkdirSync(OUT, { recursive: true });

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const covers = [
  {
    slug: "denim-hardware-guide-buttons-rivets",
    eyebrow: "DENIM HARDWARE",
    lines: ["Jeans Buttons,", "Rivets & Burrs"],
    c1: "#2B0A3E",
    c2: "#A21C73",
  },
  {
    slug: "choosing-zippers-metal-coil-molded",
    eyebrow: "ZIPPERS",
    lines: ["Metal, Coil, or", "Molded Plastic"],
    c1: "#240A4A",
    c2: "#7C2DA8",
  },
  {
    slug: "garment-trims-guide-for-apparel-brands",
    eyebrow: "GARMENT TRIMS",
    lines: ["What Are", "Garment Trims?"],
    c1: "#3A0A33",
    c2: "#B0307F",
  },
  {
    slug: "compliant-apparel-trims-oeko-tex-reach-nickel",
    eyebrow: "COMPLIANCE",
    lines: ["OEKO-TEX, REACH", "& Nickel Release"],
    c1: "#220A38",
    c2: "#6D2B9F",
  },
  {
    slug: "leather-pu-woven-patches-for-denim-branding",
    eyebrow: "BRAND PATCHES",
    lines: ["Leather, PU", "& Woven"],
    c1: "#350A2C",
    c2: "#9C2A78",
  },
  {
    slug: "sourcing-apparel-trims-from-asia",
    eyebrow: "SOURCING",
    lines: ["Sourcing Trims", "from Asia"],
    c1: "#1C0A3E",
    c2: "#5B2A9C",
  },
];

const W = 1200;
const H = 675;

function svg({ eyebrow, lines, c1, c2 }) {
  const titleStart = 300;
  const lh = 78;
  const titleEls = lines
    .map(
      (ln, i) =>
        `<text x="80" y="${titleStart + i * lh}" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#ffffff">${esc(
          ln
        )}</text>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="1050" cy="120" r="320" fill="#ffffff" opacity="0.05"/>
  <circle cx="1140" cy="560" r="180" fill="#ffffff" opacity="0.05"/>
  <rect x="80" y="170" width="64" height="6" rx="3" fill="#ffffff" opacity="0.85"/>
  <text x="80" y="150" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="6" fill="#ffffff" opacity="0.85">${esc(
    eyebrow
  )}</text>
  ${titleEls}
  <text x="80" y="610" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="#ffffff" opacity="0.92">METRO METAL</text>
  <text x="80" y="640" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="400" letter-spacing="1" fill="#ffffff" opacity="0.6">Garment trims &amp; accessories</text>
</svg>`;
}

for (const c of covers) {
  const buf = Buffer.from(svg(c));
  await sharp(buf)
    .jpeg({ quality: 88 })
    .toFile(`${OUT}/${c.slug}.jpg`);
  console.log("wrote", `${OUT}/${c.slug}.jpg`);
}
console.log("done");
