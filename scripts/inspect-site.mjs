import { chromium as playwright } from "@playwright/test";
import { browserLaunchOptions } from "./browser.ts";
import { mkdir } from "node:fs/promises";

await mkdir(".cache/screenshots", { recursive: true });
const browser = await playwright.launch(await browserLaunchOptions());
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(
      process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
      { waitUntil: "networkidle", timeout: 120000 },
    );
    await page.screenshot({ path: `.cache/screenshots/${name}-hero.png` });

    // Capture real viewport-sized sections, not one enormous rendering surface.
    // Tall mobile pages can exceed a headless GPU's texture limit and produce
    // repeated tiles in fullPage screenshots despite a correct, single DOM.
    for (const id of [
      "about",
      "expertise",
      "work",
      "services",
      "process",
      "contact",
    ]) {
      await page.locator(`#${id}`).evaluate((section) =>
        window.scrollTo({
          top: section.getBoundingClientRect().top + window.scrollY - 85,
          behavior: "instant",
        }),
      );
      await page.screenshot({
        path: `.cache/screenshots/${name}-${id}.png`,
      });
    }
    await page.locator(".contact-form").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `.cache/screenshots/${name}-form.png` });

    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      contentWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      mainCount: document.querySelectorAll("main").length,
      headingCount: document.querySelectorAll("h1").length,
    }));
    console.log(name, JSON.stringify({ dimensions, errors }));
    if (
      errors.length ||
      dimensions.contentWidth > width ||
      dimensions.mainCount !== 1 ||
      dimensions.headingCount !== 1
    )
      process.exitCode = 1;
    await context.close();
  }
} finally {
  await browser.close();
}
