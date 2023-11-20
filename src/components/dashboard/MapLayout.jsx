import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl/maplibre";
import style from "./MapLayout.module.scss";

export default function MapLayout({ children }) {
  return (
    <>
      <div className={style.primary}>
        <Map
          reuseMaps
          attributionControl={false}
          mapStyle="https://tiles-eu.stadiamaps.com/styles/osm_bright.json"
          initialViewState={{
            longitude: -3.981756,
            latitude: 51.61242,
            zoom: 16.0,
          }}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
        </Map>
      </div>

      <div className={style.supportingPane}>{children}</div>
    </>
  );
}
