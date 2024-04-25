import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const DefaultSearch = () => {
    return (
        <div
            className='border-[1px] w-full md:w-auto md:mx-2 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
        >
            <div className='flex flex-row items-center justify-between'>
                <div className='text-sm font-semibold md:px-6 px-4'>
                    <div>Destination</div>
                    <div className='font-normal'>Rechercher une destination</div>
                </div>
                <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                    <div>Arrivée</div>
                    <div className='font-normal'>Quand?</div>
                </div>
                <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                    <div>Départ</div>
                    <div className='font-normal'>Quand?</div>
                </div>
                <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                    <div>Voyageurs</div>
                    <div className='font-normal'>Ajouter des voyageurs</div>
                </div>

                <div className='px-2 py-1 bg-secondary rounded-full text-white mr-2'>
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{ fontSize: 16 }}
                    />
                </div>
            </div>
        </div >
    )
}

export default DefaultSearch
