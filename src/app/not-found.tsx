import { PageLink as Link } from "@/components/page-link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <span className="eyebrow">404 / A LITTLE OFF THE MAP</span>
      <h1>
        This page isn’t
        <br />
        part of the plan.
      </h1>
      <p>
        The link may have changed. There’s still plenty of thoughtful work to
        explore.
      </p>
      <Link href="/" className="button button-primary">
        Back to the portfolio <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </main>
  );
}
