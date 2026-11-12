export type ProjectCategory = "AI & systems" | "Web experiences";

export interface Project {
  slug: string;
  name: string;
  kind: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  approach: string;
  technologies: string[];
  capabilities: { title: string; description: string }[];
  liveUrl: string;
  githubUrl?: string;
  sourceNote: string;
  previewNote: string;
}

// Descriptions are grounded in the live pages and accessible source reviewed on 12 November 2026.
// See docs/PROJECT-RESEARCH.md for evidence, scope and intentionally excluded claims.
export const projects: Project[] = [
  {
    slug: "prospectai-studio",
    name: "ProspectAI Studio",
    kind: "Evidence-first business discovery",
    category: "AI & systems",
    description:
      "A connected workspace for business research, evidence review, website concepts, and human-reviewed outreach drafts.",
    problem:
      "Business research becomes fragmented across listings, notes, and outreach tools. Missing information can also be mistaken for verified facts.",
    approach:
      "Bring discovery, verification, concept development, and outreach preparation into one workspace, while keeping sources, uncertainty, and human review visible.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Ollama (optional)",
    ],
    capabilities: [
      {
        title: "Research with context",
        description:
          "Source-linked business records, lead filtering, provenance, and separate assessments for business activity and website presence.",
      },
      {
        title: "A practical website studio",
        description:
          "Editable website concepts with revision history and Markdown exports. Optional model-backed drafting complements the fact-based workflow.",
      },
      {
        title: "Human-reviewed outreach",
        description:
          "Editable drafts, explicit approval, suppression records, and exports. This release prepares outreach; it does not send messages.",
      },
    ],
    liveUrl: "https://prospectaistudio.vercel.app/",
    githubUrl: "https://github.com/SyedaFatimaNoor/ProspectAIStudio",
    sourceNote:
      "Verified against the live product and public repository. Persistent workflows require sign-in and configuration. Live discovery depends on a permitted source and worker; the repository documents provider restrictions. AI is optional, and outreach is draft-only.",
    previewNote:
      "An interface study based on the live landing page, using the project's original world-map asset. Not a screenshot or a display of real leads.",
  },
  {
    slug: "pinease",
    name: "Pinease",
    kind: "Digital agency web experience",
    category: "Web experiences",
    description:
      "A multi-page digital agency website that brings services, portfolio content, pricing, and enquiries into one brand experience.",
    problem:
      "A service business needs a clear way to explain its offering and guide visitors from exploration to a project conversation.",
    approach:
      "Organise the agency's service information, process, portfolio, and editorial content around clear enquiry paths and a cohesive visual identity.",
    technologies: ["Next.js", "React"],
    capabilities: [
      {
        title: "Service discovery",
        description:
          "Public pages introduce website design, e-commerce, SEO, and accessibility-related services.",
      },
      {
        title: "A cohesive brand presence",
        description:
          "The homepage connects services, the agency's process, pricing information, and its editorial journal.",
      },
      {
        title: "Clear enquiry paths",
        description:
          "Dedicated portfolio and contact links help visitors explore the offering and start a project conversation.",
      },
    ],
    liveUrl: "https://pinease.vercel.app/",
    sourceNote:
      "Reviewed on the live website. Next.js is confirmed by the deployed application; React is its UI framework. The source repository is private and was not accessible for inspection, so no additional stack, compliance certification, or business results are claimed here.",
    previewNote:
      "An editorial interface study using the live site's brand name and headline. It is not a screenshot of the deployed website.",
  },
  {
    slug: "essence-of-dream",
    name: "Essence of Dream",
    kind: "Luxury fragrance storefront",
    category: "Web experiences",
    description:
      "A fragrance storefront balancing product discovery, scent storytelling, and a carefully composed brand experience.",
    problem:
      "Online fragrance shoppers need useful product context and a clear route into a collection they cannot experience in person.",
    approach:
      "Present individual fragrances alongside scent descriptions, collection links, and visual brand storytelling, making the catalogue easier to explore.",
    technologies: ["Next.js", "React"],
    capabilities: [
      {
        title: "Collection-led discovery",
        description:
          "A shop entry point and dedicated fragrance pages organise the available collection.",
      },
      {
        title: "Useful product context",
        description:
          "The public homepage introduces Mocha Muse, Mishqat, and Majestic Aroma with fragrance descriptions and starting prices.",
      },
      {
        title: "Brand storytelling",
        description:
          "An about page and visual diary introduce the brand's perfume-focused identity.",
      },
    ],
    liveUrl: "https://essence-of-dream.vercel.app/",
    sourceNote:
      "Reviewed on the live website. Next.js and React are confirmed by the rendered application. The private source was not accessible. No checkout, payment, fulfilment, or sales-performance claim is made.",
    previewNote:
      "AI-generated, fragrance-inspired project artwork with a headline drawn from the live site. Not a product photograph or a screenshot of the deployed storefront.",
  },
  {
    slug: "fashion-jewelry",
    name: "Fashion Jewelry",
    kind: "Fashion & accessories storefront",
    category: "Web experiences",
    description:
      "A product-led shopping interface for jewelry and nail accessories, with category browsing and detailed product presentation.",
    problem:
      "A mixed accessories catalogue needs clear categories and strong product presentation so visitors can find relevant items.",
    approach:
      "Use collection entry points, product grids, and individual product links to connect visual browsing with more detailed discovery.",
    technologies: ["Next.js", "React", "Sanity"],
    capabilities: [
      {
        title: "Category-led browsing",
        description:
          "The public storefront separates jewelry and nail products into collection areas.",
      },
      {
        title: "Product presentation",
        description:
          "Product grids show names, images, and prices, with links to individual product pages.",
      },
      {
        title: "Merchandising sections",
        description:
          "Top picks and a trending-products section provide additional ways to explore the catalogue.",
      },
    ],
    liveUrl: "https://fashion-jewelry-gamma.vercel.app/",
    sourceNote:
      "Reviewed on the live storefront. Next.js and React are visible in the application; product images are served through Sanity's image CDN. The private repository was not accessible. Payment, authentication, and order-processing behaviour were not verified.",
    previewNote:
      "AI-generated, jewelry-inspired project artwork using the live storefront's headline. Not a photograph of an actual catalogue item or a deployed-site screenshot.",
  },
  {
    slug: "avion",
    name: "Avion ETA",
    kind: "Furniture & homeware experience",
    category: "Web experiences",
    description:
      "A furniture and homeware storefront with a calm visual language, collection pages, and content-managed product browsing.",
    problem:
      "Furniture shoppers need to move naturally between lifestyle inspiration, collections, and individual pieces.",
    approach:
      "Combine a restrained, image-led homepage with dedicated collection and category routes, backed by a component-based storefront.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity"],
    capabilities: [
      {
        title: "Collection-first navigation",
        description:
          "The homepage connects visitors to product listings and category pages.",
      },
      {
        title: "Image-led storytelling",
        description:
          "Furniture and homeware imagery introduces the catalogue alongside brand and material-focused content.",
      },
      {
        title: "A reusable storefront",
        description:
          "The public repository contains shared category-page components and a Sanity-backed product structure.",
      },
    ],
    liveUrl: "https://avion-eta.vercel.app/",
    githubUrl: "https://github.com/SyedaFatimaNoor/hackathone3_marketplace",
    sourceNote:
      "Reviewed against the live site and its deployment-linked public repository, hackathone3_marketplace. Technologies are confirmed in package.json. Installed payment or authentication packages are not treated as proof of working integrations.",
    previewNote:
      "An interface study using the original chair image from the public project repository and text from the deployed homepage. Not a screenshot.",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
