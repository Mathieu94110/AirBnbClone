"use client"

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faGlobe,
  faBars,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

function NavBar({ placeholder }: { placeholder: string }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

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
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-2 px-2 sm:py-5  sm:px-5 md:px-10 max-sm:flex-row">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 my-auto cursor-pointer "
      >
        {/* <Image height="80" src={AirBnbLogo} alt="airbnb logo" /> */}
        <Logo />
      </div>
      {/* Search */}
      <div className="flex items-center md:border-2 rounded-full md:shadow-sm p-2">
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
      </div>
      <div className="hidden flex items-center text-gray-500 justify-end space-x-4 sm:inline-flex max-sm:col-span-2">
        <p className="cursor-pointer hidden lg:inline">Deviens hote</p>

        <FontAwesomeIcon
          icon={faGlobe}
          style={{ fontSize: 30 }}
          className=" h-6 cursor-pointer hidden inline"
        />
        <div className=" items-center space-x-2 border-2 p-2 rounded-full inline-flex">
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: 30 }}
            className="h-6 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ fontSize: 30 }}
            className="h-6 cursor-pointer"
          />
        </div>
      </div>
      {/* Calender */}
      {searchInput && (
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
      )}
    </header>
  );
}
export default NavBar;
