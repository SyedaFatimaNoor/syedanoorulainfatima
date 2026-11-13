# Portfolio quality review

## Owner-confirmed name correction

Reviewed on **12 November 2026**, against the optimised production build on **`arena/978657ff-syedanoorulainfatima`**, based on the merged UI/portrait work from PR #3.

- **Syeda Noor ul Ain Fatima** is now the canonical name. Hero and About copy, footer credits, home-link accessible names, page titles, author/SEO/social metadata, portrait descriptions, privacy copy, and the enquiry-draft greeting use the full name. The compact **Noor** wordmark is retained; Person structured data uses it as the alternate name rather than repeating the full name.
- Regenerated the **1200 × 630** social image with the full name and the unchanged selected portrait. The generator now also writes its matching accessible description, preventing the bitmap and alt text from drifting apart.
- Added wrapping safeguards for the longer portrait caption. Browser regression checks verify the exact spelling, structured data, privacy wording, unchanged contact destinations, and caption fit across the extra-width sweep.
- Re-ran TypeScript, ESLint, formatting, **23 unit/API tests**, the production build (**22 generated pages**), **68 passing browser tests / 4 intentional duplicate skips**, and **39 route/viewport capture checks**. No browser errors or horizontal document overflow were detected. The same browser/environment limits described below still apply.
- Visually reviewed the regenerated social card, desktop/tablet/mobile portrait captions, and footer credits, including the narrow 320px layout. Captures are local verification artefacts, ignored under `.cache/` rather than committed.
- The selected portrait file, all twelve project records, external profile/contact destinations, and dependencies are unchanged. Research documentation preserves the originally observed abbreviated GitHub display name as a historical source fact, not the portfolio’s current identity.

This review records local verification of the correction, before repository publication. Pull-request publishing, merging, and production-deployment checks are separate operations; no merge or cloud configuration change is part of this review. The preview was restarted after tests to clear test-only rate-limit state. The production-origin and automatic-email configuration limits below are unchanged.

## Previous UI and portrait review

The following records the earlier UI/portrait pass, subsequently merged through PR #3. Its branch and test totals are historical.

Reviewed on **12 November 2026**, against the optimised production build of **`arena/fb8e6174-syedanoorulainfatima`**. This pass refreshes the UI and integrates the owner’s selected hijab portrait. It preserves the twelve-project portfolio, verified source mappings, confirmed contact details, and enquiry behaviour already merged in PR #2. The local preview runs this build with `npm start` on port 3000.

## Executed checks

| Check                                                                     | Result                                                                                                                                                         |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript (`npm run typecheck`)                                          | Passed                                                                                                                                                         |
| ESLint (`npm run lint`)                                                   | Passed                                                                                                                                                         |
| Unit and contact-API tests (`npm test`)                                   | **22 passed**                                                                                                                                                  |
| Production build (`npm run build`)                                        | Passed; **22 generated pages**, including all twelve project pages                                                                                             |
| Playwright (`PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`) | **68 passed, 4 intentionally skipped** duplicate matrix entries; 72 configured tests                                                                           |
| Formatting (`npm run format:check`)                                       | Passed                                                                                                                                                         |
| Dependency audit (`npm audit`)                                            | **0 reported vulnerabilities**                                                                                                                                 |
| Visual capture (`npm run capture`)                                        | **39 route/viewport checks**: homepage and all twelve case pages at three primary sizes; no horizontal overflow, duplicate main/H1 elements, or browser errors |
| Social image (`npm run generate:social`)                                  | Generated and visually reviewed the 1200 × 630 composition using the selected portrait and local fonts                                                         |

The four skipped entries are the tablet/mobile repetitions of the desktop-only extra-width sweep and non-reduced-motion test. Those checks ran and passed once. Portrait, keyboard CTA, contact, route, filtering, accessibility, no-JavaScript, and pending-navigation checks ran at all three primary sizes. The production browser suite and capture ran sequentially and both completed with exit code 0.

## UI and portrait review

- Replaced the abstract hero sculpture with an owner-supplied portrait. Following the owner’s “use this” request, the **fourth upload (`image-4.png`) is now used in both the hero and social card**, replacing the earlier third-photo edit. This new portrait is only resized and WebP-optimised; no further facial edits, colour correction, or generation were applied.
- The transparent **960 × 1440 WebP is approximately 94 KB**. Static image dimensions and the existing 8:9 frame reserve layout space. A top-aligned `object-fit: cover` crop keeps the face, hijab, and hand visible while the lower jacket extends beyond the frame. The full optimised source is retained. Browser tests verify dimensions, top alignment, loading, and descriptive alt text; viewport captures check the crop visually.
- The tablet hero keeps a compact side-by-side layout. On small screens, the portrait follows the headline and main actions instead of being pushed below the introduction and social links. Keyboard order of the links is unchanged.
- Reworked the hero typography, buttons, neutral portrait frame, location caption, social links, and shared spacing. The revised social card uses the same selected portrait, not the former sculpture.
- Replaced the decorative code window with an About panel connecting frontend experience, backend foundations, and practical AI. Removed the unused hero/code-window CSS and sculpture asset instead of accumulating overrides beneath the new design.
- Improved skill-chip, project, service, process, and form legibility. Projects use stable editorial numbering and larger presentations; normal cards keep concise summaries, while their complete purpose/approach narratives remain on the detail routes. Featured builds retain purpose context on the homepage.
- Services use a readable two-column desktop/tablet layout; the process becomes a vertical timeline on tablet/mobile. Contact fields stack on mobile and retain 16px input text. All sections and functional interactions remain available.
- Existing preview disclosures, SEO Pilot’s unverified notice, light-preview contrast fixes, and the small-screen CV layout are retained.

Visual inspection used viewport-sized captures of the hero and portrait, all homepage sections, the form, and representative original/additional project cards and case pages across desktop, tablet, and mobile. Extra hero captures at 320px and 850px were also inspected. All twelve projects participate in the automated route/capture matrix. Captures are ignored under `.cache/screenshots/`; no large screenshot collections or raw portrait uploads are published in Git.

## Responsive and interaction coverage

- **Desktop:** 1440 × 1000; **tablet:** 768 × 1024; **mobile:** 390 × 844.
- Additional overflow sweep at **320, 360, 428, 600, 820, 850, 1024, 1280, and 1920 pixels**, on the homepage **and all twelve case pages**.
- Selected portrait loading from the same origin, intrinsic dimensions, top-aligned framing without stretching, meaningful alt text, caption, and absence of the old hero sculpture.
- Keyboard activation of both hero CTAs; section navigation and active states; mobile menu focus containment, Escape dismissal, focus restoration, and back-to-top.
- All twelve project cards and routes; category filtering (four AI/system projects and eight web experiences); privacy and 404 routes.
- Distinct preview identity, featured layouts, verified source mappings, exact supplied demo destinations, and the next-project cycle.
- SEO Pilot’s explicit unverified-demo notice, qualified external link, and intentional absence of unsupported narrative/capability sections.
- LinkedIn in the hero/contact section and Person data; WhatsApp showing **+92 339 1451101** with the correct `wa.me` destination; safe new-tab attributes; keyboard focus; no default contact placeholders.
- Unit checks for contact defaults, blank configuration, valid overrides, phone normalisation, malicious/lookalike URLs, and all twelve sitemap entries when an actual origin is configured.
- Keyboard-operated skill disclosures, rotating roles, project hover movement, and reduced-motion behaviour.
- Form validation, field-specific errors, consent, server validation, real draft preparation, clipboard copy, dialog controls, and focus restoration.
- Provider error/acceptance UI states using explicitly mocked responses, **not live email delivery**.
- Axe WCAG A/AA checks for the homepage, enquiry-result dialog, **all twelve case pages**, and privacy at each primary size, without disabling rules.
- No-JavaScript rendering: the selected portrait loads, all twelve cards and main content remain visible, case links open, and direct email/LinkedIn/WhatsApp stay available. The interactive form is hidden to prevent an accidental GET submission.
- Deliberately delayed internal navigation confirms that branded pending feedback appears without replacing already-visible content. The previous progressive-enhancement fix remains intact; no root loading boundary was reintroduced.

## Content verification boundaries

This is a UI/photo refresh, not a new claim about external project capabilities. The prior research remains in [project research](PROJECT-RESEARCH.md): eleven of the twelve supplied homepages were readable, and the public ProspectAI Studio, Avion, and Physical AI & Humanoid Robotics source mappings were inspected. LinkedIn and WhatsApp are owner-confirmed. Project data, source limitations, and supplied destinations are unchanged in this pass.

**SEO Pilot remains unverified:** both earlier homepage retrieval attempts returned HTTP 500 to the page-review tool. Deployment metadata confirms Vite, but the UI/private source could not be inspected. That retrieval failure is not represented as proof of a universal outage, and no features have been invented.

Local browser tests verify the portfolio’s routes and link targets. They do **not** certify external storefront payments/orders, live AI providers, retrieval quality, inaccessible private source, or CV printing. [Asset provenance](ASSETS.md) distinguishes the selected portrait from the labelled project studies and disclosed project artwork.

## Remaining launch configuration and limits

1. Set `NEXT_PUBLIC_SITE_URL` to the actual production origin before public release. Until supplied, no canonical/sitemap domain is invented; Next.js warns that social-image URLs use the local development origin. Person image metadata is also emitted only when an origin is configured.
2. The default form prepares an email draft, which the visitor must send. Automatic delivery still requires a verified sender, server-only provider configuration, and a consented live delivery test. No live credentials or delivery test were supplied for this pass.
3. The contact rate limiter is process-local. Configure host/edge protection for a scaled public deployment. A clean preview process is started after tests so test submissions do not consume a visitor’s local allowance.
4. Recheck SEO Pilot before promoting it as verified or adding a capability walkthrough.
5. Browser automation used Chromium, not physical devices. No claim is made of Safari/Firefox coverage or a complete manual assistive-technology audit.

This local verification introduced no new application dependencies, deployed no portfolio, and changed no cloud configuration. The UI/portrait changes are prepared on `arena/fb8e6174-syedanoorulainfatima` for pull-request review. Repository publishing is separate from the local checks recorded above; no merge is part of this review.
