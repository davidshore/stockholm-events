import { NextResponse } from "next/server";

const STOCKHOLM_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=59.3294&longitude=18.0687&current=temperature_2m,weather_code&timezone=Europe%2FStockholm";

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    time?: string;
    weather_code?: number;
  };
};

export async function GET() {
  try {
    const response = await fetch(STOCKHOLM_WEATHER_URL, {
      // Baslinjen hämtar ny data för varje anrop. Studenten får undersöka om
      // väderdata verkligen behöver vara så färsk och välja en cachepolicy.
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo svarade med ${response.status}`);
    }

    const data = (await response.json()) as OpenMeteoResponse;
    const temperature = data.current?.temperature_2m;
    const weatherCode = data.current?.weather_code;
    const observedAt = data.current?.time;

    if (
      typeof temperature !== "number" ||
      typeof weatherCode !== "number" ||
      typeof observedAt !== "string"
    ) {
      throw new Error("Open-Meteo saknade aktuell väderdata");
    }

    return NextResponse.json(
      {
        observedAt,
        summary: describeWeather(weatherCode),
        temperature,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Kunde inte hämta vädret för Stockholm", error);

    return NextResponse.json(
      { error: "Vädret är tillfälligt otillgängligt" },
      { status: 503 },
    );
  }
}

function describeWeather(code: number): string {
  if (code === 0) return "klart väder";
  if (code <= 3) return "växlande molnighet";
  if (code <= 48) return "dimma";
  if (code <= 67) return "regn";
  if (code <= 77) return "snö";
  if (code <= 82) return "regnskurar";
  if (code <= 86) return "snöbyar";

  return "risk för åska";
}
