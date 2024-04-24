'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt='AirBnb logo'
            className="hidden md:block cursor-pointer"
            width={100}
            height={50}
            src='/images/airbnb-logo.png'
        />
    )
}

export default Logo;