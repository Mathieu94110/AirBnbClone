"use client"

import { useRef, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useSetNavBar } from "@/hooks/useSetNavBar";
import Categories from "../Categories";
import { SafeUser } from "@/types";
import { CSSTransition } from 'react-transition-group';

interface NavBarProps {
  currentUser?: SafeUser | null,
  placeholder: string
}

function NavBar({ placeholder, currentUser }: NavBarProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();
  const navBarRef = useRef(null);
  const {
    isAdvancedSearchBar
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

  return <>
    <CSSTransition in={isAdvancedSearchBar} nodeRef={navBarRef} classNames="nav-bar" timeout={300} >
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-8 px-2 shadow-sm py-4" ref={navBarRef}>
        <div className=" flex flex-row items-center justify-center gap-3 md:gap-0 md:justify-between">
          <div
            onClick={() => router.push("/")}
            className="flex flex-row items-center justify-between gap-3 md:gap-0"
          >
            <Logo />
          </div>
          <div>
            <Search isAdvancedSearchBar={isAdvancedSearchBar} />
          </div>

          <div className="hidden flex items-center text-gray-500 justify-end space-x-4 sm:inline-flex max-sm:col-span-2">
            <UserMenu currentUser={currentUser} />
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
                  <button onClick={() => { }} className="flex-grow text-red-400">
                    Rechercher
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </CSSTransition>
    <Categories />
  </>


}
export default NavBar;
