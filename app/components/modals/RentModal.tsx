'use client'
import { useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from '../inputs/CountrySelect';
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}



const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, imageSrc: '', price: 1, title: "", description: ""
        }
    })

    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Créer'
        }
        return 'Continuer'
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Précédent'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title='Lequel de ces choix correspond le mieux à votre logement ?' subtitle='Choisissez une catégorie' />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div className="col-span-1">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Ou se situe le logement ?"
                    subtitle='Aider des invités à vous trouver!'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map />
            </div>
        )
    }

    return (
        <Modal
            title="Mettre mon logement sur Airbnb"
            onClose={rentModal.onClose}
            onSubmit={onNext}
            isOpen={rentModal.isOpen}
            actionLabel='Confirmer'
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal
