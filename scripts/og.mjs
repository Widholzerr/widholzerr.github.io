// Gera public/og.png (1200x630) a partir de um SVG. Rode: npm run og
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#060b16"/>
  <rect x="60" y="60" width="64" height="64" rx="16" fill="#e6eef9"/>
  <text x="92" y="102" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-weight="700" font-size="24" fill="#060b16">PW</text>
  <text x="60" y="360" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="104" letter-spacing="-4" fill="#e6eef9">Pedro Costa</text>
  <text x="60" y="470" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="104" letter-spacing="-4" fill="#e6eef9">Widholzer<tspan fill="#4aa3ff">.</tspan></text>
  <text x="60" y="560" font-family="DejaVu Sans Mono, monospace" font-size="26" letter-spacing="3" fill="#90a0b8">DESENVOLVEDOR FULL STACK · PORTO ALEGRE</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(new URL("../public/og.png", import.meta.url), png);
console.log("public/og.png gerado");
