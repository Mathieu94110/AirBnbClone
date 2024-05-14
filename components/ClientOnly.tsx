'use client'

import React, { useEffect, useState } from 'react'
import Loader from './loader';
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return <Loader />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly
