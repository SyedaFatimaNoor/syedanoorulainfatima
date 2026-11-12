# Noor — Full-Stack Developer & AI Engineer

A complete, responsive personal portfolio for **Syeda Noor ul Ain Fatima**, professionally presented as **Syeda Noor Fatima / Noor**. Built with Next.js App Router, React, strict TypeScript, Tailwind CSS, Framer Motion, and Lucide.

The visual direction pairs a near-black editorial layout with locally served typography, a metallic connected-systems sculpture, restrained blue/violet accents, and large project presentations. No experience figures, employment history, testimonials, proficiency percentages, or client outcomes have been invented.

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
- Responsive desktop/tablet/mobile layouts; local variable fonts; optimised local imagery.
- Three rotating professional roles; subtle reveal and preview motion; reduced-motion support.
- Active section navigation, keyboard-accessible mobile modal menu, skip link, visible focus, and back-to-top.
- All five supplied projects, working demo URLs, two verified public source links, category filters, and independently shareable detail pages.
- Native, keyboard-operable skill disclosures explaining how each category is applied.
- Validated enquiry form, real email drafts, copy controls, accessible result dialogs, and optional server-side email delivery.
- Honest missing-contact placeholders, a privacy page, metadata, JSON-LD, social image, icons, robots, optional canonical URLs and sitemap, branded navigation-loading feedback, error, and 404 states.
- Server-rendered content that stays visible without JavaScript; animation is an enhancement, not a prerequisite for reading the work.
- Unit/API tests, responsive browser tests, automated axe accessibility checks, and a quality-check workflow.

## Content and contact configuration

The name, verified public email, and source profile are in `src/lib/site.ts`. Project descriptions, verified technology tags, public repository links, scope limitations, and visual disclosures live in `src/lib/projects.ts`.

Copy `.env.example` to `.env.local` only if configuration is needed. Do not commit live credentials.

| Variable                      | Purpose                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Actual production HTTPS origin. Enables canonical URLs and a real sitemap. Omitted until a real domain is supplied. |
| `NEXT_PUBLIC_LINKEDIN_URL`    | Your confirmed `https://www.linkedin.com/in/...` profile. Otherwise displayed as “Profile to be added”.             |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Confirmed international number, including country code. Otherwise displayed as “Number to be added”.                |
| `RESEND_API_KEY`              | Optional server-only email provider credential.                                                                     |
| `CONTACT_FROM_EMAIL`          | Optional sender on a domain verified in Resend. Required together with the key.                                     |
| `CONTACT_TO_EMAIL`            | Optional server-only recipient override; defaults to the public email verified from your GitHub profile.            |

**Rebuild/redeploy after configuration changes.** Homepage and privacy copy are pre-rendered from the build environment, including whether direct email delivery is configured.

### Contact behaviour: no fabricated success

With no email provider configured, the form:

1. Validates fields in the browser and on the server.
2. Prepares a correctly encoded email draft to `syedanoorfatima610@gmail.com`.
3. Opens a dialog explicitly stating that **nothing has been sent**.
4. Lets the visitor open their email app or copy the full enquiry. They must send the message themselves.

There is no enquiry database and no silent “success” state. Copy failure offers a selectable text fallback. Without JavaScript, direct email and project links still work, while the interactive form is hidden to avoid an accidental GET submission containing personal details.

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

All five supplied sites were inspected. ProspectAI Studio and the deployment-linked Avion repository were also inspected. The other project repositories are private and were inaccessible to the configured GitHub integration; descriptions are deliberately limited to the deployed interfaces and confirmed technologies.

Project previews are **labelled interface studies or AI-generated project artwork**, not fabricated screenshots, real leads, or product photographs. Each detail page explains the preview and the scope of verification. See [project research](docs/PROJECT-RESEARCH.md) and [asset provenance](docs/ASSETS.md).

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

Browser tests run at **1440 × 1000**, **768 × 1024**, and **390 × 844**, with an additional width sweep from **320 to 1920px**. They check navigation, focus trapping, reduced-motion rendering, filtering, disclosures, validation, real draft preparation, clipboard behaviour, provider UI states, all project routes, privacy, not-found behaviour, image loading, horizontal overflow, browser errors, and WCAG A/AA rules through axe. No-JavaScript rendering and pending-navigation feedback are also tested at all three sizes. Automated tests do not replace human assistive-technology testing.

The completed production-build run passed **18 unit/API tests and 29 browser tests**, with zero reported dependency vulnerabilities. See the [quality review](docs/QUALITY-REVIEW.md) for the exact checks, intentional duplicate-test skips, verification boundaries, and launch configuration. `npm run capture` saves viewport-sized hero, section, and form images to ignored `.cache/screenshots/` for visual review.

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
- `/privacy`
- `POST /api/contact`
- `/robots.txt`, `/sitemap.xml`

## Before a public launch

1. Confirm the displayed name and public email.
2. Supply your real LinkedIn and WhatsApp details if you want those channels enabled.
3. Set the actual production origin and redeploy; an empty origin deliberately produces no invented sitemap URLs.
4. Keep the default draft flow, or configure and test a verified email sender.
5. Review the privacy note for the actual host, mailbox, jurisdiction, and retention practices.
6. Configure distributed rate limiting/edge abuse protection where appropriate.
7. Confirm external project destinations again, since other deployments can change independently.

The app is deployment-ready for a Next.js-compatible Node host or Vercel. No production deployment, domain purchase, repository push, or change to your existing cloud projects was performed as part of this build.
