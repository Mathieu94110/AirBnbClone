import React, { memo, useMemo, useRef } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useSearchModal from '@/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import useCountries from '@/hooks/useCountries'
import { differenceInDays } from 'date-fns'
import { CSSTransition } from 'react-transition-group';

const Search = ({ isAdvancedSearchBar }: { isAdvancedSearchBar: boolean }) => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();
    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');
    const searchBarRef = useRef(null);

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


    function defaultSearchBar() {
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

    function advancedSearchBar() {
        return (
            <>
                <div
                    className='w-full md:w-auto md:mx-2 py-2 rounded-full'
                >
                    <div className='flex flex-row items-center justify-between'>
                        <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base  hover:bg-tertiary transition cursor-pointer rounded-full'>Logements</button>
                        <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base hover:bg-tertiary transition cursor-pointer rounded-full'>Expériences</button>
                        <button className='font-semibold md:px-6 sm:text-sm px-2 py-3 text-base hover:bg-tertiary transition cursor-pointer rounded-full'>Expériences en ligne</button>
                    </div>
                </div >
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

                        <div className='px-2 py-1 bg-secondary rounded-full text-white mx-2'>
                            <FontAwesomeIcon
                                icon={faSearch}
                                style={{ fontSize: 16 }}
                            />
                        </div>
                    </div>
                </div >
            </>
        )
    }


    return (
        <CSSTransition in={isAdvancedSearchBar} nodeRef={searchBarRef} classNames="search-bar" timeout={300} >
            <div onClick={searchModal.onOpen} ref={searchBarRef}>
                {isAdvancedSearchBar ? advancedSearchBar() : defaultSearchBar()}
            </div>
        </CSSTransition>
    )
}

export default memo(Search, (prevProps, nextProps) => { return prevProps !== nextProps ? false : true })