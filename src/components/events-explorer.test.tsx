import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EventsExplorer } from "@/components/events-explorer";
import { EVENTS } from "@/data/events";

afterEach(cleanup);

describe("EventsExplorer", () => {
  it("renders the supplied events with working detail links", () => {
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    for (const event of EVENTS.slice(0, 3)) {
      expect(screen.getByText(event.title)).toBeVisible();
      expect(
        document.querySelector(`a[href="/events/${event.slug}"]`),
      ).not.toBeNull();
    }

    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(screen.getByRole("button", { name: "Alla" })).toBeVisible();
  });

  it("filters the visible events when the student searches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.type(
      screen.getByRole("searchbox"),
      "SÖDERMALM",
    );

    expect(
      screen.getByRole("heading", { name: "Jazz under broarna" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Södermalm food walk" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Fotografiska efter mörkret" }),
    ).not.toBeInTheDocument();
  });

  it("combines search and category filters", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS} />);

    await user.type(
      screen.getByRole("searchbox"),
      "Vasastan",
    );
    await user.click(screen.getByRole("button", { name: "Kultur" }));

    expect(
      screen.getByRole("heading", { name: "Designmarknad i Vasaparken" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Kod & kaffe: frontendkväll" }),
    ).not.toBeInTheDocument();
  });

  it("shows no event results when nothing matches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS} />);

    await user.type(
      screen.getByRole("searchbox"),
      "månpromenad",
    );

    for (const event of EVENTS) {
      expect(screen.queryByText(event.title)).not.toBeInTheDocument();
    }
  });

  it("restores all matching events when Alla is selected", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.click(screen.getByRole("button", { name: "Mat" }));
    expect(screen.getByText("Södermalm food walk")).toBeVisible();
    expect(screen.queryByText("Jazz under broarna")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Alla" }));
    for (const event of EVENTS.slice(0, 3)) {
      expect(screen.getByText(event.title)).toBeVisible();
    }
  });
});
