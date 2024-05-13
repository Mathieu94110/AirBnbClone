import { useState, useEffect } from 'react';

export function useSetNavBar() {
    const [isAdvancedSearchBar, setIsAdvancedSearchBar] = useState<boolean>(true);

    const handleScroll = (e: Event) => {
        if (window.scrollY >= 30) {
            setIsAdvancedSearchBar(false)
        } else {
            setIsAdvancedSearchBar(true)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return {
        isAdvancedSearchBar,
    };
}