'use client';

import { faBars, faGlobe, faL, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useState } from 'react'
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import RentModal from '../modals/RentModal';
import useRentModal from '@/hooks/useRentModal';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const toggleOpen = (() => {
        setIsOpen((value) => !value)
    })
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Mettre son logement sur Airbnb
                </div>
                <FontAwesomeIcon
                    icon={faGlobe}
                    className=" h-6 cursor-pointer inline"
                />
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3  rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                    <FontAwesomeIcon
                        icon={faBars}
                        className="h-4 cursor-pointer"
                    />
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="hidden md:block h-6 cursor-pointer"
                    />
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label='Mes séjours'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Mes favoris'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Mes réservations'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Mes logements'
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label='Mettre mon logement sur Airbnb'
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label='Connexion'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Inscription'
                                />
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>

    )
}
export default UserMenu;