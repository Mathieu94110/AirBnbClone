'use client'

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types"
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import RentMap from "../RentMap";

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathRoomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string
    } | undefined
    locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latIng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Proposé par {user?.name}</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} invités</div>
                    <div>{roomCount} chambres</div>
                    <div>{bathRoomCount} {bathRoomCount > 1 ? 'salles ' : 'salle '} de bain</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <RentMap center={coordinates} />
        </div>
    )
}

export default ListingInfo
