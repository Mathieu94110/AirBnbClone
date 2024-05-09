'use client';

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";



const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

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
            .then(() => registerModal.onClose())
            .catch(() => {
                toast.error("Quelque chose c'est mal passé !")
            }).finally(() => {
                setIsLoading(false)
            });

    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen()
    }, [loginModal, registerModal])

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
            <Button outline label='Continuer avec Github' icon={AiFillGithub} onClick={() => signIn("github")} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Vous avez déjà un compte ?
                    </div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        Se connecter
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Inscription' actionLabel="Continuer" onClose={toggle} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default RegisterModal
