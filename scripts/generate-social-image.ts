import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { browserLaunchOptions } from "./browser";
import { site } from "../src/lib/site";

// A local, reproducible composition of the owner's selected portrait.
// No image-generation service, remote assets, or running app is needed.
const [portrait, space, manrope] = await Promise.all([
  readFile(new URL("../public/images/noor-portrait.webp", import.meta.url)),
  readFile(new URL("../src/assets/fonts/space-grotesk.woff2", import.meta.url)),
  readFile(new URL("../src/assets/fonts/manrope.woff2", import.meta.url)),
]);
const browser = await chromium.launch(await browserLaunchOptions());
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.setContent(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  @font-face { font-family: Space; src: url(data:font/woff2;base64,${space.toString("base64")}); font-weight: 300 700; }
  @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${manrope.toString("base64")}); font-weight: 200 800; }
  * { box-sizing: border-box; }
  body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #090b10; color: #f3f1f6; font-family: Manrope, sans-serif; }
  .logo { position: absolute; top: 40px; left: 60px; font: 600 42px Space, sans-serif; letter-spacing: -3px; }
  .logo span { color: #b5a7f4; }
  .label { position: absolute; top: 130px; left: 60px; font: 11px monospace; letter-spacing: 1.1px; color: #b4abc8; }
  h1 { position: absolute; top: 166px; left: 56px; margin: 0; font: 500 70px / 1.06 Space, sans-serif; letter-spacing: -3.5px; }
  h1 span { color: #b5a7f4; }
  .identity { position: absolute; top: 435px; left: 60px; }
  .identity strong { font: 500 23px Space, sans-serif; letter-spacing: -0.6px; }
  .identity p { margin: 11px 0 0; font-size: 13px; color: #b2b4c1; }
  .portrait { position: absolute; right: 60px; top: 66px; width: 396px; height: 446px; overflow: hidden; border-radius: 20px; border: 1px solid #58525e; background: radial-gradient(ellipse at 28% 20%, #78717d, #44404b 54%, #2c2b34); }
  .portrait img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  .caption { position: absolute; inset: auto 0 0; display: flex; align-items: end; justify-content: space-between; padding: 60px 23px 24px; background: linear-gradient(transparent, #14131be6); }
  .caption span { color: #e5dfe9; font: 8px monospace; letter-spacing: 1px; padding-bottom: 4px; }
  .caption strong { font: 500 37px / 1 Space, sans-serif; letter-spacing: -2px; color: #e7dcf3; }
  footer { position: absolute; top: 565px; left: 60px; right: 60px; display: flex; justify-content: space-between; padding-top: 21px; border-top: 1px solid #31313d; color: #aaaebd; font-size: 11px; }
  footer span:first-child { font: 10px monospace; letter-spacing: 1px; }
</style></head><body>
  <div class="logo">noor<span>.</span></div>
  <div class="label">THOUGHTFUL PRODUCTS. CONNECTED SYSTEMS.</div>
  <h1>I build digital<br>products with<br><span>intelligence.</span></h1>
  <div class="identity"><strong>${site.name}</strong><p>Full-Stack Developer &nbsp; / &nbsp; AI Engineer &nbsp; / &nbsp; AI Agent Developer</p></div>
  <div class="portrait"><img alt="${site.name} wearing a black hijab" src="data:image/webp;base64,${portrait.toString("base64")}"><div class="caption"><span>THE PERSON BEHIND THE CODE</span><strong>n.</strong></div></div>
  <footer><span>KARACHI, PAKISTAN · OPEN TO THE WORLD</span><span>Considered design. Thoughtful engineering.</span></footer>
</body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });
  await page.screenshot({ path: "src/app/opengraph-image.png" });
  console.log("Wrote src/app/opengraph-image.png (1200 × 630).");
} finally {
  await browser.close();
}
