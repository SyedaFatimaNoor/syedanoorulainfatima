import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../../src/lib/projects";
import { additionalProjects } from "../../src/lib/additional-projects";

async function fillEnquiry(page: import("@playwright/test").Page) {
  await page.getByLabel("Your name", { exact: false }).fill("Alex Example");
  await page
    .getByRole("textbox", { name: /^Email address/ })
    .fill("alex@example.com");
  await page
    .getByLabel("What are we building?", { exact: false })
    .selectOption("Full-stack web development");
  await page
    .getByLabel("A little about your project", { exact: false })
    .fill(
      "We would like to explore an accessible dashboard for our product team.",
    );
  await page.getByRole("checkbox", { name: /You may contact me/ }).check();
}

test("complete homepage: sections, verified links, images and no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Syeda Noor Fatima.*Full-Stack Developer/);
  await expect(page.locator("h1")).toContainText("I build digital");
  await expect(page.locator(".role-text")).toContainText(
    "Full-Stack Developer",
  );
  for (const id of [
    "about",
    "expertise",
    "work",
    "services",
    "process",
    "contact",
  ])
    await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
  await expect(page.locator(".skill-card")).toHaveCount(5);
  await expect(page.locator(".service-card")).toHaveCount(6);
  await expect(page.locator(".process-list > li")).toHaveCount(5);
  for (const project of projects) {
    await expect(
      page.locator(`#work a[href="${project.liveUrl}"]`),
    ).toHaveAttribute("rel", "noopener noreferrer");
    await expect(
      page.locator(`[data-project="${project.slug}"] .project-preview`),
    ).toHaveAttribute("data-preview", project.slug);
  }
  await expect(page.locator(".featured-project")).toHaveCount(
    projects.filter((project) => project.featured).length,
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  // Lazy images should load when reached, not while still far below the fold.
  for (const image of await page.locator(".project-preview img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element) => {
          const img = element as HTMLImageElement;
          return img.complete && img.naturalWidth > 0;
        }),
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
});

test("confirmed LinkedIn and WhatsApp contacts are linked without setup or tracking", async ({
  page,
}) => {
  await page.goto("/");
  const linkedin =
    "https://www.linkedin.com/in/syeda-noor-ul-ain-fatima-b146032ba/";
  const whatsapp = "https://wa.me/923391451101";
  await expect(
    page.locator(`.hero-socials a[href="${linkedin}"]`),
  ).toBeVisible();
  const contact = page.locator("#contact");
  for (const [name, href] of [
    ["LinkedIn", linkedin],
    ["WhatsApp", whatsapp],
  ]) {
    const link = contact.getByRole("link", { name: new RegExp(name) });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAttribute("target", "_blank");
    await link.focus();
    await expect(link).toBeFocused();
  }
  await expect(contact.getByRole("link", { name: /WhatsApp/ })).toContainText(
    "+92 339 1451101",
  );
  await expect(page.locator(".channel-placeholder")).toHaveCount(0);
  await expect(
    page.getByText(/Profile to be added|Number to be added/),
  ).toHaveCount(0);
  const person = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(person.sameAs).toContain(linkedin);
});

test("project filters and skill disclosures have real, keyboard-accessible state", async ({
  page,
}) => {
  await page.goto("/");
  const aiFilter = page.getByRole("button", { name: /AI & systems/ });
  await aiFilter.click();
  await expect(aiFilter).toHaveAttribute("aria-pressed", "true");
  const aiProjects = projects.filter(
    (project) => project.category === "AI & systems",
  );
  await expect(page.locator(".project-card")).toHaveCount(aiProjects.length);
  await expect(page.locator(".project-card h3")).toHaveText(
    aiProjects.map((project) => project.name),
  );
  await expect(page.locator('#work [aria-live="polite"]')).toHaveText(
    `Showing ${aiProjects.length} ai & systems projects`,
  );
  await page.getByRole("button", { name: /Web experiences/ }).click();
  const webProjects = projects.filter(
    (project) => project.category === "Web experiences",
  );
  await expect(page.locator(".project-card")).toHaveCount(webProjects.length);
  await expect(page.locator(".project-card h3")).toHaveText(
    webProjects.map((project) => project.name),
  );
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
  const disclosure = page.locator(".skill-details").first();
  await disclosure.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(disclosure).not.toHaveAttribute("open", "");
});

