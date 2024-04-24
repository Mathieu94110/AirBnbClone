'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt='AirBnb logo'
            className="hidden mb:block cursor-pointer"
            height='100'
            width='200'
            src='/public/airbnb-logo.png'
        />
    )
}

export default Logo;