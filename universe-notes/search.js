import { readFile } from "node:fs/promises";

const query = process.argv.slice(2).join(" ").trim();
if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const { highlights } = JSON.parse(
    await readFile(new URL("./notes/keynote-highlights.json", import.meta.url), "utf8"),
  );
  const normalizedQuery = query.toLowerCase();
  const matches = highlights.filter(
    ({ title, summary }) =>
      title.toLowerCase().includes(normalizedQuery) ||
      summary.toLowerCase().includes(normalizedQuery),
  );

  console.log(
    matches.length
      ? matches.map(({ title, summary }) => `${title}\n  ${summary}`).join("\n\n")
      : `No highlights found for "${query}".`,
  );
}
