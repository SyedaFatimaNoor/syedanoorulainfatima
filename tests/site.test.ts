import test from "node:test";
import assert from "node:assert/strict";
import { getProject, projects } from "../src/lib/projects";
import { getContactChannels, getSiteUrl } from "../src/lib/site";
import sitemap from "../src/app/sitemap";

const linkedin =
  "https://www.linkedin.com/in/syeda-noor-ul-ain-fatima-b146032ba/";
const whatsapp = "https://wa.me/923391451101";

function withContactEnvironment(check: () => void) {
  const original = {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  };
  try {
    check();
  } finally {
    if (original.linkedin === undefined)
      delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    else process.env.NEXT_PUBLIC_LINKEDIN_URL = original.linkedin;
    if (original.whatsapp === undefined)
      delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    else process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = original.whatsapp;
  }
}

test("all twelve projects retain unique routes and the supplied HTTPS destinations", () => {
  assert.equal(projects.length, 12);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 12);
  assert.deepEqual(
    projects.map((p) => new URL(p.liveUrl).hostname).sort(),
    [
      "avion-eta.vercel.app",
      "essence-of-dream.vercel.app",
      "fashion-jewelry-gamma.vercel.app",
      "pinease.vercel.app",
      "prospectaistudio.vercel.app",
      "micro-credible.vercel.app",
      "jewelofjoy.vercel.app",
      "nr-collection.vercel.app",
      "v0-nkr-agent.vercel.app",
      "physical-ai-humanoid-robotics-nine.vercel.app",
      "seo-pilot.vercel.app",
      "noor-cv-builder.vercel.app",
    ].sort(),
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const url = new URL(project.liveUrl);
    assert.equal(url.protocol, "https:");
    assert.equal(url.pathname, "/");
    assert.equal(url.search, "");
    assert.ok(project.description && project.sourceNote && project.previewNote);
    assert.ok(project.technologies.length > 0);
    if (project.demoStatus !== "unverified") {
      assert.ok(project.problem && project.approach);
      assert.equal(project.capabilities.length, 3);
      assert.ok(project.capabilities.every((c) => c.title && c.description));
    }
    assert.equal(getProject(project.slug), project);
  }
  assert.equal(getProject("not-a-project"), undefined);
});

test("only verified public source mappings are linked", () => {
  assert.deepEqual(
    projects
      .flatMap((project) => (project.githubUrl ? [project.githubUrl] : []))
      .sort(),
    [
      "https://github.com/SyedaFatimaNoor/ProspectAIStudio",
      "https://github.com/SyedaFatimaNoor/hackathone3_marketplace",
      "https://github.com/SyedaFatimaNoor/Physical-AI-Humanoid-Robotics",
    ].sort(),
  );
});

test("SEO Pilot remains explicitly unverified with no invented case narrative or capabilities", () => {
  const pending = projects.filter(
    (project) => project.demoStatus === "unverified",
  );
  assert.deepEqual(
    pending.map((project) => project.slug),
    ["seo-pilot"],
  );
  assert.equal(pending[0].problem, undefined);
  assert.equal(pending[0].approach, undefined);
  assert.deepEqual(pending[0].capabilities, []);
  assert.deepEqual(pending[0].technologies, ["Vite"]);
  assert.match(pending[0].sourceNote, /page-review tool/);
  assert.equal(pending[0].featured, undefined);
});

test("confirmed social contacts work with unset or previously blank environment variables", () => {
  withContactEnvironment(() => {
    delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    assert.deepEqual(getContactChannels(), { linkedin, whatsapp });
    process.env.NEXT_PUBLIC_LINKEDIN_URL = " ";
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "";
    assert.deepEqual(getContactChannels(), { linkedin, whatsapp });
  });
});

test("valid contact overrides are supported and international phone formatting is normalised", () => {
  withContactEnvironment(() => {
    process.env.NEXT_PUBLIC_LINKEDIN_URL =
      " https://linkedin.com/in/example-profile/ ";
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "+92 (339) 145-1101";
    assert.deepEqual(getContactChannels(), {
      linkedin: "https://linkedin.com/in/example-profile/",
      whatsapp,
    });
    assert.equal(new URL(linkedin).search, "");
  });
});

test("invalid contact overrides never become links or silently use other destinations", () => {
  withContactEnvironment(() => {
    for (const invalid of [
      "javascript:alert(1)",
      "https://linkedin.com.attacker.example/in/noor",
      "https://linkedin.com@attacker.example/in/noor",
      "http://linkedin.com/in/noor",
      `${linkedin}?utm_source=chatgpt.com`,
    ]) {
      process.env.NEXT_PUBLIC_LINKEDIN_URL = invalid;
      assert.equal(getContactChannels().linkedin, null, invalid);
    }
    for (const invalid of [
      "not a number",
      "0391451101",
      "1234",
      "1234567890123456",
      "92339?text=bad",
    ]) {
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = invalid;
      assert.equal(getContactChannels().whatsapp, null, invalid);
    }
  });
});

test("canonical origin is optional, rejects non-web URLs, and includes all case pages in the sitemap", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(getSiteUrl(), undefined);
    assert.deepEqual(sitemap(), []);
    process.env.NEXT_PUBLIC_SITE_URL = "javascript:alert(1)";
    assert.equal(getSiteUrl(), undefined);
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.test/a/path";
    assert.equal(getSiteUrl(), "https://portfolio.example.test");
    assert.deepEqual(
      sitemap().map((entry) => entry.url),
      [
        "https://portfolio.example.test",
        ...projects.map(
          (project) =>
            `https://portfolio.example.test/projects/${project.slug}`,
        ),
        "https://portfolio.example.test/privacy",
      ],
    );
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
