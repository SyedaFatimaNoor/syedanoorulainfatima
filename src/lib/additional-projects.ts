import type { Project } from "./projects";

// Owner-supplied projects reviewed on 12 November 2026.
// Private-source boundaries and the unverified SEO Pilot demo are intentional.
export const additionalProjects: Project[] = [
  {
    slug: "micro-credible",
    name: "MicroCredible",
    kind: "Developer assessment & learning platform",
    category: "AI & systems",
    featured: true,
    description:
      "A developer learning platform with a practical challenge catalogue, an AI study-guide interface, and role-based mock-interview setup.",
    problem:
      "A list of skills says little about how someone applies them. Developers need focused ways to practise, explore a topic, and prepare for technical conversations.",
    approach:
      "Connect topic-based challenges, learning resources, and interview preparation in one experience, with clear entry points for each kind of practice.",
    technologies: ["Next.js", "React"],
    capabilities: [
      {
        title: "Practical challenge discovery",
        description:
          "A searchable catalogue introduces challenges such as React effects, REST API design, SQL joins, and Docker multi-stage builds, with difficulty labels and dedicated challenge links.",
      },
      {
        title: "A topic-led learning hub",
        description:
          "The Learning Hub provides an interface for requesting documentation and study guides around a chosen technical topic.",
      },
      {
        title: "Interview preparation",
        description:
          "A session setup screen offers target roles, technical or behavioural interview formats, system-design practice, and a voice-mode option.",
      },
    ],
    liveUrl: "https://micro-credible.vercel.app/",
    sourceNote:
      "Reviewed the public homepage, challenge catalogue, Learning Hub, and interview setup. Next.js is confirmed by deployment metadata. The source is private and was inaccessible. Live AI evaluation, badge integrity, account persistence, and hiring outcomes were not verified; the site's usage figures and testimonials are not adopted here.",
    previewNote:
      "An original editorial interface study using the project's name, observed challenge topics, and navigation concepts. Not a screenshot, a real assessment result, or an issued credential.",
  },
  {
    slug: "jewels-of-joy",
    name: "Jewels of Joy",
    kind: "Collection-led jewellery storefront",
    category: "Web experiences",
    description:
      "A jewellery storefront organised around collections, product categories, mood-led discovery, and a warm, gift-focused brand story.",
    problem:
      "A small accessories catalogue needs more than a product grid: visitors need ways to browse by style, occasion, and the kind of piece they have in mind.",
    approach:
      "Connect collection entry points, category filters, individual product pages, and editorial brand content into a cohesive shopping interface.",
    technologies: ["Next.js", "React"],
    capabilities: [
      {
        title: "Collection and mood discovery",
        description:
          "The homepage links to steel jewellery, pearls and beads, gifts and sets, and mood-led shop views such as everyday and party-ready pieces.",
      },
      {
        title: "Product-led exploration",
        description:
          "Product cards present names, prices, category labels, quick-add controls, and links to individual product pages.",
      },
      {
        title: "A cohesive boutique identity",
        description:
          "Story, gallery, styling, and collection sections give the product catalogue a consistent editorial setting.",
      },
    ],
    liveUrl: "https://jewelofjoy.vercel.app/",
    sourceNote:
      "Reviewed the deployed storefront. Next.js is confirmed by deployment metadata; the private repository was inaccessible. Checkout, payment acceptance, stock synchronisation, and fulfilment were not exercised. Brand testimonials and customer counts are not presented as developer achievements.",
    previewNote:
      "An original jewellery-inspired vector composition and editorial interface study. Not a photograph of a catalogue item or a screenshot of the live storefront.",
  },
  {
    slug: "nr-collection",
    name: "Noor’s Collection",
    kind: "Fashion boutique & product catalogue",
    category: "Web experiences",
    description:
      "A fashion storefront for Noor’s Collection, connecting category-led product browsing with boutique information and direct WhatsApp enquiries.",
    problem:
      "A local fashion boutique needs a clear digital catalogue that lets shoppers explore different collections and move easily into an enquiry.",
    approach:
      "Combine image-led collection pages, product information, category entry points, and a direct contact route without separating the online experience from the boutique.",
    technologies: ["Next.js", "React", "Sanity"],
    capabilities: [
      {
        title: "Category-led collections",
        description:
          "Dedicated entry points organise two-piece and three-piece suits, casual wear, embroidered pieces, lawn, and party wear.",
      },
      {
        title: "Product presentation",
        description:
          "Featured and new-arrival sections show product imagery, categories, prices, product links, and add-to-cart controls.",
      },
      {
        title: "A direct enquiry path",
        description:
          "The public site includes boutique information, directions, and a WhatsApp link for product conversations.",
      },
    ],
    liveUrl: "https://nr-collection.vercel.app/",
    sourceNote:
      "Reviewed the live homepage and its category, product, and contact entry points. Next.js is confirmed by deployment metadata; product imagery is served through Sanity. The private source was inaccessible. Payment, order processing, inventory behaviour, and sales results were not verified.",
    previewNote:
      "An original typographic and textile-inspired interface study using the live boutique name and headline. Not a product photograph or a deployed-site screenshot.",
  },
  {
    slug: "nkr-agent",
    name: "NKR Agent",
    kind: "Logistics website review interface",
    category: "AI & systems",
    description:
      "A URL-entry interface for logistics website reviews, covering SEO, AI-search readiness, conversion, and technical user experience.",
    problem:
      "A logistics website review needs to consider industry-specific language, trust, and enquiry paths alongside conventional search visibility.",
    approach:
      "Present the review around a submitted website URL and clearly defined analysis areas, bringing technical and business-facing questions into one brief.",
    technologies: ["Next.js", "React"],
    capabilities: [
      {
        title: "A URL-based starting point",
        description:
          "The public interface introduces a website-submission workflow specifically framed around logistics businesses.",
      },
      {
        title: "Search and AI-readiness scope",
        description:
          "The page sets out SEO, keyword optimisation, and AI-search readiness as areas of review.",
      },
      {
        title: "Conversion and trust context",
        description:
          "The stated review areas include calls to action, logistics terminology, trust signals, mobile UX, and technical SEO.",
      },
    ],
    liveUrl: "https://v0-nkr-agent.vercel.app/",
    sourceNote:
      "Reviewed the public analysis interface. The project label comes from the supplied deployment name; Next.js is confirmed by deployment metadata. No public repository was identified. Live report generation, crawling, AI-provider behaviour, audit accuracy, and ranking outcomes were not tested.",
    previewNote:
      "An editorial interface study of the observed URL-based review concept. The review topics are labels, not generated findings, audit scores, or real client data.",
  },
  {
    slug: "physical-ai-humanoid-robotics",
    name: "Physical AI & Humanoid Robotics",
    kind: "Interactive textbook & RAG assistant",
    category: "AI & systems",
    description:
      "An educational web platform for physical AI and humanoid robotics, pairing a Docusaurus textbook with a contextual chat interface and a Python retrieval backend.",
    problem:
      "Robotics learning spans middleware, simulation, perception, and control. Readers need connected material and a way to ask questions in the context of what they are reading.",
    approach:
      "Organise the material into a browsable textbook and connect a text-selection-aware chat interface to a retrieval-augmented backend.",
    technologies: [
      "Docusaurus",
      "React",
      "Python",
      "FastAPI",
      "Qdrant",
      "TypeScript",
    ],
    capabilities: [
      {
        title: "A structured technical textbook",
        description:
          "The public site introduces systems and simulation, embodied intelligence, and deployment topics, with chapter launchpads for ROS 2, simulation, and conversational robotics.",
      },
      {
        title: "Reading-context questions",
        description:
          "The public source includes a React chat widget that captures selected text and sends it with a question to the backend.",
      },
      {
        title: "A retrieval-backed architecture",
        description:
          "The repository includes a FastAPI backend, Qdrant retrieval logic, and configurable model-provider integrations. These services require their own configuration.",
      },
    ],
    liveUrl: "https://physical-ai-humanoid-robotics-nine.vercel.app/",
    githubUrl:
      "https://github.com/SyedaFatimaNoor/Physical-AI-Humanoid-Robotics",
    sourceNote:
      "Reviewed the live homepage and public repository, including frontend dependencies, Python dependencies, retrieval logic, and the chat widget. Live model calls, retrieval quality, translation, and authentication were not exercised. This is an educational software project, not a claim of deploying physical robots.",
    previewNote:
      "An original technical diagram and editorial study of the textbook's subject matter. Not a live chat result, a deployed-site screenshot, or evidence of a physical robot deployment.",
  },
  {
    slug: "seo-pilot",
    name: "SEO Pilot",
    kind: "SEO web project · review pending",
    category: "Web experiences",
    description:
      "An SEO-oriented web project with a Vite-based deployment. A detailed feature walkthrough is pending verification.",
    technologies: ["Vite"],
    capabilities: [],
    liveUrl: "https://seo-pilot.vercel.app/",
    demoStatus: "unverified",
    sourceNote:
      "The supplied URL returned HTTP 500 to the page-review tool on both attempts on 12 November 2026. Deployment metadata confirms Vite and a private source repository, but the application and source could not be inspected. The demo is therefore not promoted as verified, and no specific feature, AI capability, audit result, or ranking improvement is claimed.",
    previewNote:
      "A typographic project marker, not a product interface or screenshot. A detailed visual preview is intentionally withheld until the application can be reviewed.",
  },
  {
    slug: "noor-cv-builder",
    name: "Noor CV Builder",
    kind: "Structured CV-building interface",
    category: "Web experiences",
    description:
      "A browser-based CV builder with organised personal-details, experience, education, project, and skills sections, plus a resume preview and print control.",
    problem:
      "Turning career information into a readable CV can involve repetitive formatting. A structured form helps keep the focus on the content and its organisation.",
    approach:
      "Break the document into clear, repeatable sections and place the resume layout alongside the editing workflow, with a print option at the end.",
    technologies: ["HTML"],
    capabilities: [
      {
        title: "Structured personal information",
        description:
          "The builder provides fields for a name, image, designation, contact details, and a summary.",
      },
      {
        title: "Repeatable career sections",
        description:
          "Achievements, experience, education, projects, and skills are grouped into separate form sections with add-entry controls.",
      },
      {
        title: "A document-oriented finish",
        description:
          "The builder page includes a resume-preview layout and a Print CV control.",
      },
    ],
    liveUrl: "https://noor-cv-builder.vercel.app/",
    sourceNote:
      "Reviewed the deployed landing page and /resume.html builder. HTML delivery and the visible form structure are confirmed. The private source and deployment file tree were inaccessible, so no additional libraries are asserted. Saving, PDF export, AI writing, and recruitment outcomes were not verified.",
    previewNote:
      "An original document-layout study based on the visible builder sections. All name and role text is explicitly placeholder copy; no real CV, employer, or achievement is shown.",
  },
];
