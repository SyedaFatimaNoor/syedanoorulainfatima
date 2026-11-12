import { PageLink as Link } from "@/components/page-link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "./ui";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link
              href="/"
              className="logo-link"
              aria-label={`${site.name}, home`}
            >
              <Logo />
            </Link>
            <p>
              Considered design. Thoughtful engineering.
              <br />
              Something meaningful, every time.
            </p>
          </div>
          <div className="footer-navigation">
            <Link href="/#about">About</Link>
            <Link href="/#work">Selected work</Link>
            <Link href="/#services">Services</Link>
            <a href={`mailto:${site.email}`}>
              Say hello <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-note">
            <span className="status-dot" />
            OPEN TO COLLABORATION<span>From Karachi, to wherever you are.</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} {site.name}. Built with intention.
          </span>
          <span className="footer-bottom-right">
            <Link href="/privacy">Privacy</Link>
            <span>
              DESIGNED & DEVELOPED WITH CARE{" "}
              <span className="footer-asterisk" aria-hidden="true">
                ✳
              </span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
