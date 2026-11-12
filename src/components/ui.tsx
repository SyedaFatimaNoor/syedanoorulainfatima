import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { brandIcons, type BrandName } from "@/lib/brand-icons";

export function BrandIcon({
  name,
  size = 20,
  className = "",
  colored = false,
}: {
  name: BrandName;
  size?: number;
  className?: string;
  colored?: boolean;
}) {
  const icon = brandIcons[name];
  const neutralBrands = ["nextdotjs", "express", "github", "prisma", "vercel"];
  const color = neutralBrands.includes(name) ? "#d3d7e2" : icon.color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={colored ? color : "currentColor"}
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function Github({ size = 20 }: { size?: number }) {
  return <BrandIcon name="github" size={size} />;
}

export function Linkedin({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5V17M11.5 17v-6.5M11.5 13.5c0-4 5-4 5 0V17" />
      <path d="M7.5 7.4v.2" strokeWidth="2.5" />
    </svg>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="section-index">{number}</span>
      <span className="label-line" />
      {children}
    </div>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  label,
  showIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
  showIcon?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
    >
      {children}
      {showIcon && <ArrowUpRight size={16} aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`wordmark ${compact ? "compact" : ""}`}>
      noor<span className="logo-dot">.</span>
      <span className="logo-slash" aria-hidden="true">
        /
      </span>
      <span className="logo-caption">
        DEVELOPER
        <br />& AI ENGINEER
      </span>
    </span>
  );
}
