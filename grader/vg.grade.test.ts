import { describe, it } from "vitest";
import { readProjectFile, requireGrade } from "./helpers";

describe("Automatiska krav för VG", () => {
  it("renderar vädernotisen som en Server Component bakom Suspense", () => {
    const homePage = readProjectFile("src/app/page.tsx");
    const explorer = readProjectFile("src/components/events-explorer.tsx");
    const weatherPromotion = readProjectFile(
      "src/components/weather-promotion.tsx",
    );

    requireGrade(
      !/["']use client["']/.test(weatherPromotion),
      "WeatherPromotion är fortfarande en Client Component.",
    );
    requireGrade(
      !/\buseEffect\s*\(/.test(weatherPromotion),
      "Väderhämtningen ligger fortfarande i useEffect.",
    );
    requireGrade(
      !/fetch\s*\(\s*["']\/api\/weather["']/.test(weatherPromotion),
      "Server Componenten ska inte göra ett klientanrop till /api/weather.",
    );
    requireGrade(
      /export\s+(?:default\s+)?async\s+function\s+WeatherPromotion/.test(
        weatherPromotion,
      ),
      "WeatherPromotion ska vara en asynkron Server Component.",
    );
    requireGrade(
      !/WeatherPromotion/.test(explorer),
      "Flytta WeatherPromotion ut ur den stora Client Componenten.",
    );
    requireGrade(
      /<Suspense\b[^>]*fallback=/.test(homePage) &&
        /<WeatherPromotion\b/.test(homePage),
      "Rendera WeatherPromotion bakom Suspense med en fallback på startsidan.",
    );
  });
});
