import React, { memo, useMemo } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSearchModal from '@/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import useCountries from '@/hooks/useCountries'
import { differenceInDays } from 'date-fns'


const Search = ({ isDefaultSearchBar }: { isDefaultSearchBar: boolean }) => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();
    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return "N'importe ou";
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start)

            if (diff === 0) {
                diff = 1
            }
            return `${diff} Jours`;
        }
        return "N'importe quand"
    }, [startDate, endDate]);


    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Voyageurs`;
        }
        return "Ajouter des voyageurs";
    }, [guestCount]);


    function advancedSearchBar() {
        return (
            <div
                className='border-[1px] w-full md:w-auto md:mx-2 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
            >
                <div className='flex flex-row items-center justify-between'>
                    <div className='text-sm font-semibold md:px-6 px-4'>
                        {locationLabel}
                    </div>
                    <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                        {durationLabel}
                    </div>
                    <div className='text-sm md:pl-6 pl-4 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                        {guestLabel}
                    </div>
                    <div className='px-2 py-1 bg-secondary rounded-full text-white mx-2'>
                        <FontAwesomeIcon
                            icon={faSearch}
                            style={{ fontSize: 16 }}
                        />
                    </div>
                </div>
            </div >
        )
    }

    function defaultSearchBar() {
        return (
            <div
                className='w-full md:w-auto md:mx-2 py-2 rounded-full'
            >
                <div className='flex flex-row items-center justify-between'>
                    <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base  hover:bg-tertiary transition cursor-pointer rounded-full'>Logements</button>
                    <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base hover:bg-tertiary transition cursor-pointer rounded-full'>Expériences</button>
                    <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base hover:bg-tertiary transition cursor-pointer rounded-full'>Expériences en ligne</button>
                </div>
            </div >
        )
    }


    return (
        <div onClick={searchModal.onOpen}>
            {isDefaultSearchBar ? defaultSearchBar() : advancedSearchBar()}
        </div>
    )
}

export default memo(Search, (prevProps, nextProps) => { return prevProps !== nextProps ? false : true })