test("navigation, mobile focus trapping, Escape, section links and back-to-top", async ({
  page,
}) => {
  await page.goto("/");
  const isCompact = (page.viewportSize()?.width || 0) < 850;
  if (isCompact) {
    const menu = page.getByRole("button", { name: "Open navigation menu" });
    await menu.click();
    const dialog = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: "Close navigation menu" }).focus();
    await page.keyboard.press("Shift+Tab");
    await expect(
      dialog.getByRole("link", { name: /syedanoorfatima610/ }),
    ).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(menu).toBeFocused();
    await menu.click();
    await dialog.getByRole("link", { name: /Work/ }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/#work$/);
  } else {
    await page.locator('.desktop-nav a[href="#work"]').click();
    await expect(page.locator('.desktop-nav a[href="#work"]')).toHaveAttribute(
      "aria-current",
      "location",
    );
  }
  await expect(
    page.getByRole("link", { name: "Back to top", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
});

test("form validation and honest draft preparation, copy, and focus restoration", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const submit = page.locator('.contact-form button[type="submit"]');
  await submit.click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#message-error")).toBeVisible();
  await expect(page.locator("#consent-error")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  await fillEnquiry(page);
  await submit.click();
  const dialog = page.getByRole("dialog", {
    name: "Your email draft is ready.",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Nothing has been sent yet");
  await expect(
    dialog.getByRole("link", { name: "Open email app" }),
  ).toHaveAttribute("href", /^mailto:syedanoorfatima610@gmail.com\?subject=/);
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await dialog.getByRole("button", { name: "Copy enquiry" }).click();
  await expect(dialog.getByRole("status")).toHaveText(/Copied/);
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "accessible dashboard",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(submit).toBeFocused();
  await expect(page.locator("#message")).toHaveValue(/accessible dashboard/);
});

test("delivery failures preserve the enquiry; provider acceptance is an explicit separate state", async ({
  page,
}) => {
  await page.goto("/");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Email acceptance could not be confirmed. Please use the direct email link.",
      }),
    }),
  );
  await fillEnquiry(page);
  await page.locator('.contact-form button[type="submit"]').click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText(
    "could not be confirmed",
  );
  await expect(page.locator("#message")).toHaveValue(/accessible dashboard/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ mode: "accepted", message: "Provider accepted." }),
    }),
  );
  await page.locator('.contact-form button[type="submit"]').click();
  const dialog = page.getByRole("dialog", {
    name: "Your enquiry is on its way.",
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("accepted your message");
  await expect(page.locator("#message")).toHaveValue("");
});

test("all project routes, privacy, and the not-found page work", async ({
  page,
}) => {
  for (const project of projects) {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toContainText(project.name);
    await expect(
      page.getByRole("link", { name: /live demo|supplied demo/ }).first(),
    ).toHaveAttribute("href", project.liveUrl);
    await expect(page.locator(".preview-disclosure")).not.toBeEmpty();
    await expect(
      page.locator(".case-preview .project-preview"),
    ).toHaveAttribute("data-preview", project.slug);
    await expect(page.locator(".capability-card")).toHaveCount(
      project.capabilities.length,
    );
    await expect(page.locator("h1")).toHaveCount(1);
    const nextProject =
      projects[(projects.indexOf(project) + 1) % projects.length];
    await expect(page.locator(".next-project-link")).toHaveAttribute(
      "href",
      `/projects/${nextProject.slug}`,
    );
    if (project.demoStatus === "unverified") {
      await expect(page.locator(".project-demo-note")).toContainText(
        "Demo not verified",
      );
      await expect(page.locator(".case-story")).toHaveCount(0);
      await expect(page.locator(".case-capabilities")).toHaveCount(0);
      await expect(page.locator(".project-scope")).toContainText(
        "page-review tool",
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: "A simple privacy note." }),
  ).toBeVisible();
  await expect(
    page.getByText(/This version prepares an email draft/),
  ).toBeVisible();
  const response = await page.goto("/projects/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /This page isn’t/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to the portfolio" }).click();
  await expect(page).toHaveURL("/");
});

test("WCAG A/AA automated checks: home, enquiry dialog, project and privacy", async ({
  page,
}) => {
  for (const path of ["/", "/projects/prospectai-studio", "/privacy"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${path}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        mode: "draft",
        subject: "Example enquiry",
        text: "An example message for accessibility testing only.",
        mailto: "mailto:syedanoorfatima610@gmail.com?subject=Example",
      }),
    }),
  );
  await fillEnquiry(page);
  await page.locator('.contact-form button[type="submit"]').click();
  await expect(
    page.getByRole("dialog", { name: "Your email draft is ready." }),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

for (const project of additionalProjects) {
  test(`${project.name}: accessible detail page and distinct preview without browser errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`/projects/${project.slug}`, { waitUntil: "networkidle" });
    const preview = page.locator(".case-preview .project-preview");
    await expect(preview).toHaveAttribute("data-preview", project.slug);
    await expect(preview).toHaveAttribute("aria-hidden", "true");
    // The studies are illustrations, not fake embedded controls inside a link.
    await expect(
      preview.locator("a, button, input, select, textarea"),
    ).toHaveCount(0);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("narrow mobile, tablet-landscape and wide layouts never horizontally overflow", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Additional viewport sweep runs once.",
  );
  for (const path of [
    "/",
    ...projects.map((project) => `/projects/${project.slug}`),
  ]) {
    await page.goto(path);
    for (const width of [320, 360, 428, 600, 820, 850, 1024, 1280, 1920]) {
      await page.setViewportSize({ width, height: 950 });
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          { message: `${path} at width ${width}` },
        )
        .toBe(true);
    }
  }
});

test("custom loading feedback appears only while a page navigation is pending", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".route-loading")).toHaveCount(0);

  let resume!: () => void;
  const navigationGate = new Promise<void>((resolve) => {
    resume = resolve;
  });
  await page.route("**/projects/pinease?*", async (route) => {
    await navigationGate;
    await route.continue();
  });
  const click = page
    .getByRole("link", { name: "Explore Pinease", exact: true })
    .click();
  try {
    await expect(
      page.getByRole("status", { name: "Opening page", exact: true }),
    ).toBeVisible();
    // Loading feedback enhances navigation; it does not replace the content.
    await expect(page.locator("h1")).toContainText("I build digital");
  } finally {
    resume();
    await click;
  }
  await expect(page).toHaveURL(/\/projects\/pinease$/);
  await expect(page.locator("h1")).toContainText("Pinease");
  await expect(page.locator(".route-loading")).toHaveCount(0);
});

test("progressive enhancement keeps projects and email available without JavaScript", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
    isMobile: testInfo.project.use.isMobile,
    hasTouch: testInfo.project.use.hasTouch,
  });
  const page = await context.newPage();
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".role-text")).toHaveText("Full-Stack Developer");
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
  await expect(page.locator(".project-card").first()).toBeVisible();
  await expect(page.locator(".about-copy")).toBeVisible();
  await expect(page.locator(".skill-card").first()).toBeVisible();
  await expect(page.locator(".contact-form")).not.toBeVisible();
  await expect(
    page.locator(
      '.contact-email-row a[href="mailto:syedanoorfatima610@gmail.com"]',
    ),
  ).toBeVisible();
  await expect(
    page.locator('#contact a[href="https://wa.me/923391451101"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      '#contact a[href="https://www.linkedin.com/in/syeda-noor-ul-ain-fatima-b146032ba/"]',
    ),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore MicroCredible", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("MicroCredible");
  await expect(
    page.locator('.case-preview [data-preview="micro-credible"]'),
  ).toBeVisible();
  await context.close();
});

test.describe("motion preferences", () => {
  test.use({ reducedMotion: "no-preference" });
  test("roles, scroll reveals and preview interactions animate without hiding content", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "desktop",
      "Motion behaviour is checked once, in addition to the reduced-motion matrix.",
    );
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator(".role-text")).toContainText("AI Engineer", {
      timeout: 6500,
    });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator(".about-copy")).toHaveCSS("opacity", "1");
    const preview = page.locator(
      '.project-visual-link[aria-label="Explore Pinease"]',
    );
    const frame = preview.locator(".browser-frame");
    await preview.scrollIntoViewIfNeeded();
    const original = await frame.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await preview.hover();
    await expect
      .poll(() =>
        frame.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(original);
    expect(errors).toEqual([]);
  });
});
