import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { SearchResults } from "../../typings";

function InfoCard({
  img,
  location,
  title,
  description,
  star,
  price,
  total,
}: SearchResults) {
  return (
    <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image src={img} fill className="rounded-2xl" alt={title} />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p className="text-gray-500 text-sm">{location}</p>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ fontSize: 20 }}
            className="h-7 cursor-pointer"
          />
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex items-end justify-between pt-5">
          <p className="flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              style={{ fontSize: 20 }}
              className="h-7 cursor-pointer"
            />
            {star}
          </p>

          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
