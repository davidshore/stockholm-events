import { EventsExplorer } from "@/components/events-explorer";
import { EVENTS } from "@/data/events";

export default function HomePage() {
  return <EventsExplorer events={EVENTS} />;
}

