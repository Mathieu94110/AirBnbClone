"use client"

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeListing, SafeUser } from "@/types"
import { useEffect, useState } from "react";
import ListingCard from "@/components/listings/ListingCard";
import LargeCard from "./LargeCard";
import ClientOnly from "./ClientOnly";
import EmptyState from "./EmptyState";

interface TripsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const HomeListing: React.FC<TripsClientProps> = ({ listings,
    currentUser }
) => {
    const [inFrance, setInFrance] = useState<SafeListing[]>([]);
    const [allOverTheWorld, setAllOverTheWorld] = useState<SafeListing[]>([]);

    useEffect(() => {
        const InFranceAccomodations = listings.filter((listing) => listing.locationValue && listing.locationValue === "FR");
        const OthersAccomodations = listings.filter((listing) => !listing.locationValue || listing.locationValue !== "FR");
        setInFrance(InFranceAccomodations);
        setAllOverTheWorld(OthersAccomodations);
    }, [listings]);


    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Aucun logement trouvé !"
                    subtitle="Il semblerait ne pas y avoir de logements disponibles avec ces critères !"
                />
                <LargeCard
                    image="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666"
                    title="Les locations les plus plébisitées"
                    description="Offres recommandées par airbnb"
                    buttonText="Soyez inspiré"
                />
            </ClientOnly>
        )
    }

    return (
        <Container>
            {inFrance.length ? (<>   <Heading
                title="En France"
                subtitle='Logements situés en France'
                pageContent
            />
                <div className=" px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {inFrance.map((listing) => <ListingCard key={listing.id} data={listing} currentUser={currentUser} />)}
                </div></>
            )
                : null
            }
            {allOverTheWorld.length ? (
                <>
                    <Heading
                        title="A l'étranger"
                        subtitle="Logements situés à l'étranger"
                        pageContent
                    />
                    <div className=" px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {allOverTheWorld.map((listing) => <ListingCard key={listing.id} data={listing} currentUser={currentUser} />)}
                    </div>
                </>
            )
                : null
            }
            <LargeCard
                image="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666"
                title="Les locations les plus plébisitées"
                description="Offres recommandées par airbnb"
                buttonText="Soyez inspiré"
            />
        </Container>
    )
}

export default HomeListing;