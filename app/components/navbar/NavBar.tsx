"use client"

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faGlobe,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../Container";
import DefaultSearch from "./DefaultSearch";
import { useSetNavBar } from "@/hooks/useSetNavbar";

function NavBar({ placeholder }: { placeholder: string }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  // const [isDefaultSearchBar, setIsDefaultSearchBar] = useState<boolean>(true);
  const router = useRouter();

  // const handleScroll = (e: Event) => {
  //   if (window.scrollY >= 30) {
  //     setIsDefaultSearchBar(false)
  //   } else {
  //     setIsDefaultSearchBar(true)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   }
  // }, []);
  const {
    isDefaultSearchBar
  } = useSetNavBar();

  const selectedRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges: RangeKeyDict) {
    setStartDate(ranges.selection.startDate!);
    setEndDate(ranges.selection.endDate!);
  }

  function resetInput() {
    setSearchInput("");
  }

  function search() {
    if (!searchInput) return;

    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });

    setSearchInput("");
  }

  return <div className={`${isDefaultSearchBar ? 'h-defaultnavheight ' : 'h-navheight '}bg-white fixed w-full shadow-sm py-4 border-b-[1px] top-0 z-10`}>
    <Container>
      <div className=" flex flex-row items-center justify-between gap-3 md:gap-0">
        <div
          onClick={() => router.push("/")}
          className="flex flex-row items-center justify-between gap-3 md:gap-0"
        >
          <Logo />
        </div>
        <div>
          <Search isDefaultSearchBar={isDefaultSearchBar} />
          {isDefaultSearchBar ? <DefaultSearch /> : null}
        </div>
        {/* <div className="flex items-center md:border-2 rounded-full md:shadow-sm p-2">
    <input
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && search()}
      placeholder={placeholder}
      className="flex-grow text-sm text-gray-600 pl-5 placeholder-gray-400 outline-none bg-transparent max-sm:pl-0 max-md:mr-2"
    />
    <FontAwesomeIcon
      icon={faSearch}
      style={{ fontSize: 24 }}
      className="h-8 hidden md:inline-flex p-2 mx-auto cursor-pointer md:mx-2 bg-red-400 rounded-full text-white"
    />
  </div> */}
        <div className="hidden flex items-center text-gray-500 justify-end space-x-4 sm:inline-flex max-sm:col-span-2">
          <UserMenu />
        </div>
        {
          searchInput && (
            <div className="flex flex-col col-span-3 mx-auto mt-0">
              <DateRangePicker
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                ranges={[selectedRange]}
                onChange={handleSelect}
              />
              <div className="flex items-center border-b mb-4">
                <h2 className="text-2xl flex-grow font-semibold">
                  Nombre d&apos;invités
                </h2>

                <input
                  className="w-12 pl-2 text-lg outline-none text-red-400"
                  type="number"
                  value={noOfGuests}
                  onChange={(e) => setNoOfGuests(Number(e.target.value))}
                />
              </div>
              <div className="flex">
                <button onClick={resetInput} className="flex-grow text-gray-500">
                  Annuler
                </button>
                <button onClick={search} className="flex-grow text-red-400">
                  Rechercher
                </button>
              </div>
            </div>
          )
        }
      </div>
    </Container>

  </div>


}
export default NavBar;
