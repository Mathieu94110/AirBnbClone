import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "actions/getCurrentUser";
import AccomodationsClient from "./AccomodationsClient";
import getListings from "actions/getListings";

const UserAccomodationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Non autorisé"
                    subtitle="Il faut vous connecter"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({ userId: currentUser.id });


    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Aucun logement trouvé"
                    subtitle="Vous n'avez pas créer de logement"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <AccomodationsClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default UserAccomodationsPage;
