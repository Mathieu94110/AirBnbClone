'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyState {
    title?: string,
    subtitle?: string,
    showReset?: boolean
}

const EmptyState: React.FC<EmptyState> = ({ title = "Pas de correspondance", subtitle = "Essayer de supprimer ou de changer des filtres", showReset }) => {
    const router = useRouter()
    return (
        <div className="flex h-[60vh] flex-col gap-2 justify-center items-center">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="w-48 mt-4">
                {/* {showReset && (<Button outline label="Supprimer les filtres" onClick={() => router.push('/user/accomodations')} /> */}
                {showReset && (<Button outline label="Supprimer les filtres" onClick={() => router.push('/')} />
                )}
            </div>
        </div>

    )
}

export default EmptyState
