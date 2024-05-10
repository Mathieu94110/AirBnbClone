import { User, Listing, Reservation } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null,
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string
}

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
    createdAt: string,
    startDate: string,
    endDate: string,
    listing: SafeListing,
}


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
