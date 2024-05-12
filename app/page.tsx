import ClientOnly from '@/components/ClientOnly'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState';
import getCurrentUser from 'actions/getCurrentUser';
import getListings, { IlistingsParams } from 'actions/getListings';
import HomeListing from '@/components/HomeListing';

interface IAccomodationsPageProps {
    searchParams: IlistingsParams
}

const HomePage = async ({ searchParams }: IAccomodationsPageProps) => {
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
                <HomeListing listings={listings} currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default HomePage
