import Image from "next/image";

function MediumCard({ img, title }: { img: string; title: string }) {
  return (
    <div className="cursor-pointer  hover:scale-105 transition transform duration-300 ease-out">
      <div className="relative h-80 w-80">
        <Image src={img} alt={img} fill className="rounded-lg" />
      </div>
      <div>
        <h3 className="text-xl mt-3">{title}</h3>
      </div>
    </div>
  );
}

export default MediumCard;
