import { describe, expect, it } from "vitest";
import { EVENTS } from "@/data/events";
import {
  EVENT_CATEGORIES,
  filterEvents,
  formatEventDate,
  getEventBySlug,
} from "@/lib/events";

describe("event helpers", () => {
  it("filters events by text across useful fields", () => {
    const results = filterEvents(EVENTS, "jazz", "Alla");

    expect(results.map((event) => event.slug)).toEqual(["jazz-under-broarna"]);
  });

  it("filters events by category", () => {
    const results = filterEvents(EVENTS, "", "Teknik");

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Kod & kaffe: frontendkväll");
  });

  it("combines category and text filters", () => {
    const results = filterEvents(EVENTS, "vasastan", "Kultur");

    expect(results.map((event) => event.slug)).toEqual([
      "designmarknad-vasaparken",
    ]);
  });

  it("finds an event for the details route", () => {
    expect(getEventBySlug(EVENTS, "film-under-stjarnorna")?.venue).toBe(
      "Rålambshovsparken",
    );
    expect(getEventBySlug(EVENTS, "saknas")).toBeUndefined();
  });

  it("formats a Swedish date for display", () => {
    expect(formatEventDate(EVENTS[0].startsAt)).toMatch(/25 aug/i);
  });

  it("provides complete, routable data for every event", () => {
    const slugs = EVENTS.map((event) => event.slug);

    expect(new Set(slugs).size).toBe(EVENTS.length);

    for (const event of EVENTS) {
      expect(event.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(event.title.trim()).not.toBe("");
      expect(event.description.trim()).not.toBe("");
      expect(event.imageAlt.trim()).not.toBe("");
      expect(Number.isNaN(Date.parse(event.startsAt))).toBe(false);
      expect(EVENT_CATEGORIES).toContain(event.category);
      expect(getEventBySlug(EVENTS, event.slug)).toEqual(event);
    }
  });
});
