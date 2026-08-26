import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("GET /api/weather", () => {
  it("adapts the external weather response for the client", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({
        current: {
          temperature_2m: 21,
          time: "2026-08-24T17:30",
          weather_code: 2,
        },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      observedAt: "2026-08-24T17:30",
      summary: "växlande molnighet",
      temperature: 21,
    });
    expect(fetchMock).toHaveBeenCalled();
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(
      "api.open-meteo.com",
    );
  });

  it("returns a controlled error when the external API fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 502 })),
    );
    vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Vädret är tillfälligt otillgängligt",
    });
  });
});
