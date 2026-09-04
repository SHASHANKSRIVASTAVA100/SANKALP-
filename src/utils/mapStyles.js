// Custom Google Maps Dark Theme JSON Styling
// Styled to match Swachhta Sangam's dark slate and neon emerald/cyan aesthetic

export const GOOGLE_MAPS_DARK_STYLE = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }] // Slate 900 base
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#020617" }, { weight: 3 }] // Slate 950 stroke
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }] // Slate 400 fill
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#38bdf8" }] // Sky blue locality labels
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#64748b" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#064e3b" }] // Dark emerald parks
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#34d399" }] // Emerald 400
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }] // Slate 800 roads
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0f172a" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#cbd5e1" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#0369a1" }] // Arterial highways highlighted
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0c4a6e" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7dd3fc" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#38bdf8" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }] // Deep black/slate water bodies
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#38bdf8" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#020617" }]
  }
];

export const BENGALURU_DEFAULTS = {
  center: { lat: 12.9784, lng: 77.6408 }, // Indiranagar Ward 12
  zoom: 15,
  userResidence: { lat: 12.9784, lng: 77.6408, label: "Your Residence (Ward 12, Indiranagar)" }
};
