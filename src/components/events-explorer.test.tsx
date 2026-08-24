import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EventsExplorer } from "@/components/events-explorer";
import { EVENTS } from "@/data/events";

afterEach(cleanup);

describe("EventsExplorer", () => {
  it("renders event cards with useful information and detail links", () => {
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("3 träffar")).toBeVisible();
    expect(screen.getByRole("button", { name: "Alla" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: "Jazz under broarna" }),
    ).toBeVisible();
    const jazzCard = screen
      .getByRole("heading", { name: "Jazz under broarna" })
      .closest("article");

    expect(jazzCard).not.toBeNull();
    expect(within(jazzCard!).getByRole("img")).toHaveAccessibleName(
      "En livemusikscen med publik och varma lampor",
    );
    expect(within(jazzCard!).getByRole("time")).toHaveAttribute(
      "datetime",
      EVENTS[0].startsAt,
    );
    expect(
      within(jazzCard!).getByRole("link", { name: "Läs mer" }),
    ).toHaveAttribute("href", "/events/jazz-under-broarna");
    expect(
      screen.getByRole("link", { name: "Utforska veckans events" }),
    ).toHaveAttribute("href", "#events");
    expect(document.querySelector("#events")).toBeInTheDocument();
  });

  it("filters the visible events when the student searches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök efter event eller område" }),
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
    expect(screen.getByText("2 träffar")).toBeVisible();
  });

  it("combines search and category filters", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök efter event eller område" }),
      "Vasastan",
    );
    await user.click(screen.getByRole("button", { name: "Kultur" }));

    expect(
      screen.getByRole("heading", { name: "Designmarknad i Vasaparken" }),
    ).toBeVisible();
    expect(screen.getByText("1 träffar")).toBeVisible();
    expect(screen.getByRole("button", { name: "Kultur" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.queryByRole("heading", { name: "Kod & kaffe: frontendkväll" }),
    ).not.toBeInTheDocument();
  });

  it("shows a helpful empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök efter event eller område" }),
      "månpromenad",
    );

    expect(
      screen.getByRole("heading", {
        name: "Inga events matchar din sökning",
      }),
    ).toBeVisible();
    expect(screen.getByText("0 träffar")).toBeVisible();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });

  it("restores all matching events when Alla is selected", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.click(screen.getByRole("button", { name: "Mat" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Alla" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Alla" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
