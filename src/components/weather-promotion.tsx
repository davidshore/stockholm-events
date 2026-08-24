"use client";

import { useEffect, useState } from "react";

type StockholmWeather = {
  observedAt: string;
  summary: string;
  temperature: number;
};

export function WeatherPromotion() {
  const [weather, setWeather] = useState<StockholmWeather | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const response = await fetch("/api/weather", {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const data = (await response.json()) as StockholmWeather;
        setWeather(data);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Kunde inte visa vädernotisen", error);
        }
      }
    }

    void loadWeather();

    return () => controller.abort();
  }, []);

  if (!weather) return null;

  return (
    <aside className="promotion">
      <strong>{Math.round(weather.temperature)} °C i Stockholm</strong>
      <span>
        {capitalize(weather.summary)} – passa på att hitta något att göra.
      </span>
      <a href="#events">Visa veckans urval</a>
      <small>
        Väderdata: <a href="https://open-meteo.com/">Open-Meteo</a>
      </small>
    </aside>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase("sv-SE") + value.slice(1);
}
