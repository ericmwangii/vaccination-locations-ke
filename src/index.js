import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HexagonLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import data from "./locations.json";
import "./main.css";

window.initMap = () => {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -1.286389, lng: 36.817223 },
    zoom: 6,
    mapId: "ed5392a3975d62bf",
  });

  const overlay = new GoogleMapsOverlay({
    layers: [plot()],
  });
  overlay.setMap(map);
};

const plot = () =>
  new ScatterplotLayer({
    id: "vaccination-stations",
    data: data,
    filled: true,
    radiusMinPixels: 3,
    radiusMaxPixels: 7,
    getPosition: (d) => [d.longitude, d.latitude],
    getFillColor: (d) => [202, 83, 16],
    pickable: true,
    onHover: ({ object, x, y }) => {
      const el = document.getElementById("tooltip");
      if (object) {
        const { Health_Facility_Name } = object;
        el.innerHTML = `<h3>${Health_Facility_Name}</h3>`;
        el.style.display = "block";
        el.style.color = "white";
        el.style.opacity = 0.9;
        el.style.left = x + "px";
        el.style.top = y + "px";
      } else {
        el.style.opacity = 0.0;
      }
    },
  });

const heatmap = () =>
  new HeatmapLayer({
    id: "heat",
    data: data,
    getPosition: (d) => [d.longitude, d.latitude],
    radiusPixels: 60,
  });
