import prisma from "@/libs/prismadb"

export async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
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