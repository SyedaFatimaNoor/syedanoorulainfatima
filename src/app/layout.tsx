import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { getSiteUrl, site } from "@/lib/site";
import "./globals.css";

const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const space = localFont({
  src: "../assets/fonts/space-grotesk.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
});
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.name} — Full-Stack Developer & AI Engineer`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: "Noor — Developer & AI Engineer",
  authors: [{ name: site.name, url: site.github }],
  keywords: [
    "Syeda Noor Fatima",
    "Full-Stack Developer",
    "AI Engineer",
    "AI Agent Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Karachi",
    "Remote Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Noor — Developer & AI Engineer",
    title: `${site.name} — Digital products. Intelligent systems.`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-Stack Developer & AI Engineer`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#090B10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${space.variable}`}>
      <body id="top">
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; } .contact-form, .project-filters, .menu-toggle { display: none !important; }`}</style>
          <div
            className="container"
            style={{ paddingBlock: 20, color: "#c7c0df", fontSize: 12 }}
          >
            JavaScript is off. All project and email links still work. To
            enquire, email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </div>
        </noscript>
      </body>
    </html>
  );
}
