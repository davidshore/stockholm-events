import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { EventsExplorer } from "@/components/events-explorer";
import { EVENTS } from "@/data/events";

afterEach(cleanup);

describe("EventsExplorer", () => {
  it("renders event cards with links to their details", () => {
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    expect(
      screen.getByRole("heading", { name: "Jazz under broarna" }),
    ).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Läs mer" })[0]).toHaveAttribute(
      "href",
      "/events/jazz-under-broarna",
    );
  });

  it("filters the visible events when the student searches", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök efter event eller område" }),
      "jazz",
    );

    expect(
      screen.getByRole("heading", { name: "Jazz under broarna" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Fotografiska efter mörkret" }),
    ).not.toBeInTheDocument();
  });

  it("filters events using the category controls", async () => {
    const user = userEvent.setup();
    render(<EventsExplorer events={EVENTS.slice(0, 3)} />);

    await user.click(screen.getByRole("button", { name: "Mat" }));

    expect(
      screen.getByRole("heading", { name: "Södermalm food walk" }),
    ).toBeVisible();
    expect(
      screen.queryByRole("heading", { name: "Jazz under broarna" }),
    ).not.toBeInTheDocument();
  });
});
