import prisma from "@/libs/prismadb"

export interface IlistingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathRoomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params: IlistingsParams) {
    try {
        const { userId, guestCount,
            roomCount,
            bathRoomCount,
            startDate,
            endDate,
            locationValue,
            category } = params;
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }


        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = { gte: +roomCount }
        }
        if (bathRoomCount) {
            query.bathRoomCount = { gte: +bathRoomCount }
        }
        if (guestCount) {
            query.guestCount = { gte: +guestCount }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [{
                            endDate: { gte: startDate },
                            startDate: { gte: startDate },
                        },
                        {

                            startDate: { lte: endDate },
                            endDate: { gte: endDate }
                        }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
        // listings is returned liked below to avoid only plain objects can be passed to Client Components from Server Components issue
        return listings.map((listing) => ({
            ...listing, createdAt: listing.createdAt.toISOString()
        }))
    } catch (error: any) {
        throw new Error(error)
    }
}