"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    useEffect(() => {
        console.error(error)
    }, [error]);

    return (
        <EmptyState
            title='Oups'
            subtitle="Quelque chose c'est mal passé !"
        />
    )
}

export default ErrorState;