import Image from "next/image";
import AirBnbLogo from "../../public/airbnb-logo-0.png";

function Header() {
  return (
    <header className="w-full sticky top-0 z-50 grid grid-cols-3 bg-red-500 bg-white shadow-md py-5 p-5">
      <h1>Header</h1>
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image height="100" src={AirBnbLogo} alt="airbnb logo" />
      </div>
      <div></div>
      <div></div>
    </header>
  );
}

export default Header;
