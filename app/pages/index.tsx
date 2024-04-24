import Head from "next/head";
import Script from "next/script";
import Header from "@/components/navbar/NavBar";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";
import { AroundCards } from "../../typings";
import MediumCard from "@/components/MediumCard";
import LargeCard from "@/components/LargeCard";
import Footer from "@/components/Footer";

export default async function Home() {
  4
  const aroundOffers = await fetch("https://www.jsonkeeper.com/b/O34X").then(
    (res) => res.json()
  );
  const cardsData = await fetch("https://www.jsonkeeper.com/b/CYIT").then(
    (res) => res.json()
  );
  return (
    <div >
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Autour de vous</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aroundOffers?.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4-xl font-semibold py-8">Partez en France</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          image="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?fit=2500%2C1666"
          title="Les locations les plus plébisitées"
          description="Offres recommandées par airbnb"
          buttonText="Soyez inspiré"
        />
      </main>
      <Footer />
    </div>
  );
}

// export async function getStaticProps() {
//   const aroundOffers = await fetch("https://www.jsonkeeper.com/b/O34X").then(
//     (res) => res.json()
//   );
//   const cardsData = await fetch("https://www.jsonkeeper.com/b/CYIT").then(
//     (res) => res.json()
//   );
//   return {
//     props: {
//       aroundOffers,
//       cardsData,
//     },
//   };
// }
