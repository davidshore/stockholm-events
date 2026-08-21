import type { StockholmEvent } from "@/types/event";

export const EVENTS: StockholmEvent[] = [
  {
    slug: "jazz-under-broarna",
    title: "Jazz under broarna",
    summary: "En intim kväll med unga jazzmusiker vid vattnet.",
    description:
      "Tre lokala jazzakter spelar vid kajen på Södermalm. Ta med en varm tröja och kom tidigt om du vill sitta nära scenen.",
    category: "Musik",
    startsAt: "2026-08-25T18:30:00+02:00",
    venue: "Hornstulls strand",
    area: "Södermalm",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "En livemusikscen med publik och varma lampor",
  },
  {
    slug: "fotografiska-efter-morkret",
    title: "Fotografiska efter mörkret",
    summary: "Kvällsöppet med samtal om dokumentärfotografi.",
    description:
      "Upptäck den nya utställningen efter ordinarie öppettid. Kvällen innehåller ett kort konstnärssamtal och en guidad visning.",
    category: "Kultur",
    startsAt: "2026-08-25T19:00:00+02:00",
    venue: "Fotografiska",
    area: "Stadsgården",
    price: "165 kr",
    imageUrl:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "Besökare i ett modernt galleri",
  },
  {
    slug: "sodermalm-food-walk",
    title: "Södermalm food walk",
    summary: "Smaka dig genom små restauranger och bagerier.",
    description:
      "En vandring i liten grupp med fem stopp, från surdegsbageri till modern svensk street food. Vegetariskt alternativ finns.",
    category: "Mat",
    startsAt: "2026-08-26T11:30:00+02:00",
    venue: "Start vid Mariatorget",
    area: "Södermalm",
    price: "395 kr",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "Ett bord fyllt med färgstarka maträtter",
  },
  {
    slug: "designmarknad-vasaparken",
    title: "Designmarknad i Vasaparken",
    summary: "Keramik, tryck och småskalig design från Stockholm.",
    description:
      "Möt lokala formgivare och illustratörer. Marknaden har ett trettiotal utställare och en liten verkstad för barn och vuxna.",
    category: "Kultur",
    startsAt: "2026-08-29T10:00:00+02:00",
    venue: "Vasaparken",
    area: "Vasastan",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "Färgglada produkter på en utomhusmarknad",
  },
  {
    slug: "kod-och-kaffe",
    title: "Kod & kaffe: frontendkväll",
    summary: "Lightning talks och öppen kodstuga för webbutvecklare.",
    description:
      "En avslappnad meetup med tre korta presentationer om moderna webbgränssnitt. Efteråt finns tid för frågor, parprogrammering och kaffe.",
    category: "Teknik",
    startsAt: "2026-08-27T17:30:00+02:00",
    venue: "Norrsken House",
    area: "Vasastan",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "En grupp som arbetar tillsammans vid bärbara datorer",
  },
  {
    slug: "djurgarden-trail-run",
    title: "Djurgården trail run",
    summary: "En social löprunda på åtta kilometer i grönska.",
    description:
      "Vi springer i samtalstempo på stigar runt Norra Djurgården. Alla som kan springa åtta kilometer utan paus är välkomna.",
    category: "Utomhus",
    startsAt: "2026-08-29T09:00:00+02:00",
    venue: "Fiskartorpet",
    area: "Norra Djurgården",
    price: "80 kr",
    imageUrl:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "Löpare på en skogsstig",
  },
  {
    slug: "film-under-stjarnorna",
    title: "Film under stjärnorna",
    summary: "Utomhusbio med en svensk klassiker och foodtrucks.",
    description:
      "Ta med filt och något varmt att dricka. Filmen börjar när solen gått ner, men området öppnar tidigare med mat och musik.",
    category: "Kultur",
    startsAt: "2026-08-29T20:30:00+02:00",
    venue: "Rålambshovsparken",
    area: "Kungsholmen",
    price: "Gratis",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "En biosalong med upplyst filmduk",
  },
  {
    slug: "skargardskvall-skeppsholmen",
    title: "Skärgårdskväll på Skeppsholmen",
    summary: "Mat, berättelser och musik med utsikt över vattnet.",
    description:
      "En sensommarkväll som samlar skärgårdskök, livemusik och korta berättelser om livet på öarna runt Stockholm.",
    category: "Mat",
    startsAt: "2026-08-30T16:00:00+02:00",
    venue: "Östra Brobänken",
    area: "Skeppsholmen",
    price: "Från 120 kr",
    imageUrl:
      "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1800&q=92",
    imageAlt: "Stockholms stad och vatten i kvällsljus",
  },
];

