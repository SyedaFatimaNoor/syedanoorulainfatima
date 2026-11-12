# Noor — Full-Stack Developer & AI Engineer

A complete, responsive personal portfolio for **Syeda Noor ul Ain Fatima**, using the owner-confirmed full name for public credits and metadata and **Noor** as the compact wordmark. Built with Next.js App Router, React, strict TypeScript, Tailwind CSS, Framer Motion, and Lucide.

The visual direction pairs a near-black editorial layout with **the owner’s selected hijab portrait**, locally served typography, restrained blue/violet accents, and large project presentations. The latest owner-supplied image is used as provided, with only resizing and WebP optimisation; no additional facial retouching or generation is applied. No experience figures, employment history, testimonials, proficiency percentages, or client outcomes have been invented.

## Run locally

Requires **Node.js 22.17+** and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The server binds to `0.0.0.0` and permits Arena's `*.e2b.app` preview hosts. All browser API requests are same-origin relative requests. No database, paid service, or credentials are required to run the portfolio.

```bash
npm run build
npm start
```

Stop the development server before building: development and production share the `.next` directory. Do not run them against it at the same time.

## What's implemented

- Complete hero, about, five-category skills, featured work, six services, five-step process, and contact sections.
- A prominent owner-selected portrait, larger editorial typography, a product-thinking About panel, numbered project presentations, readable skill chips, a two-column services layout, and a responsive process timeline.
- Responsive desktop/tablet/mobile layouts; local variable fonts; optimised local imagery. The mobile hero puts the portrait immediately after the main actions, and the contact form uses full-width mobile fields.
- Three rotating professional roles; subtle reveal and preview motion; reduced-motion support.
- Active section navigation, keyboard-accessible mobile modal menu, skip link, visible focus, and back-to-top.
- All twelve supplied projects, distinct large presentations, three verified public source links, category filters, and independently shareable detail pages. SEO Pilot retains its supplied URL with an explicit unverified-demo notice.
- Native, keyboard-operable skill disclosures explaining how each category is applied.
- Validated enquiry form, real email drafts, copy controls, accessible result dialogs, and optional server-side email delivery.
- Owner-confirmed LinkedIn and WhatsApp links work without setup, alongside the public email and GitHub profile. Includes privacy, metadata, JSON-LD, social imagery, icons, robots, optional canonical URLs and sitemap, branded navigation-loading feedback, error, and 404 states.
- Server-rendered content that stays visible without JavaScript; animation is an enhancement, not a prerequisite for reading the work.
- Unit/API tests, responsive browser tests, automated axe accessibility checks, and a quality-check workflow.

## Portrait and visual assets

`public/images/noor-portrait.webp` is the latest owner-selected portrait (`image-4.png`), optimised to 960 × 1440 and approximately 94 KB. Its transparent background is preserved. The stable 8:9 hero frame uses a top-aligned upper-body crop, keeping the face, hijab, and hand visible without stretching. The full optimised image is retained; raw uploads are not published in Git. See [asset provenance](docs/ASSETS.md) for the integration details.

The hero and About panel use scoped styles in `src/components/hero.module.css` and `src/components/about.module.css`; the shared design system and other section styles remain in `src/app/globals.css`. Retired sculpture and code-window styling was removed rather than layered beneath overrides.

The social card uses the same selected portrait. To regenerate it after an asset or composition change:

```bash
npm run generate:social
```

The local Chromium composition script uses the existing test tooling and local fonts. No new runtime dependencies or external image requests are needed. Run browser tasks sequentially on a fresh workspace.

## Content and contact configuration

The name, public email, GitHub profile, and owner-confirmed contact channels are in `src/lib/site.ts`. LinkedIn defaults to <https://www.linkedin.com/in/syeda-noor-ul-ain-fatima-b146032ba/> (without tracking parameters); WhatsApp displays **+92 339 1451101** and opens <https://wa.me/923391451101>. Unset or previously blank environment variables use these defaults.

Project descriptions, technology evidence, public source links, scope limitations, and visual disclosures live in `src/lib/projects.ts` and `src/lib/additional-projects.ts`. Featured layouts and verification notices are data-driven. A pending review deliberately omits unverified case-study sections.

Copy `.env.example` to `.env.local` only if configuration is needed. Do not commit live credentials.

