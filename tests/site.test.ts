import test from "node:test";
import assert from "node:assert/strict";
import { projects } from "../src/lib/projects";
import { getContactChannels, getSiteUrl } from "../src/lib/site";

test("all five projects have unique routes and the supplied HTTPS demos", () => {
  assert.equal(projects.length, 5);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 5);
  assert.deepEqual(
    projects.map((p) => new URL(p.liveUrl).hostname).sort(),
    [
      "avion-eta.vercel.app",
      "essence-of-dream.vercel.app",
      "fashion-jewelry-gamma.vercel.app",
      "pinease.vercel.app",
      "prospectaistudio.vercel.app",
    ].sort(),
  );
  for (const project of projects) {
    assert.equal(new URL(project.liveUrl).protocol, "https:");
    assert.ok(project.problem && project.sourceNote && project.previewNote);
    assert.ok(project.technologies.length > 0);
    if (project.githubUrl)
      assert.equal(new URL(project.githubUrl).hostname, "github.com");
  }
});

test("unknown social contact details stay absent and invalid values never become links", () => {
  const original = {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  };
  try {
    delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    assert.deepEqual(getContactChannels(), { linkedin: null, whatsapp: null });
    process.env.NEXT_PUBLIC_LINKEDIN_URL = "javascript:alert(1)";
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "not a number";
    assert.deepEqual(getContactChannels(), { linkedin: null, whatsapp: null });
    process.env.NEXT_PUBLIC_LINKEDIN_URL =
      "https://linkedin.com.attacker.example/in/noor";
    assert.equal(getContactChannels().linkedin, null);
  } finally {
    if (original.linkedin === undefined)
      delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    else process.env.NEXT_PUBLIC_LINKEDIN_URL = original.linkedin;
    if (original.whatsapp === undefined)
      delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    else process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = original.whatsapp;
  }
});

test("canonical origin is optional and rejects non-web URLs", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(getSiteUrl(), undefined);
    process.env.NEXT_PUBLIC_SITE_URL = "javascript:alert(1)";
    assert.equal(getSiteUrl(), undefined);
    process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example.test/a/path";
    assert.equal(getSiteUrl(), "https://portfolio.example.test");
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
