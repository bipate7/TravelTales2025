const map = L.map("leaflet-map", { scrollWheelZoom: true });
map.setView([26.2, 92.8], 6);
const basemaps = {
  "Carto Light": L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    }
  ),
  OpenStreetMap: L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors",
    }
  ),
};
basemaps["Carto Light"].addTo(map);
L.control
  .layers(basemaps, null, { position: "topright", collapsed: true })
  .addTo(map);
fetch("Map/northeast.geojson")
  .then((r) => r.json())
  .then((data) => {
    const markers = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
      },
      onEachFeature: function (feature, layer) {
        const name =
          feature.properties && feature.properties.name
            ? feature.properties.name
            : "";
        const href =
          feature.properties && feature.properties.href
            ? feature.properties.href
            : "";
        let html = "<strong>" + name + "</strong>";
        if (href) {
          html += '<br><a href="' + href + '">Explore</a>';
        }
        layer.bindPopup(html);
      },
    }).addTo(map);
    const bounds = markers.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  })
  .catch(() => {});
