'use client'
import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, imageSrc: '', price: 1, title: "", description: ""
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const RentMap = useMemo(() => dynamic(() => import('../../components/RentMap'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);
        fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => { toast.success('Annonce créée'); router.refresh(); reset(); setStep(STEPS.CATEGORY); rentModal.onClose() })
            .catch(() => {
                toast.error("Quelque chose c'est mal passé !")
            }).finally(() => {
                setIsLoading(false)
            });
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
                    <div className="col-span-1" key={item.label}>
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
                    subtitle='Aider des invités à vous trouver !'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <RentMap center={location?.latIng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Partager des informations sur le logement"
                    subtitle='Quels sont ces caractéristiques ?'
                />
                <Counter title="Nombre d'invités" subtitle="Combien d'invités ?" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} />
                <Counter title="Chambres" subtitle="Combien de chambres ?" value={roomCount} onChange={(value) => setCustomValue('roomCount', value)} />
                <Counter title="Salles de bain" subtitle="Combien de salle de bain ?" value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>
        )
    }


    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Ajouter une photo du logement ?"
                    subtitle='Montrer à quoi ressemble votre logement !'
                />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Comment décririez-vous votre logement ?"
                    subtitle="De la meilleure des manières !"
                />
                <Input
                    id="title"
                    label="Titre"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Maintenant indiquer votre prix !"
                    subtitle='A combien se facture la nuit ?'
                />

                <Input
                    id="price"
                    label="Prix"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            title="Mettre mon logement sur Airbnb"
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            isOpen={rentModal.isOpen}
            actionLabel='Confirmer'
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal
