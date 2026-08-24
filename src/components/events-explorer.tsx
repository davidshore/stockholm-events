"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EventInsights } from "@/components/event-insights";
import { WeatherPromotion } from "@/components/weather-promotion";
import {
  EVENT_CATEGORIES,
  filterEvents,
  formatEventDate,
  type EventCategoryFilter,
} from "@/lib/events";
import type { StockholmEvent } from "@/types/event";

const heroImageUrl =
  "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=3200&q=96";

export function EventsExplorer({ events }: { events: StockholmEvent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategoryFilter>("Alla");
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const heroTimer = window.setTimeout(() => setShowHeroImage(true), 450);

    return () => window.clearTimeout(heroTimer);
  }, []);

  const visibleEvents = useMemo(
    () => filterEvents(events, query, category),
    [category, events, query],
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">25–30 augusti · Stockholm</p>
          <h1>Hitta något oväntat runt nästa hörn.</h1>
          <p>
            Konserter, mat, design och möten – handplockade för en vecka
            i sensommarstaden.
          </p>
          <a className="hero-button" href="#events">
            Utforska veckans events
          </a>
        </div>
        <div className="hero-media">
          {showHeroImage ? (
            <img
              alt="Stockholms stad och vatten i gyllene kvällsljus"
              fetchPriority="low"
              loading="lazy"
              src={heroImageUrl}
            />
          ) : (
            <div className="hero-placeholder">Stockholm vaknar snart…</div>
          )}
        </div>
      </section>

      <WeatherPromotion />

      <section className="events-section" id="events">
        <header className="section-heading">
          <div>
            <p className="eyebrow">Veckans urval</p>
            <h2>Events i Stockholm</h2>
          </div>
          <div className="section-heading-actions">
            <p>{visibleEvents.length} träffar</p>
            <button
              aria-expanded={showInsights}
              onClick={() => setShowInsights((isVisible) => !isVisible)}
              type="button"
            >
              {showInsights ? "Dölj veckans puls" : "Visa veckans puls"}
            </button>
          </div>
        </header>

        <div className="filters" aria-label="Filtrera events">
          <label>
            <span>Sök efter event eller område</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sök musik, Södermalm…"
              type="search"
              value={query}
            />
          </label>

          <div className="category-list" aria-label="Kategorier">
            {EVENT_CATEGORIES.map((option) => (
              <button
                aria-pressed={category === option}
                className={category === option ? "active" : undefined}
                key={option}
                onClick={() => setCategory(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showInsights ? <EventInsights events={visibleEvents} /> : null}

        {visibleEvents.length > 0 ? (
          <div className="events-grid">
            {visibleEvents.map((event) => (
              <EventCard event={event} key={event.slug} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Inga events matchar din sökning</h3>
            <p>Testa ett annat område eller välj kategorin Alla.</p>
          </div>
        )}
      </section>
    </main>
  );
}

function EventCard({ event }: { event: StockholmEvent }) {
  return (
    <article className="event-card">
      <img alt={event.imageAlt} src={event.imageUrl} />
      <div className="event-card-body">
        <div className="event-meta">
          <span>{event.category}</span>
          <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
        </div>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
        <div className="event-location">
          <span>{event.venue}</span>
          <span>{event.area}</span>
        </div>
        <div className="event-card-footer">
          <strong>{event.price}</strong>
          <Link href={`/events/${event.slug}`}>Läs mer</Link>
        </div>
      </div>
    </article>
  );
}
