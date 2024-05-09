import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";

interface RentMapProps {
    center?: number[]
}

type Marker = {
    latitude: number,
    longitude: number
}

const RentMap: React.FC<RentMapProps> = ({ center }) => {
    const [viewport, setViewport] = useState({
        latitude: 51,
        longitude: -0.09,
        zoom: 2,
    });
    const [markerLocation, setMarkerLocation] = useState<Marker>({
        latitude: 51,
        longitude: -0.09,
    });
    const [newPlace, setNewPlace] = useState(null)

    useEffect(() => {
        if (center) {
            setViewport({
                ...viewport, latitude: center[0], longitude: center[1], zoom: 4
            })
            setMarkerLocation({ latitude: center[0], longitude: center[1] })
        }
    }, [center])

    return (


        <div className="w-full h-[35vh] rounded-lg">
            <ReactMapGL
                {...viewport}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v12'
                onMove={evt => setViewport(evt.viewState)}
                style={{ width: '100%', height: '100%' }}

            >
                {center && <Marker
                    latitude={markerLocation.latitude}
                    longitude={markerLocation.longitude}
                    anchor="bottom"
                />}

            </ReactMapGL>
        </div >
    )
}

export default RentMap
