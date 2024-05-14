import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getCurrentUser from "actions/getCurrentUser"
import getReservations from "actions/getReservations"
import ReservationsClient from "./ReservationsClient"

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Non authorisé'
                    subtitle="Il faut vous connecter"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    }
    );

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Aucune réservation trouvée !"
                    subtitle="Il semblerait que vous n'ayez aucune réservation en cours !"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage
