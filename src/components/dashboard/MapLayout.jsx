import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import style from "./MapLayout.module.scss";

export default function MapLayout({ children }) {
  return (
    <>
      <div className={style.primary}>
        <Map
          reuseMaps
          attributionControl={false}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          initialViewState={{
            longitude: -3.981756,
            latitude: 51.61242,
            zoom: 16.0,
          }}
        />
      </div>
      <div className={style.supportingPane}>{children}</div>
    </>
  );
}
