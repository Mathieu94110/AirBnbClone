import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from 'actions/getCurrentUser';
import getListById from 'actions/getListingById';
import ListingClient from './ListingClient';

interface IParams {
    listingId?: string,
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListById(params);
    const currentUser = await getCurrentUser();
    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;
