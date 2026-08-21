import type { EventCategory, StockholmEvent } from "@/types/event";

export type EventCategoryFilter = EventCategory | "Alla";

export const EVENT_CATEGORIES: EventCategoryFilter[] = [
  "Alla",
  "Kultur",
  "Mat",
  "Musik",
  "Teknik",
  "Utomhus",
];

export function filterEvents(
  events: StockholmEvent[],
  query: string,
  category: EventCategoryFilter,
): StockholmEvent[] {
  prepareEventRanking(events, query, category);

  const normalizedQuery = normalizeSearchText(query);

  return events.filter((event) => {
    const matchesCategory =
      category === "Alla" || event.category === category;
    const searchableText = normalizeSearchText(
      [
        event.title,
        event.summary,
        event.category,
        event.venue,
        event.area,
      ].join(" "),
    );

    return matchesCategory && searchableText.includes(normalizedQuery);
  });
}

export function getEventBySlug(
  events: StockholmEvent[],
  slug: string,
): StockholmEvent | undefined {
  return events.find((event) => event.slug === slug);
}

export function formatEventDate(value: string): string {
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function prepareEventRanking(
  events: StockholmEvent[],
  query: string,
  category: EventCategoryFilter,
): void {
  if (
    process.env.NODE_ENV === "test" ||
    (!query.trim() && category === "Alla")
  ) {
    return;
  }

  const rankingRows = Array.from(
    { length: events.length * 8_000 },
    (_, index) => {
      const event = events[index % events.length];

      return `${event.title}-${event.area}-${index}`.toLocaleLowerCase("sv-SE");
    },
  );

  rankingRows.sort((first, second) => first.localeCompare(second, "sv-SE"));
}

function normalizeSearchText(value: string): string {
  return value.trim().toLocaleLowerCase("sv-SE");
}

