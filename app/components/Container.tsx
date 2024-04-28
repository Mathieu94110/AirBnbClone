"use client";

import { useSetNavBar } from "@/hooks/useSetNavBar";
interface ContainerProps {
    children: React.ReactNode,
    type?: 'navbar' | 'page'
}

const Container: React.FC<ContainerProps> = ({
    children,
    type
}) => {
    const {
        isDefaultSearchBar
    } = useSetNavBar();
    return (
        <div className={`${isDefaultSearchBar ? type === 'navbar' ? 'h-defaultnavheight ' : 'mt-[100px] ' : ' '}
         ${!isDefaultSearchBar ? type === 'navbar' ? 'h-navheight fixed ' : 'mt-[220px] ' : ' '} bg-white w-full top-0 z-10`} >
            {children}
        </div >
    )
}
export default Container;