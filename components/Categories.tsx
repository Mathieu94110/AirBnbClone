'use client'

import React from 'react'
import Container from './Container'
import { FaSkiing } from "react-icons/fa";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from './CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    { label: "Plage", icon: TbBeach, desciption: "Cette propriété est proche d'une plage" },
    { label: "Campagne", icon: GiWindmill, desciption: "Cette propriété est proche d'une camapagne" },
    { label: "Moderne", icon: MdOutlineVilla, desciption: "Cette propriété est moderne" },
    { label: "Montagne", icon: TbMountain, desciption: "Cette propriété est dans la montagne" },
    { label: "Piscine", icon: TbPool, desciption: "Cette propriété contient une piscine" },
    { label: "Ile", icon: GiIsland, desciption: "Cette propriété est sur une ile" },
    { label: "Lac", icon: GiBoatFishing, desciption: "Cette propriété est proche d'un lac" },
    { label: "Ski", icon: FaSkiing, desciption: "Cette propriété est proche d'une piste de ski" },
    { label: "Chateau", icon: GiCastle, desciption: "Cette propriété est un chateau" },
    { label: "Camping", icon: GiForestCamp, desciption: "Cette propriété est dans un camping" },
    { label: "Cave", icon: GiCaveEntrance, desciption: "Cette propriété contient une cave" },
    { label: "Desert", icon: GiCactus, desciption: "Cette propriété est dans le désert" },
    { label: "Luxe", icon: IoDiamond, desciption: "Cette propriété est luxueuse" },
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
