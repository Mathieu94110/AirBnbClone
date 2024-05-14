"use client"

import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeListing, SafeUser } from "@/types"
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface AccomodationsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const AccomodationsClient: React.FC<AccomodationsClientProps> = ({ listings,
    currentUser }
) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        fetch(`/api/listings/${id}`, {
            method: 'DELETE'
        }).then(() => { toast.success('Annonce supprimée !'), router.refresh() }).catch((error) => {
            toast.error(error?.response?.data?.error)
        }).finally(() => {
            setDeletingId('')
        })
    }, [router])

    return (
        <Container>
            <Heading
                title="Vos annonces"
                subtitle='Liste de vos annonces'
                pageContent
            />
            <div className="px-12 my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Supprimer l'annonce"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default AccomodationsClient