| Variable                      | Purpose                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`        | Actual production HTTPS origin. Enables canonical URLs and a real sitemap. Omitted until a real domain is supplied.            |
| `NEXT_PUBLIC_LINKEDIN_URL`    | Optional HTTPS LinkedIn profile override. Unset/blank uses the owner-confirmed profile; invalid nonempty values stay unlinked. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional international-number override. Unset/blank uses `923391451101`; invalid nonempty values stay unlinked.                |
| `RESEND_API_KEY`              | Optional server-only email provider credential.                                                                                |
| `CONTACT_FROM_EMAIL`          | Optional sender on a domain verified in Resend. Required together with the key.                                                |
| `CONTACT_TO_EMAIL`            | Optional server-only recipient override; defaults to the public email verified from your GitHub profile.                       |

**Rebuild/redeploy after configuration changes.** Homepage and privacy copy are pre-rendered from the build environment, including whether direct email delivery is configured.

### Contact behaviour: no fabricated success

With no email provider configured, the form:

1. Validates fields in the browser and on the server.
2. Prepares a correctly encoded email draft to `syedanoorfatima610@gmail.com`.
3. Opens a dialog explicitly stating that **nothing has been sent**.
4. Lets the visitor open their email app or copy the full enquiry. They must send the message themselves.

There is no enquiry database and no silent “success” state. Copy failure offers a selectable text fallback. Without JavaScript, direct email, LinkedIn, WhatsApp, and project links still work, while the interactive form is hidden to avoid an accidental GET submission containing personal details.

With both email-provider variables configured, the server sends a plain-text email through Resend, with the visitor as `reply_to` and the recipient controlled by the server. Only a successful provider response with an ID returns “accepted”. Provider errors preserve the form and offer direct email. Acceptance is not represented as guaranteed inbox delivery.

**Live provider delivery has not been exercised:** no email credentials were supplied and the workspace's network policy blocks that provider. Provider acceptance/failure/timeout behaviour is tested with explicitly mocked HTTP responses. Configure a verified sender and perform a real, consented delivery test before enabling this mode in production.

### Form safeguards

- Strict Zod validation, including required consent, maximum lengths, allowed service/budget options, and email-header control-character checks.
- JSON-only, same-origin browser submissions; cross-site requests are rejected.
- A 16 KiB streamed body limit and a honeypot.
- A bounded, short-lived, per-process rate limiter; raw IPs and enquiry contents are never written to application logs.
- Vercel's trusted forwarded-IP header is used only when running on Vercel. Other hosts deliberately use a shared local bucket rather than trusting user-supplied proxy headers.
- The limiter is **not distributed**. Configure host-level or edge abuse protection for a scaled public deployment.
- No browser-exposed email credentials, third-party font calls, analytics, advertising cookies, or tracking pixels in the application.

## Project honesty

The original five and seven additional owner-supplied destinations were reviewed: eleven homepages were readable. **SEO Pilot returned HTTP 500 to the page-review tool on both attempts.** Its deployment metadata confirms Vite, but its UI and private source could not be inspected. It is included with a clear “Demo not verified” label and no invented feature walkthrough. This does not assert that every visitor will see the same retrieval error.

ProspectAI Studio, Avion, and Physical AI & Humanoid Robotics have verified public repository mappings. The other sources were private/inaccessible or had no confirmed public mapping, so they are not linked as public code. Stack tags distinguish confirmed frameworks/dependencies from untested integrations; marketing numbers and claims are not adopted as personal achievements.

Project previews are **labelled interface studies, original vector compositions, or disclosed AI-generated artwork**, not fabricated screenshots, real leads, or product photographs. SEO Pilot uses a typographic marker rather than unverified UI. Each detail page explains the preview and the scope of verification. See [project research](docs/PROJECT-RESEARCH.md) and [asset provenance](docs/ASSETS.md).

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run format:check
npm audit
```

Browser tests run at **1440 × 1000**, **768 × 1024**, and **390 × 844**, with an additional width sweep from **320 to 1920px**. They check navigation, focus trapping, reduced-motion rendering, filtering, disclosures, validation, real draft preparation, clipboard behaviour, provider UI states, all project routes, privacy, not-found behaviour, image loading, horizontal overflow, browser errors, and WCAG A/AA rules through axe. All twelve project routes participate in the width sweep. Confirmed contact targets, the selected portrait’s local loading, intrinsic dimensions, and top-aligned framing, keyboard-operated hero actions, distinct previews, all-case accessibility, verification notices, no-JavaScript rendering, and pending-navigation feedback are also tested at all three primary sizes. Automated tests do not replace human assistive-technology testing.

See the [quality review](docs/QUALITY-REVIEW.md) for the completed production-build checks, intentional duplicate-test skips, verification boundaries, and launch configuration. `npm run capture` saves viewport-sized hero, portrait, section, form, and all-project card/case/preview images to ignored `.cache/screenshots/` for visual review. Run browser tests and capture sequentially on a fresh workspace so they do not extract the bundled Chromium binary at the same time.

To test an already-running production build:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

Linux x64 browser tests use npm-distributed Chromium and its bundled libraries because the normal browser CDN is blocked in this workspace. Web security remains enabled. The helper extracts libraries into ignored `.cache/`; generated reports are ignored too. On other operating systems, run `npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an installed compatible browser. Use a clean local server for a repeatable full suite; valid enquiry tests exercise the real rate limiter.

A patched `minimatch` version is scoped to the TypeScript ESLint parser through `overrides`, avoiding the vulnerable transitive tooling version without changing the runtime application.

## Routes

- `/`
- `/projects/prospectai-studio`
- `/projects/pinease`
- `/projects/essence-of-dream`
- `/projects/fashion-jewelry`
- `/projects/avion`
- `/projects/micro-credible`
- `/projects/jewels-of-joy`
- `/projects/nr-collection`
- `/projects/nkr-agent`
- `/projects/physical-ai-humanoid-robotics`
- `/projects/seo-pilot`
- `/projects/noor-cv-builder`
- `/privacy`
- `POST /api/contact`
- `/robots.txt`, `/sitemap.xml`

## Before a public launch

1. Confirm the displayed name and public email.
2. Review the confirmed contact details; no LinkedIn/WhatsApp setup is required. If changing public contact overrides, rebuild.
3. Set the actual production origin and redeploy; an empty origin deliberately produces no invented sitemap URLs.
4. Keep the default draft flow, or configure and test a verified email sender.
5. Review the privacy note for the actual host, mailbox, jurisdiction, and retention practices.
6. Configure distributed rate limiting/edge abuse protection where appropriate.
7. Confirm external project destinations again, especially SEO Pilot, since other deployments can change independently. Update its pending-review note only after verification.

The app can run on a Next.js-compatible Node host or Vercel. This UI/portrait update does not deploy, merge, buy a domain, or change any existing cloud project. Work stays on the current Arena branch until a repository publishing action is requested.
