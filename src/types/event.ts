export type EventCategory =
  | "Kultur"
  | "Mat"
  | "Musik"
  | "Teknik"
  | "Utomhus";

export type StockholmEvent = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: EventCategory;
  startsAt: string;
  venue: string;
  area: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
};

