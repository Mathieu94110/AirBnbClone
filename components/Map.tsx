import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { SearchResultsWithCoordinates } from "@/types";

const Map = ({
  searchResults,
}: {
  searchResults: SearchResultsWithCoordinates[];
}) => {
  const [selectedLocation, setSelectedLocation] = useState<
    Partial<SearchResultsWithCoordinates>
  >({});
  // Transform coordinates into required array of objects in the correct shape
  const coordinates = searchResults.map((result) => ({
    latitude: result.lat,
    longitude: result.long,
  }));

  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates) as {
    longitude: number;
    latitude: number;
  };

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/me94110/clge1kw1r000201n4wmbshjvj"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      {...viewport}
    // onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          {/* The markers for the airbnb properties */}
          <Marker latitude={result.lat} longitude={result.long}>
            <a onClick={() => setSelectedLocation(result)}>
              <p
                role="img"
                className="cursor-pointer text-2xl animate-bounce"
                aria-label="push-pin"
              >
                📌
              </p>
            </a>
          </Marker>

          {/* The popup when we click on a Marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
