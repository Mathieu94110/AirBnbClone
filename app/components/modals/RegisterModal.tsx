'use client';

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Button from "../Button";


const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({ defaultValues: { name: '', email: '', password: '' } });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ keyword: data }),
        })
            .then(() => RegisterModal.onClose())
            .catch((error) => {
                toast.error('Quelque chose c\est mal passé !')
            }).finally(() => {
                setIsLoading(false)
            });

    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Bienvenue sur Airbnb"
                subtitle='Créer un compte!'
            />
            <Input id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label='Nom' disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label='Mot de passe' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continuer avec Google' icon={FcGoogle} onClick={() => { }} />
            <Button outline label='Continuer avec Github' icon={AiFillGithub} onClick={() => { }} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Vous avez déjà un compte ?
                    </div>
                    <div onClick={
                        RegisterModal.onClose
                    } className="text-neutral-800 cursor-pointer hover:underline">
                        Se connecter
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={RegisterModal.isOpen} title='Inscription' actionLabel="Continuer" onClose={RegisterModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default RegisterModal
