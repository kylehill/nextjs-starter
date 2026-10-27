import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * One screenshot test per story, discovered from the static Storybook build.
 * Add `tags: ["!visual"]` to a story (or its meta) to skip it here.
 */
interface IndexEntry {
  id: string;
  title: string;
  name: string;
  type: "story" | "docs";
  tags?: string[];
}

const indexPath = path.join(process.cwd(), "storybook-static", "index.json");

function loadStories(): IndexEntry[] {
  let raw: string;
  try {
    raw = readFileSync(indexPath, "utf8");
  } catch {
    throw new Error(
      `Missing ${indexPath}. Run \`npm run build-storybook\` first (npm run test:visual does this for you).`,
    );
  }
  const { entries } = JSON.parse(raw) as { entries: Record<string, IndexEntry> };
  return Object.values(entries).filter(
    (entry) => entry.type === "story" && !entry.tags?.includes("!visual"),
  );
}

for (const story of loadStories()) {
  test(`${story.title} › ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.locator("#storybook-root > *").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${story.id}.png`);
  });
}
