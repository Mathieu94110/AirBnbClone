import Image from "next/image";

function LargeCard({
  image,
  title,
  description,
  buttonText,
}: {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <Image
          src={image}
          alt={image}
          fill
          className="object-cover rounded-2-xl"
        />
      </div>
      <div className="absolute left-16 top-32">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p className="text-white text-xl">{description}</p>
        <button className="textsm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </section>
  );
}
export default LargeCard;
