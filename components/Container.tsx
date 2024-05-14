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
        isAdvancedSearchBar
    } = useSetNavBar();
    return (
        <div className={`${isAdvancedSearchBar ? type === 'navbar' ? 'h-defaultnavheight ' : 'mt-[120px] ' : ' '}
         ${!isAdvancedSearchBar ? type === 'navbar' ? 'h-navheight fixed ' : 'mt-[300px] ' : ' '} bg-white w-full top-0 z-10`} >
            {children}
        </div >
    )
}
export default Container;