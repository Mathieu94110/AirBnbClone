import Image from "next/image";
import AirBnbLogo from "../../public/airbnb-logo-0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faGlobe /* , faMenu */,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image height="100" src={AirBnbLogo} alt="airbnb logo" />
      </div>
      <div className=" flex items-center md:border-2 rounded-full p-2">
        <input
          className=" bg-transparent flex-grow lg:pl-5 outline-none text-sm lg:text-xl text-gray-600 placeholder-gray-400"
          type="text"
          placeholder="Rechercher"
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{ fontSize: 24 }}
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer lg:mx-2"
        />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Devenir hôte</p>
        <FontAwesomeIcon
          icon={faGlobe}
          style={{ fontSize: 30 }}
          className="h-6 cursor-pointer"
        />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          {/* <FontAwesomeIcon
            icon={faMenu}
            style={{ fontSize: 30 }}
            className="h-6"
          /> */}
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ fontSize: 30 }}
            className="h-6"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
