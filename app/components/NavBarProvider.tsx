"use client";

import { createContext, useState } from "react";
interface NavBarContextType {
    isDefaultSearchBar: boolean;
    setIsDefaultSearchBar: (v: boolean) => void
}

export const NavBarContext = createContext<NavBarContextType>({} as NavBarContextType);

const NavBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDefaultSearchBar, setIsDefaultSearchBar] = useState<boolean>(true);
    return (
        <NavBarContext.Provider value={{ isDefaultSearchBar, setIsDefaultSearchBar }}>
            {children}
        </NavBarContext.Provider>
    );
};

export default NavBarProvider;