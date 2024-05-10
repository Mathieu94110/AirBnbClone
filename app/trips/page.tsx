import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "actions/getCurrentUser";
import getReservations from "actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

    const reservations = await getReservations({ userId: currentUser.id });


    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Aucun voyage trouvé"
                    subtitle="Vous n'avez pas réserver de voyages"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;