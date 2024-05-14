'use client'

import React from 'react'
import { FaSkiing } from "react-icons/fa";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    { label: "Plage", icon: TbBeach, description: "Cette propriété est proche d'une plage" },
    { label: "Campagne", icon: GiWindmill, description: "Cette propriété est proche d'une camapagne" },
    { label: "Moderne", icon: MdOutlineVilla, description: "Cette propriété est moderne" },
    { label: "Montagne", icon: TbMountain, description: "Cette propriété est dans la montagne" },
    { label: "Piscine", icon: TbPool, description: "Cette propriété contient une piscine" },
    { label: "Ile", icon: GiIsland, description: "Cette propriété est sur une ile" },
    { label: "Lac", icon: GiBoatFishing, description: "Cette propriété est proche d'un lac" },
    { label: "Ski", icon: FaSkiing, description: "Cette propriété est proche d'une piste de ski" },
    { label: "Chateau", icon: GiCastle, description: "Cette propriété est un chateau" },
    { label: "Camping", icon: GiForestCamp, description: "Cette propriété est dans un camping" },
    { label: "Cave", icon: GiCaveEntrance, description: "Cette propriété contient une cave" },
    { label: "Desert", icon: GiCactus, description: "Cette propriété est dans le désert" },
    { label: "Luxe", icon: IoDiamond, description: "Cette propriété est luxueuse" },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null
    }
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-8 px-2 bg-white">
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto no-scrollbar">
                {categories.map((item) => (
                    <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
                ))}
            </div>
        </div>
    )
}

export default Categories
