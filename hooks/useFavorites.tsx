import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";
import useLoginModal from "./useLoginModal";

interface IUserFavorites {
    listingId: string;
    currentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUserFavorites) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const isFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request;
            if (isFavorited) {
                request = () => fetch(`/api/favorites/${listingId}`, {
                    method: 'DELETE'
                })
            } else {
                request = () => fetch(`/api/favorites/${listingId}`, {
                    method: 'POST'
                })
            }

            await request();
            router.refresh();
            toast.success('Succès');
        } catch (error) {
            toast.error("Quelque chose c'est mal passé !")
        }
    }, [currentUser, isFavorited, listingId, loginModal, router]);
    return {
        isFavorited, toggleFavorite
    }
}

export default useFavorite;