import ClientOnly from '@/components/ClientOnly'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';
import getCurrentUser from 'actions/getCurrentUser';
import getListings, { IlistingsParams } from 'actions/getListings';
import AccomodationsClient from './AccomodationsClient';

interface IAccomodationsPageProps {
    searchParams: IlistingsParams
}

const AccomodationsPage = async ({ searchParams }: IAccomodationsPageProps) => {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        <ClientOnly>
            <EmptyState showReset />
        </ClientOnly>
    }
    return (
        <ClientOnly>
            <Container>
                <AccomodationsClient listings={listings} currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default AccomodationsPage
