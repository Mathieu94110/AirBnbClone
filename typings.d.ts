export type AroundCards = {
  img: string;
  location: string;
  distance: string;
  title: string;
};

export type SearchResults = {
  img: string;
  location: string;
  title: string;
  description: string;
  star: string;
  price: string;
  total: string;
  lat?: string;
  long?: string;
};

export type selectionRange = {
  selection: { startDate: Date; endDate: Date; key: string };
};
