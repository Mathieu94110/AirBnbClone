import Image from "next/image";
import PerryHouseImg from "../../public/pretty-houses.jpg";
function Banner() {
  return (
    <div className="w-full relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
      <Image
        src={PerryHouseImg}
        alt="maison de campagne"
        fill
        className="w-full object-cover h-unset"
        sizes="100vw"
      />
    </div>
  );
}

export default Banner;
