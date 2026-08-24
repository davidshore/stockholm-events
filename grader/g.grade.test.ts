import { describe, it } from "vitest";
import { readProjectFile, readSourceFiles, requireGrade } from "./helpers";

describe("Automatiska krav för G", () => {
  it("tar bort den artificiella fördröjningen av hero-bilden", () => {
    const explorer = readProjectFile("src/components/events-explorer.tsx");
    const heroCode = explorer.match(
      /className=["']hero-media["'][\s\S]*?<\/section>/,
    )?.[0];

    requireGrade(
      !/setTimeout[\s\S]{0,180}showHeroImage|showHeroImage[\s\S]{0,180}setTimeout/.test(
        explorer,
      ),
      "Hero-bilden visas fortfarande via setTimeout/showHeroImage.",
    );
    requireGrade(heroCode, "Kunde inte hitta hero-bildens kod.");
    requireGrade(
      !/loading=["']lazy["']|fetchPriority=["']low["']/.test(heroCode),
      "LCP-kandidaten ska inte använda loading=lazy eller fetchPriority=low.",
    );
  });

  it("tar bort det syntetiska huvudtrådsarbetet i eventfiltreringen", () => {
    const eventHelpers = readProjectFile("src/lib/events.ts");

    requireGrade(
      !/8_?000|rankingRows\.sort/.test(eventHelpers),
      "Den stora 8 000×-arrayen eller sorteringen rankingRows finns kvar.",
    );
  });

  it("reserverar utrymme för bilder", () => {
    const componentSource = readSourceFiles(/\.tsx$/);
    const css = readProjectFile("src/app/globals.css");
    const rawImageTags = componentSource.match(/<img\b[\s\S]*?\/>/g) ?? [];
    const nextImageTags = componentSource.match(/<Image\b[\s\S]*?\/>/g) ?? [];
    const imageTags = [...rawImageTags, ...nextImageTags];
    const everyImageHasSize =
      imageTags.length > 0 &&
      imageTags.every(
        (tag) =>
          (/\bwidth=/.test(tag) && /\bheight=/.test(tag)) || /\bfill\b/.test(tag),
      );
    const reservedWithCss =
      (css.match(/aspect-ratio\s*:/g)?.length ?? 0) >= 2;

    requireGrade(
      everyImageHasSize || reservedWithCss,
      "Använd next/image, width+height eller tydliga aspect-ratio-regler för bilderna.",
    );
  });

  it("har aktiverat Vercel Speed Insights", () => {
    const packageJson = JSON.parse(readProjectFile("package.json")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const source = readSourceFiles(/\.tsx$/);
    const allDependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    requireGrade(
      "@vercel/speed-insights" in allDependencies,
      "Installera @vercel/speed-insights.",
    );
    requireGrade(
      /<SpeedInsights\b/.test(source),
      "Rendera SpeedInsights-komponenten i appen.",
    );
  });

  it("innehåller en publik Vercel-länk", () => {
    const readme = readProjectFile("README.md");

    requireGrade(
      /https:\/\/[a-z0-9][a-z0-9.-]*\.vercel\.app(?:\/|\b)/i.test(readme),
      "Lägg till appens publika https://….vercel.app-länk i README.",
    );
  });

  it("laddar diagrammet med code splitting", () => {
    const componentSource = readSourceFiles(/\.tsx$/);
    const hasStaticInsightsImport =
      /import\s+(?:\{[^}]*EventInsights[^}]*\}|EventInsights)\s+from\s+["'][^"']*event-insights["']/.test(
        componentSource,
      );
    const hasDynamicInsightsImport =
      /import\s*\(\s*["'][^"']*event-insights["']\s*\)/.test(
        componentSource,
      );

    requireGrade(
      !hasStaticInsightsImport,
      "EventInsights importeras fortfarande statiskt.",
    );
    requireGrade(
      hasDynamicInsightsImport,
      "Kunde inte hitta en dynamisk import av event-insights.",
    );
  });

  it("har en cachepolicy för det externa väderanropet", () => {
    const weatherSource = readSourceFiles(/\.tsx?$/);
    const hasCachePolicy =
      /revalidate\s*[:=]\s*[1-9][0-9]*/.test(weatherSource) ||
      /cache\s*:\s*["']force-cache["']/.test(weatherSource) ||
      /s-maxage\s*=\s*[1-9][0-9]*/.test(weatherSource) ||
      /unstable_cache\s*\(/.test(weatherSource);
    const stillUsesNoStore =
      /cache\s*:\s*["']no-store["']/i.test(weatherSource) ||
      /["']cache-control["']\s*:\s*["']no-store["']/i.test(weatherSource);

    requireGrade(
      !stillUsesNoStore,
      "Väder-routen använder fortfarande no-store.",
    );
    requireGrade(
      hasCachePolicy,
      "Ange exempelvis revalidate, force-cache, s-maxage eller unstable_cache.",
    );
  });
});
