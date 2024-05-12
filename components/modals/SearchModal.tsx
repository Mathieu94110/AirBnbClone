"use client";

import qs from 'query-string';
import { Range } from 'react-date-range';
import useSearchModal from '@/hooks/useSearchModal'
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import Calendar from '../inputs/Calendar';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}



const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>()
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const Map = useMemo(() => dynamic(() => import('../../components/RentMap'), {
        ssr: false
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange?.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange?.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: "/user/accomodations",
            query: updatedQuery
        }, { skipNull: true });
        // const url = qs.stringifyUrl({
        //     url: "/",
        //     query: updatedQuery
        // }, { skipNull: true });
        setStep(STEPS.LOCATION);
        searchModal.onClose();
        alert(url)
        router.push(url)
    }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Rechercher"
        }
        return 'Suite'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Précédent'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Ou voulez vous aller ?"
                subtitle='Trouver la destination parfaite !'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
            />
            <hr />
            <Map center={location?.latIng} />
        </div>
    )
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Quand prévoyez-vous de voyoger ?"
                    subtitle='Soyez sur que vous serez disponible !'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Plus d'informations"
                    subtitle='Trouver le lieu parfait !'
                />
                <Counter
                    title='Invités'
                    subtitle="Indiquer le nombre d'invités"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Chambres'
                    subtitle="Indiquer le nombre de chambres"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Invités'
                    subtitle="Indiquer le nombre de salles de bain"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title='Filtres'
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            body={bodyContent}
        />
    )
}

export default SearchModal;
