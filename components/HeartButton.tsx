'use client'

import useFavorite from "@/hooks/useFavorites"
import { SafeUser } from "@/types"
import { AiFillHeart } from "react-icons/ai"

interface HeartButtonProps {
    listingId: string,
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    const { isFavorited, toggleFavorite } = useFavorite({ listingId, currentUser });

    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
            <AiFillHeart size={24} className={`absolute top-[2px] right-[2px] ${isFavorited ? 'fill-rose-500' : 'fill-rose-500/70'}`} />
        </div>
    )
}

export default HeartButton
