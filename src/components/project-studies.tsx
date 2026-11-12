import type { ComponentType } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Code2,
  FileText,
  Globe2,
  MessageSquare,
  Plus,
} from "lucide-react";
import styles from "./project-studies.module.css";

// Decorative editorial studies, not screenshots or interactive product demos.
// Only observed concepts are illustrated; no real records, scores, or outcomes.
function MicroCredibleStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={styles.brand}>
          <Braces /> MicroCredible<span className={styles.brandDot}>.</span>
        </b>
        <span className={styles.nav}>Explore · Learn · Practise</span>
      </div>
      <div className={styles.microLayout}>
        <div className={styles.microCopy}>
          <span className={styles.eyebrow}>
            A LITTLE PRACTICE. A NEW POSSIBILITY.
          </span>
          <strong className={styles.headline}>
            Small skills.
            <em>Real practice.</em>
          </strong>
          <p>Find your next challenge.</p>
          <span className={styles.miniButton}>
            Explore skills <ArrowUpRight />
          </span>
        </div>
        <div className={styles.challengeList}>
          <span className={styles.eyebrow}>CHALLENGE CATALOGUE</span>
          {[
            ["React useEffect", "Intermediate"],
            ["REST API Design", "Beginner"],
            ["SQL Joins", "Intermediate"],
          ].map(([name, difficulty]) => (
            <div className={styles.challenge} key={name}>
              <Code2 />
              <div>
                <b>{name}</b>
                <span>{difficulty}</span>
              </div>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.microFooter}>
        <span>
          <BookOpen /> Learning Hub
        </span>
        <span>
          <MessageSquare /> Interview Coach
        </span>
        <span className={styles.footerArrow}>
          <ArrowRight />
        </span>
      </div>
    </>
  );
}

function JewelsStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={`${styles.brand} ${styles.serif}`}>Jewels of Joy</b>
        <span className={styles.nav}>Collections &nbsp; Our story</span>
        <Plus className={styles.navIcon} />
      </div>
      <div className={styles.jewelLayout}>
        <div className={styles.jewelCopy}>
          <span className={styles.eyebrow}>THE EVERYDAY, MADE SPECIAL.</span>
          <strong className={`${styles.headline} ${styles.serif}`}>
            Little pieces.
            <em>Lasting joy.</em>
          </strong>
          <span className={styles.textCta}>
            EXPLORE THE COLLECTION <ArrowUpRight />
          </span>
        </div>
        <div className={styles.jewelDrawing}>
          <svg viewBox="0 0 240 245" fill="none" focusable="false">
            <path d="M37 224V115a83 83 0 0 1 166 0v109" fill="#e8d7c4" />
            <ellipse
              cx="111"
              cy="132"
              rx="53"
              ry="70"
              transform="rotate(-24 111 132)"
              stroke="#93723c"
              strokeWidth="11"
            />
            <ellipse
              cx="111"
              cy="132"
              rx="53"
              ry="70"
              transform="rotate(-24 111 132)"
              stroke="#d4b773"
              strokeWidth="6"
            />
            <ellipse
              cx="111"
              cy="132"
              rx="53"
              ry="70"
              transform="rotate(-24 111 132)"
              stroke="#f3dfaa"
              strokeWidth="1.2"
            />
            <path
              d="m68 69 9-12 14 2 8 16-17 15Z"
              fill="#f5ecda"
              stroke="#a0885f"
            />
            <path d="m68 69 31 6m-22-18 5 33m9-31-9 31" stroke="#c8b99a" />
            <g fill="#fbf4e9" stroke="#c1ae92" strokeWidth="1">
              {Array.from({ length: 24 }, (_, index) => {
                const angle = (index / 24) * Math.PI * 2;
                return (
                  <circle
                    key={index}
                    cx={151 + Math.cos(angle) * 44}
                    cy={162 + Math.sin(angle) * 56}
                    r="5.5"
                  />
                );
              })}
            </g>
            <path
              d="M24 214h42m-21-21v42M207 40h18m-9-9v18"
              stroke="#9d8152"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
      <div className={styles.collectionFooter}>
        <span>STEEL</span>
        <i />
        <span>PEARLS & BEADS</span>
        <i />
        <span>GIFTS & SETS</span>
      </div>
    </>
  );
}

function CollectionStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={`${styles.brand} ${styles.serif}`}>Noor’s Collection</b>
        <span className={styles.nav}>Collections &nbsp; Boutique</span>
      </div>
      <div className={styles.collectionLayout}>
        <div className={styles.collectionCopy}>
          <span className={styles.eyebrow}>
            PAKISTANI FASHION · MALIR, KARACHI
          </span>
          <strong className={`${styles.headline} ${styles.serif}`}>
            Elegance
            <em>Redefined.</em>
          </strong>
          <span className={styles.textCta}>
            SHOP COLLECTION <ArrowRight />
          </span>
        </div>
        <div className={styles.textile}>
          <div className={styles.fabricBack} />
          <div className={styles.fabricFront}>
            <svg viewBox="0 0 180 300" fill="none" focusable="false">
              {[35, 100, 165, 230].map((y) => (
                <g key={y} transform={`translate(0 ${y})`}>
                  <path
                    d="M90 0c-26 8-28 30 0 42 28-12 26-34 0-42Zm0 0v42m0-18c-32 0-40-17-35-26 21 3 30 10 35 26Zm0 0c32 0 40-17 35-26-21 3-30 10-35 26Z"
                    stroke="#dbc3a2"
                    strokeWidth="1"
                  />
                  <circle cx="45" cy="38" r="2" fill="#dbc3a2" />
                  <circle cx="135" cy="38" r="2" fill="#dbc3a2" />
                </g>
              ))}
              <path
                d="M16 0v300M24 0v300M156 0v300M164 0v300"
                stroke="#c5a47f"
                strokeWidth="1"
              />
            </svg>
          </div>
          <span className={styles.fabricLabel}>HERITAGE IN EVERY THREAD</span>
        </div>
      </div>
      <div className={styles.collectionFooter}>
        <span>LAWN</span>
        <i />
        <span>EMBROIDERED</span>
        <i />
        <span>OCCASION WEAR</span>
      </div>
    </>
  );
}

function AgentStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={styles.brand}>
          <Globe2 /> NKR Agent
        </b>
        <span className={styles.nav}>LOGISTICS WEBSITE REVIEW</span>
      </div>
      <div className={styles.auditBody}>
        <div className={styles.auditHeading}>
          <div>
            <span className={styles.eyebrow}>SEARCH. CLARITY. CONVERSION.</span>
            <strong className={styles.headline}>
              A clearer view
              <br />
              of your website.
            </strong>
          </div>
          <svg
            className={styles.routeDrawing}
            viewBox="0 0 120 80"
            fill="none"
            focusable="false"
          >
            <path
              d="M8 62h28V23h35v28h39"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeDasharray="3 3"
            />
            <circle cx="8" cy="62" r="5" fill="currentColor" />
            <circle cx="71" cy="23" r="5" stroke="currentColor" />
            <circle cx="110" cy="51" r="8" stroke="currentColor" />
            <circle cx="110" cy="51" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className={styles.urlField}>
          <Globe2 />
          <span>Your logistics website URL</span>
          <ArrowUpRight />
        </div>
        <div className={styles.auditTopics}>
          <div>
            <span>SEARCH</span>
            <b>SEO & keywords</b>
          </div>
          <div>
            <span>DISCOVERY</span>
            <b>AI readiness</b>
          </div>
          <div>
            <span>EXPERIENCE</span>
            <b>Conversion & trust</b>
          </div>
        </div>
      </div>
    </>
  );
}

function RoboticsStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={styles.brand}>
          <BookOpen /> Physical AI Stack
        </b>
        <span className={styles.nav}>THE INTERACTIVE TEXTBOOK</span>
      </div>
      <div className={styles.roboticsBody}>
        <div className={styles.roboticsCopy}>
          <span className={styles.eyebrow}>
            PHYSICAL AI & HUMANOID ROBOTICS
          </span>
          <strong className={styles.headline}>
            From code
            <br />
            <em>to motion.</em>
          </strong>
          <div className={styles.chapters}>
            <span>
              <i>01</i> Systems & simulation
            </span>
            <span>
              <i>02</i> Embodied intelligence
            </span>
            <span>
              <i>03</i> Deployment & operations
            </span>
          </div>
        </div>
        <svg
          className={styles.robotDiagram}
          viewBox="0 0 220 240"
          fill="none"
          focusable="false"
        >
          <g stroke="currentColor" strokeWidth="0.5" opacity="0.2">
            {[30, 70, 110, 150, 190].map((x) => (
              <path key={x} d={`M${x} 0v240`} />
            ))}
            {[30, 70, 110, 150, 190, 230].map((y) => (
              <path key={y} d={`M0 ${y}h220`} />
            ))}
            <circle cx="106" cy="115" r="84" strokeDasharray="3 4" />
          </g>
          <g stroke="currentColor" strokeWidth="1.5">
            <path d="M55 214h94l-8-16H64l-9 16Zm42-17 4-32m17 32-3-32m-5-21 53-45m-14-16-53 46m64-66-38-33m-14 16 36 37M99 33l-20 9-9-12m35-20-7-8-20 9" />
            <circle cx="107" cy="150" r="15" />
            <circle cx="107" cy="150" r="5" />
            <circle cx="158" cy="83" r="16" />
            <circle cx="158" cy="83" r="5" />
            <circle cx="111" cy="35" r="12" />
            <circle cx="111" cy="35" r="4" />
          </g>
          <g stroke="currentColor" opacity="0.55" strokeWidth="0.7">
            <path d="M120 150h72v20m-34-87h38V53M93 35H35v43" />
            <path d="M187 175h10m-5-5v10M191 48h10m-5-5v10M30 83h10m-5-5v10" />
          </g>
        </svg>
      </div>
      <div className={styles.roboticsFooter}>
        <span>
          <MessageSquare /> READING WITH CONTEXT
        </span>
        <span>
          TEXTBOOK + RAG <ArrowUpRight />
        </span>
      </div>
    </>
  );
}

