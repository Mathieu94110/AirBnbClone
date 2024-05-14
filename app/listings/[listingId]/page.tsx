/* eslint-disable */
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from 'actions/getCurrentUser';
import getListById from 'actions/getListingById';
import ListingClient from './ListingClient';
import getReservations from 'actions/getReservations';

interface IParams {
    listingId?: string,
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListById(params) as any;
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);



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
                reservations={
                    reservations
                }
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;
