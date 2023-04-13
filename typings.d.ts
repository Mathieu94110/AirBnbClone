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
};

export interface SearchResultsWithCoordinates extends SearchResults {
  lat: number;
  long: number;
}
