import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Search() {
    return (
        <div
            className='
    border-[1px] w-full md:w-auto md:mx-2 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
        >
            <div className='flex flex-row items-center justify-between'>
                <div className='text-sm font-semibold md:px-6 px-4'>
                    N'importe où
                </div>
                <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                    Une semaine
                </div>
                <div className='text-sm md:pl-6 pl-4 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                    Ajouter des voyageurs
                </div>
                <div className='px-2 py-1 bg-rose-500 rounded-full text-white mr-2'>
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{ fontSize: 16 }}
                    />
                </div>
            </div>
        </div >
    )
}
