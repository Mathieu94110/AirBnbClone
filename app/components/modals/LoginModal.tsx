'use client';
import { signIn } from "next-auth/react";
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
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";


const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({ defaultValues: { email: '', password: '' } });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data, redirect: false
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('Connexion établie!');
                router.refresh();
                loginModal.onClose();

                if (callback?.error) {
                    toast.error(callback.error);
                }
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="De retour"
                subtitle='Connectez vous!'
            />
            <Input id="email" label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label='Mot de passe' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label='Continuer avec Github' icon={AiFillGithub} onClick={() => { }} />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>
                        Vous n'avez pas encore de compte ?
                    </div>
                    <div onClick={
                        toggle
                    } className="text-neutral-800 cursor-pointer hover:underline">
                        S'inscrire
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Se connecter' actionLabel="Continuer" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}

export default LoginModal
