# Portfolio quality review

Reviewed on **12 November 2026**, against the optimised production build of `arena/bf606b97-syedanoorulainfatima`. This update retains the original five projects, adds seven owner-supplied projects, and enables the confirmed LinkedIn and WhatsApp contacts by default. The local preview runs the same build with `npm start` on port 3000.

## Executed checks

| Check                                                                     | Result                                                                                                                                    |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript (`npm run typecheck`)                                          | Passed                                                                                                                                    |
| ESLint (`npm run lint`)                                                   | Passed                                                                                                                                    |
| Unit and contact-API tests (`npm test`)                                   | **22 passed**                                                                                                                             |
| Production build (`npm run build`)                                        | Passed; homepage, **twelve project pages**, and privacy are pre-rendered                                                                  |
| Playwright (`PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`) | **53 passed, 4 intentionally skipped** duplicate matrix entries                                                                           |
| Formatting (`npm run format:check`)                                       | Passed                                                                                                                                    |
| Dependency audit (`npm audit`)                                            | **0 reported vulnerabilities**                                                                                                            |
| Visual capture (`npm run capture`)                                        | No browser errors, duplicate main/H1 elements, or horizontal overflow on the homepage and seven new case pages at all three primary sizes |

The four skipped browser entries are the tablet/mobile repetitions of the desktop-only width sweep and non-reduced-motion test. Those checks ran and passed once. Functional, accessibility, contact-link, no-JavaScript, new-preview, and loading-feedback checks ran at all three primary sizes. The final full browser/capture run completed with exit code 0; earlier contrast findings were corrected before this run.

## Responsive and interaction coverage

- **Desktop:** 1440 × 1000.
- **Tablet:** 768 × 1024.
- **Mobile:** 390 × 844.
- Additional horizontal-overflow sweep at **320, 360, 428, 600, 820, 850, 1024, 1280, and 1920 pixels**, on the homepage **and all twelve case pages**.
- Section navigation and active states, mobile menu focus containment, Escape dismissal, focus restoration, and back-to-top.
- All twelve project cards and independent routes, category filtering (four AI/system projects and eight web experiences), privacy, and the 404 route.
- Correct preview identity for every project, data-driven featured layouts, source-link mappings, exact supplied demo destinations, and the next-project navigation cycle.
- SEO Pilot's explicit unverified-demo notice, qualified external link, and intentional absence of unsupported narrative/capability sections.
- LinkedIn in the hero and contact section; WhatsApp with **+92 339 1451101** displayed and the correct `wa.me` destination; safe new-tab attributes, keyboard focus, no remaining default contact placeholders, and the clean LinkedIn URL in Person structured data.
- Unit checks for absent/blank contact configuration, valid overrides, phone normalisation, rejection of malicious/lookalike URLs, and a twelve-project sitemap when a real origin is configured.
- Keyboard-operated skill disclosures, animated role changes, project hover movement, and reduced-motion behaviour.
- Client validation, field-specific errors, consent, server validation, draft preparation, real clipboard copy, and dialog controls.
- Provider error and acceptance UI states using explicitly intercepted test responses, not actual email delivery.
- Axe WCAG A/AA checks for the homepage, an enquiry-result dialog, the original featured project, all seven new case pages, and privacy at all three sizes.
- No-JavaScript checks at all three sizes: all twelve cards and main content remain visible; a new case page opens; direct email, LinkedIn, and WhatsApp links remain available; the interactive enquiry form is hidden.
- A deliberately delayed internal navigation confirms that branded loading feedback appears only while navigation is pending, without replacing the current page.

## Visual review and fixes

The seven additions have distinct, responsive studies rather than inheriting Avion's preview. Unknown slugs now receive a neutral fallback. MicroCredible has a full-width featured presentation; the other projects retain the large two-column desktop/stacked-mobile treatment. Normal-card actions align at the bottom despite differing text lengths.

Low-contrast labels in the light preview themes and the small-screen jewellery headline were darkened; the final axe matrix passes without disabling rules. The miniature CV layout was tightened so its print label is not clipped at tablet widths. The image-loading test now scrolls each lazy image into view before checking it, rather than expecting off-screen images on a much longer mobile page to load immediately.

The existing progressive-enhancement fix is retained: there is no root loading boundary hiding server-rendered content, and scroll reveals enhance already-visible content. Page-link feedback uses `useLinkStatus`.

Visual inspection used viewport captures of the hero, sections, contact form, all seven new cards, and their case-page headers/previews. Captures live in ignored `.cache/screenshots/`; the helper avoids extremely tall headless screenshot surfaces that can repeat tiles above a GPU texture limit. Browser tests and captures are run sequentially so fresh-workspace Chromium extraction does not race.

## External content verification

Eleven of the twelve owner-supplied homepages were retrieved successfully. MicroCredible's catalogue/learning/interview entry points and Noor CV Builder's builder page were also read. The public ProspectAI Studio, Avion, and Physical AI & Humanoid Robotics sources were inspected. LinkedIn and WhatsApp were supplied directly by the owner; the previously public email is retained.

**SEO Pilot is the exception:** both homepage retrieval attempts returned HTTP 500 to the review tool. Deployment metadata confirms Vite, but neither the application nor its private source could be inspected. The project remains included with its supplied destination and a visible verification caveat, not invented capabilities. A tool retrieval failure is not represented as proof that every visitor will see an offline site.

This review does **not** claim end-to-end testing of external storefront payments/orders, live AI providers or retrieval quality, inaccessible private source, or CV printing. See [project research](PROJECT-RESEARCH.md) and [asset provenance](ASSETS.md) for the evidence and exact scope of each description.

## Remaining launch configuration and limits

1. Set `NEXT_PUBLIC_SITE_URL` to the real portfolio production origin before building for public release. Without it, no canonical/sitemap domain is invented; Next.js warns that its social-image URL uses the local development origin.
2. The default enquiry flow prepares an email draft; visitors still need to send it in their email app. Direct delivery needs a verified sender, the server-only provider key, and a consented live delivery test. No credentials were supplied and live delivery has not been tested.
3. The contact rate limiter is process-local, not distributed abuse protection. Apply host/edge protection for a scaled public deployment. A clean preview process is started after browser tests so their submissions do not consume a visitor's local test allowance.
4. Recheck SEO Pilot before promoting it as a verified live demo or adding a feature walkthrough.
5. Browser automation used Chromium. No claim is made of physical-device testing, Safari/Firefox coverage, or a complete manual assistive-technology audit.

This local review did not deploy the portfolio or change cloud configuration. The update is prepared on `arena/bf606b97-syedanoorulainfatima` for pull-request review; the earlier five-project implementation was already merged in PR #1. Repository publishing is separate from the local verification recorded above.
