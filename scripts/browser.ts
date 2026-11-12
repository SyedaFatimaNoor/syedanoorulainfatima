import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { brotliDecompressSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import type { LaunchOptions } from "@playwright/test";

/** npm-distributed Chromium keeps browser tests reproducible in restricted CI. */
export async function browserLaunchOptions(): Promise<LaunchOptions> {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE)
    return { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE };
  if (process.platform !== "linux" || process.arch !== "x64") return {};
  const chromium = (await import("@sparticuz/chromium")).default;
  const root = fileURLToPath(new URL("../", import.meta.url));
  const cache = join(root, ".cache/chromium");
  if (!existsSync(join(cache, "lib/libnspr4.so"))) {
    mkdirSync(cache, { recursive: true });
    const archive = fileURLToPath(
      new URL(
        "../bin/al2023.tar.br",
        import.meta.resolve("@sparticuz/chromium"),
      ),
    );
    const tar = join(cache, "al2023.tar");
    writeFileSync(tar, brotliDecompressSync(readFileSync(archive)));
    execFileSync("tar", ["-xf", tar, "-C", cache]);
  }
  return {
    executablePath: await chromium.executablePath(),
    headless: true,
    // Normal web security and origin checks remain enabled.
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--no-zygote",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
    env: {
      ...process.env,
      LD_LIBRARY_PATH: `${cache}/lib:${process.env.LD_LIBRARY_PATH || ""}`,
    },
  };
}
