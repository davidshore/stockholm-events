"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StockholmEvent } from "@/types/event";

export function EventInsights({ events }: { events: StockholmEvent[] }) {
  const eventsPerDay = Array.from(
    events.reduce((days, event) => {
      const label = new Intl.DateTimeFormat("sv-SE", {
        weekday: "short",
      }).format(new Date(event.startsAt));

      days.set(label, (days.get(label) ?? 0) + 1);
      return days;
    }, new Map<string, number>()),
    ([day, count]) => ({ count, day }),
  );

  return (
    <section className="event-insights" aria-labelledby="insights-heading">
      <div>
        <p className="eyebrow">Veckans puls</p>
        <h3 id="insights-heading">När händer det mest?</h3>
        <p>Diagrammet visar antal event per veckodag i ditt aktuella urval.</p>
      </div>
      <div className="event-insights-chart">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={eventsPerDay}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} width={28} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#194d3a"
              name="Events"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
