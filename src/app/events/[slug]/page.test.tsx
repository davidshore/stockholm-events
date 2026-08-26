import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EVENTS } from "@/data/events";
import EventDetailsPage, {
  generateMetadata,
  generateStaticParams,
} from "./page";

afterEach(cleanup);

describe("EventDetailsPage", () => {
  it("generates a details route for every event", () => {
    expect(generateStaticParams()).toEqual(
      EVENTS.map((event) => ({ slug: event.slug })),
    );
  });

  it("generates useful metadata for an event", async () => {
    const event = EVENTS[0];
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: event.slug }),
    });

    expect(String(metadata.title)).toContain(event.title);
    expect(metadata.description).toBe(event.summary);
  });

  it("shows the selected event and a way back to the event list", async () => {
    const event = EVENTS[0];
    const page = await EventDetailsPage({
      params: Promise.resolve({ slug: event.slug }),
    });

    const { container } = render(page);

    expect(screen.getByRole("heading", { name: event.title })).toBeVisible();
    expect(screen.getByText(event.description)).toBeVisible();
    expect(screen.getByText(`${event.venue}, ${event.area}`)).toBeVisible();
    expect(container.querySelector('a[href="/#events"]')).not.toBeNull();
  });
});
