import { useRouter } from "next/dist/client/router";
import Header from "@/components/navbar/NavBar";
import InfoCard from "@/components/InfoCard";
import { format } from "date-fns";
import Footer from "@/components/Footer";
import { SearchResultsWithCoordinates } from "../typings";
import dynamic from "next/dynamic";

// Client Side Render as we need Global Window Object
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

function Search({
  searchResults,
}: {
  searchResults: SearchResultsWithCoordinates[];
}) {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(String(startDate)), "dd MMMM yy");
  const formattedEndDate = format(new Date(String(endDate)), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="h-screen">
      <Header
        placeholder={`${location} | ${range} | ${noOfGuests} invité(s)`}
      />

      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            Séjour - {range} - {noOfGuests} invité(s){" "}
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Séjours à {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Délai pour annuler</p>
            <p className="button">Type de logement</p>
            <p className="button">Prix</p>
            <p className="button">Chambres et lits</p>
            <p className="button">Plus de filtres</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://www.jsonkeeper.com/b/FPCU").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
