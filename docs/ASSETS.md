# Asset provenance

## Original portfolio imagery

- `public/images/intelligence-knot.webp`: AI-generated titanium/ribbon sculpture, created for this portfolio. Decorative connected-systems visual, not a portrait or a claim about a physical product. Optimised to approximately 80 KB.
- `public/images/projects/fragrance-art.webp`: AI-generated fragrance-inspired editorial artwork. Not an actual product photograph or a screenshot. Labelled as artwork in the card and disclosed on the project detail page.
- `public/images/projects/jewelry-art.webp`: AI-generated jewelry-inspired editorial artwork. Not an actual catalogue photograph or screenshot. Labelled/disclosed similarly.
- `src/app/opengraph-image.png`: custom social-preview composition using the portfolio sculpture and brand typography.
- `src/app/icon.svg` and `src/app/apple-icon.png`: original simple “n.” monogram.

Source PNG generation intermediates were converted to WebP and removed. No large generated originals are retained in Git.

## Assets from the user's public projects

- `public/images/projects/prospect-world.svg`: <https://github.com/SyedaFatimaNoor/ProspectAIStudio/blob/main/public/world.svg>. Reused to present the user's requested project.
- `public/images/projects/avion-chair.webp`: optimised from `public/images/Right Image.png` in <https://github.com/SyedaFatimaNoor/hackathone3_marketplace>. Reused within a labelled interface study of the requested Avion project.

All browser previews are hand-built HTML/CSS **interface studies**, not screenshots. Their previews intentionally contain no fabricated personal achievements, traffic, revenue, leads, or performance metrics.

## Additional project studies

`src/components/project-studies.tsx` and its CSS module provide seven distinct, locally rendered illustrations. No new image downloads, external embeds, image-generation calls, or dependencies were needed.

- **MicroCredible:** an editorial practice workspace using challenge topics observed on the public catalogue. No issued credential or assessment score is depicted.
- **Jewels of Joy:** original SVG jewellery/pearl line art and a warm editorial layout. Not a photograph of actual catalogue products.
- **Noor's Collection:** original CSS textile folds and an SVG motif, using the public boutique name and “Elegance Redefined” headline. Not a product photograph.
- **NKR Agent:** an original URL-entry/review-scope study. No fabricated audit report, score, ranking, or client data.
- **Physical AI & Humanoid Robotics:** an original technical schematic and textbook layout. Not physical hardware, a live robot deployment, or generated chatbot output.
- **SEO Pilot:** a typographic project marker only. No unverified product UI or feature is represented.
- **Noor CV Builder:** a document-layout study using explicit name/role placeholders and neutral text lines. No invented employment or qualifications.

Studies are decorative and hidden from screen readers; their surrounding project links have descriptive accessible names. They contain no focusable faux controls. Each case page has a readable provenance disclosure. Unknown preview slugs use a neutral fallback, never another project's artwork.

## Fonts and icons

- Manrope variable Latin subset, locally served via `next/font/local`. SIL Open Font License included at `src/assets/fonts/MANROPE-LICENSE.txt`.
- Space Grotesk variable Latin subset, locally served via `next/font/local`. SIL Open Font License included at `src/assets/fonts/SPACE-GROTESK-LICENSE.txt`.
- Technology brand paths in `src/lib/brand-icons.ts` are extracted from **Simple Icons**, distributed under CC0. Brand trademarks remain the property of their owners; use indicates technology identification, not endorsement.
- Interface icons use **Lucide**, ISC licensed. GitHub uses the Simple Icons path; the small LinkedIn icon is an elementary line drawing.

There are no remote font requests, stock portraits, fake client logos, or third-party image hotlinks.
