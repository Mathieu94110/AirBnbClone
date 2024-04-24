import React, { Suspense } from 'react'
import Home from './pages'

async function Page() {
    const home: JSX.Element = await Home()
    return (
        <>
            <Suspense fallback={<>Loading...</>}>
                {home}
            </Suspense>

        </>
    )
}

export default Page
