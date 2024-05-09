import { useState, useEffect } from 'react';

export function useSetNavBar() {
    const [isDefaultSearchBar, setIsDefaultSearchBar] = useState<boolean>(true);

    const handleScroll = (e: Event) => {
        if (window.scrollY >= 30) {
            setIsDefaultSearchBar(false)
        } else {
            setIsDefaultSearchBar(true)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return {
        isDefaultSearchBar,
    };
}