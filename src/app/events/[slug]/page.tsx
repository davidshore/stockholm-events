import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENTS } from "@/data/events";
import { formatEventDate, getEventBySlug } from "@/lib/events";

type EventDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(EVENTS, slug);

  return event
    ? {
        title: `${event.title} · Stockholm Pulse`,
        description: event.summary,
      }
    : {};
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(EVENTS, slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="event-details-page">
      <Link className="back-link" href="/#events">
        ← Tillbaka till alla events
      </Link>

      <article className="event-details">
        <div className="event-details-image">
          <img alt={event.imageAlt} src={event.imageUrl} />
        </div>
        <div className="event-details-content">
          <p className="eyebrow">{event.category}</p>
          <h1>{event.title}</h1>
          <p className="event-details-lead">{event.summary}</p>
          <p>{event.description}</p>

          <dl>
            <div>
              <dt>När</dt>
              <dd>{formatEventDate(event.startsAt)}</dd>
            </div>
            <div>
              <dt>Var</dt>
              <dd>
                {event.venue}, {event.area}
              </dd>
            </div>
            <div>
              <dt>Pris</dt>
              <dd>{event.price}</dd>
            </div>
          </dl>

        </div>
      </article>
    </main>
  );
}