function SeoStudy() {
  return (
    <div className={styles.seoMarker}>
      <div className={styles.seoTop}>
        <span>PROJECT ARCHIVE</span>
        <span>VITE</span>
      </div>
      <strong>
        SEO Pilot<span>↗</span>
      </strong>
      <div className={styles.seoBottom}>
        <span>A closer look, once verified.</span>
        <span className={styles.pendingDot}>DEMO NOT VERIFIED</span>
      </div>
    </div>
  );
}

function CvStudy() {
  return (
    <>
      <div className={styles.topbar}>
        <b className={styles.brand}>
          <FileText /> Noor CV Builder
        </b>
        <span className={styles.nav}>YOUR NEXT CHAPTER</span>
      </div>
      <div className={styles.cvWorkspace}>
        <div className={styles.cvSections}>
          <span className={styles.eyebrow}>BUILD YOUR CV</span>
          {[
            "Personal details",
            "Experience",
            "Education",
            "Projects",
            "Skills",
          ].map((section, index) => (
            <div key={section}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              <span>{section}</span>
              <Plus />
            </div>
          ))}
          <span className={styles.cvPrint}>
            <FileText /> Print CV
          </span>
        </div>
        <div className={styles.cvDocument}>
          <span className={styles.documentName}>Your name</span>
          <span className={styles.documentRole}>Your role</span>
          <div className={styles.documentRule} />
          {["PROFILE", "EXPERIENCE", "EDUCATION"].map((section) => (
            <div className={styles.documentSection} key={section}>
              <b>{section}</b>
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const studies: Record<
  string,
  { theme: string; caption: string; Content: ComponentType }
> = {
  "micro-credible": {
    theme: "micro",
    caption: "SKILL-BUILDING INTERFACE STUDY",
    Content: MicroCredibleStudy,
  },
  "jewels-of-joy": {
    theme: "jewels",
    caption: "ORIGINAL JEWELLERY-INSPIRED VECTOR STUDY",
    Content: JewelsStudy,
  },
  "nr-collection": {
    theme: "collection",
    caption: "TEXTILE-INSPIRED INTERFACE STUDY",
    Content: CollectionStudy,
  },
  "nkr-agent": {
    theme: "agent",
    caption: "REVIEW INTERFACE STUDY · NO LIVE RESULTS",
    Content: AgentStudy,
  },
  "physical-ai-humanoid-robotics": {
    theme: "robotics",
    caption: "TEXTBOOK STUDY · ORIGINAL TECHNICAL DIAGRAM",
    Content: RoboticsStudy,
  },
  "seo-pilot": {
    theme: "seo",
    caption: "TYPOGRAPHIC PROJECT MARKER · NOT A SCREENSHOT",
    Content: SeoStudy,
  },
  "noor-cv-builder": {
    theme: "cv",
    caption: "DOCUMENT LAYOUT STUDY · PLACEHOLDER CONTENT",
    Content: CvStudy,
  },
};

export function ProjectStudy({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  const study = Object.hasOwn(studies, slug) ? studies[slug] : undefined;
  if (!study) {
    return (
      <div
        className={`project-preview ${styles.fallback} ${large ? "large-preview" : ""}`}
        data-preview="unavailable"
        aria-hidden="true"
      >
        <FileText />
        <span>Project preview</span>
      </div>
    );
  }
  const Content = study.Content;
  return (
    <div
      className={`project-preview ${styles.study} ${styles[study.theme]} ${large ? "large-preview" : ""}`}
      data-preview={slug}
      aria-hidden="true"
    >
      <div className={styles.canvas}>
        <Content />
      </div>
      <div className={styles.caption}>
        <span>{study.caption}</span>
        <Plus />
      </div>
    </div>
  );
}
