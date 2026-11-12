import Image from "next/image";
import { ProjectStudy } from "./project-studies";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  LockKeyhole,
  Orbit,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";
import fragrance from "../../public/images/projects/fragrance-art.webp";
import jewelry from "../../public/images/projects/jewelry-art.webp";
import chair from "../../public/images/projects/avion-chair.webp";

function BrowserBar({ url, light = false }: { url: string; light?: boolean }) {
  return (
    <div className={`browser-bar ${light ? "light" : ""}`}>
      <span className="window-dots">
        <i />
        <i />
        <i />
      </span>
      <span className="browser-address">
        <LockKeyhole size={9} />
        {url}
      </span>
      <span className="browser-plus">+</span>
    </div>
  );
}

export function ProjectPreview({
  slug,
  large = false,
}: {
  slug: string;
  large?: boolean;
}) {
  if (slug === "prospectai-studio")
    return (
      <div
        data-preview={slug}
        className={`project-preview prospect-preview ${large ? "large-preview" : ""}`}
        aria-hidden="true"
      >
        <div className="preview-grid" />
        <span className="preview-corner-label">
          FROM RESEARCH TO POSSIBILITY
        </span>
        <div className="browser-frame prospect-browser">
          <BrowserBar url="prospectaistudio.vercel.app" light />
          <div className="prospect-mini-nav">
            <span className="mini-prospect-logo">
              <Orbit size={17} />
              Prospect<span>AI.</span>
            </span>
            <span>
              How it works <span>The platform</span>
            </span>
            <span className="mini-nav-button">
              Explore workspace <ArrowUpRight size={10} />
            </span>
          </div>
          <div className="prospect-mini-main">
            <div className="prospect-mini-copy">
              <span className="mini-eyebrow">
                <i /> A BETTER KIND OF DISCOVERY
              </span>
              <h4>
                Find the overlooked.
                <br />
                See the <em>opportunity.</em>
              </h4>
              <p>
                Discover businesses. Verify the evidence.
                <br />
                Make your next meaningful connection.
              </p>
              <span className="mini-green-button">
                Start discovering <ArrowRight size={11} />
              </span>
              <div className="mini-checks">
                <span>
                  <Check size={10} />
                  Real public sources
                </span>
                <span>
                  <Check size={10} />
                  Evidence-led
                </span>
              </div>
            </div>
            <div className="mini-map">
              <span>A WORLD OF POSSIBILITIES</span>
              <Image
                src="/images/projects/prospect-world.svg"
                priority={large}
                alt=""
                width={400}
                height={240}
                className="world-map"
              />
              <div className="map-pin pin-a" />
              <div className="map-pin pin-b" />
              <div className="map-pin pin-c" />
              <div className="map-note">
                <Compass size={13} />
                Your next opportunity, anywhere.
              </div>
            </div>
          </div>
          <div className="mini-workflow">
            <span>
              <Compass size={15} />
              Discover with purpose
            </span>
            <span>
              <ShieldCheck size={15} />
              Verify before you pitch
            </span>
            <span>
              <WandSparkles size={15} />
              Make it personal
            </span>
          </div>
        </div>
        <span className="preview-art-label">INTERFACE STUDY</span>
        <span className="preview-plus">+</span>
      </div>
    );
  if (slug === "pinease")
    return (
      <div
        data-preview={slug}
        className={`project-preview pinease-preview ${large ? "large-preview" : ""}`}
        aria-hidden="true"
      >
        <div className="browser-frame pinease-browser">
          <BrowserBar url="pinease.vercel.app" />
          <div className="pinease-mini-nav">
            <b>
              pinease<span>®</span>
            </b>
            <span>Services &nbsp; Work &nbsp; About</span>
            <span className="mini-agency-contact">
              LET’S TALK <ArrowUpRight size={10} />
            </span>
          </div>
          <div className="pinease-mini-main">
            <span className="mini-eyebrow">STRATEGY. DESIGN. TECHNOLOGY.</span>
            <h4>
              We create
              <br />
              <span>digital</span>
              <br />
              excellence<span className="red-period">.</span>
            </h4>
            <div className="pinease-orbit">
              <div />
              <div />
              <div />
            </div>
            <div className="pinease-mini-bottom">
              <span>
                Digital experiences.
                <br />
                Designed to endure.
              </span>
              <span className="mini-agency-button">
                EXPLORE OUR WORK <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>
        <span className="preview-art-label">INTERFACE STUDY</span>
        <span className="preview-plus">+</span>
      </div>
    );
  if (slug === "essence-of-dream")
    return (
      <div
        data-preview={slug}
        className={`project-preview fragrance-preview ${large ? "large-preview" : ""}`}
        aria-hidden="true"
      >
        <div className="browser-frame fragrance-browser">
          <BrowserBar url="essence-of-dream.vercel.app" light />
          <div className="fragrance-mini-nav">
            <b>
              ESSENCE <span>OF</span> DREAM
            </b>
            <span>
              Collection &nbsp; Our story <ArrowUpRight size={10} />
            </span>
          </div>
          <div className="fragrance-mini-main">
            <Image
              src={fragrance}
              priority={large}
              alt=""
              fill
              sizes="(max-width: 700px) 90vw, 600px"
            />
            <div className="fragrance-copy">
              <span className="mini-eyebrow">THE ART OF PERFUMERY</span>
              <h4>
                Discover your
                <br />
                <em>signature scent.</em>
              </h4>
              <span className="mini-fragrance-button">
                EXPLORE THE COLLECTION <ArrowRight size={10} />
              </span>
            </div>
          </div>
        </div>
        <span className="preview-art-label">FRAGRANCE-INSPIRED ARTWORK</span>
        <span className="preview-plus">+</span>
      </div>
    );
  if (slug === "fashion-jewelry")
    return (
      <div
        data-preview={slug}
        className={`project-preview jewelry-preview ${large ? "large-preview" : ""}`}
        aria-hidden="true"
      >
        <div className="browser-frame jewelry-browser">
          <BrowserBar url="fashion-jewelry-gamma.vercel.app" light />
          <div className="jewelry-mini-nav">
            <b>
              FASHION <i>&</i> JEWELRY
            </b>
            <span>Jewelry &nbsp; Nails &nbsp; Collections</span>
          </div>
          <div className="jewelry-mini-main">
            <Image
              src={jewelry}
              priority={large}
              alt=""
              fill
              sizes="(max-width: 700px) 90vw, 600px"
            />
            <div className="jewelry-copy">
              <span className="mini-eyebrow">
                DISCOVER OUR PREMIUM COLLECTION
              </span>
              <h4>
                Timeless
                <br />
                <em>Elegance.</em>
              </h4>
              <span className="mini-jewelry-button">
                EXPLORE COLLECTION <ArrowUpRight size={10} />
              </span>
            </div>
          </div>
        </div>
        <span className="preview-art-label">JEWELRY-INSPIRED ARTWORK</span>
        <span className="preview-plus">+</span>
      </div>
    );
  if (slug !== "avion") return <ProjectStudy slug={slug} large={large} />;

  return (
    <div
      data-preview={slug}
      className={`project-preview avion-preview ${large ? "large-preview" : ""}`}
      aria-hidden="true"
    >
      <div className="browser-frame avion-browser">
        <BrowserBar url="avion-eta.vercel.app" light />
        <div className="avion-mini-nav">
          <span>Furniture &nbsp; Homeware</span>
          <b>Avion</b>
          <span>
            Our story <ArrowUpRight size={10} />
          </span>
        </div>
        <div className="avion-mini-main">
          <div className="avion-mini-copy">
            <h4>
              The furniture brand
              <br />
              for the future, with
              <br />
              <em>timeless designs.</em>
            </h4>
            <span className="mini-avion-button">
              View collection <ArrowRight size={11} />
            </span>
            <p>
              A new era in furniture.
              <br />
              Considered for the way you live.
            </p>
          </div>
          <div className="avion-chair">
            <Image
              src={chair}
              priority={large}
              alt=""
              fill
              sizes="(max-width: 700px) 45vw, 320px"
            />
          </div>
        </div>
        <div className="avion-mini-bottom">
          Thoughtfully designed. Beautifully simple.
        </div>
      </div>
      <span className="preview-art-label">
        INTERFACE STUDY · ORIGINAL PROJECT IMAGE
      </span>
      <span className="preview-plus">+</span>
    </div>
  );
}
