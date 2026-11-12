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

## Fonts and icons

- Manrope variable Latin subset, locally served via `next/font/local`. SIL Open Font License included at `src/assets/fonts/MANROPE-LICENSE.txt`.
- Space Grotesk variable Latin subset, locally served via `next/font/local`. SIL Open Font License included at `src/assets/fonts/SPACE-GROTESK-LICENSE.txt`.
- Technology brand paths in `src/lib/brand-icons.ts` are extracted from **Simple Icons**, distributed under CC0. Brand trademarks remain the property of their owners; use indicates technology identification, not endorsement.
- Interface icons use **Lucide**, ISC licensed. GitHub uses the Simple Icons path; the small LinkedIn placeholder icon is an elementary line drawing.

There are no remote font requests, stock portraits, fake client logos, or third-party image hotlinks.
