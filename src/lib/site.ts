// Owner-confirmed spelling; keep every formal name and credit consistent.
const fullName = "Syeda Noor ul Ain Fatima";

export const site = {
  name: fullName,
  fullName,
  shortName: "Noor",
  role: "Full-Stack Developer | AI Engineer | AI Agent Developer",
  email: "syedanoorfatima610@gmail.com",
  github: "https://github.com/SyedaFatimaNoor",
  linkedin: "https://www.linkedin.com/in/syeda-noor-ul-ain-fatima-b146032ba/",
  whatsappNumber: "923391451101",
  whatsappDisplay: "+92 339 1451101",
  location: "Karachi, Pakistan",
  description: `Full-stack development, thoughtful web experiences, and intelligent AI-powered systems. Explore the work of ${fullName}, a developer based in Karachi and open to international collaborations.`,
} as const;

// Owner-confirmed details work with unset or previously blank configuration.
// Invalid nonempty overrides stay unlinked rather than producing an unsafe URL.
export function getContactChannels() {
  const linkedin =
    process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || site.linkedin;
  const whatsapp = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || site.whatsappNumber
  ).replace(/[\s+()-]/g, "");
  return {
    linkedin:
      linkedin &&
      /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9%_-]+\/?$/.test(linkedin)
        ? linkedin
        : null,
    whatsapp:
      whatsapp && /^[1-9]\d{6,14}$/.test(whatsapp)
        ? `https://wa.me/${whatsapp}`
        : null,
  };
}

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function isEmailDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
}

export const navigation = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;
