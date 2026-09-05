import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  MapPin,
  Compass,
  Layers,
  Maximize2,
  ExternalLink,
  Key,
  Navigation,
  Flame,
  AlertTriangle,
  Info,
  Radio,
  Plus,
  Minus
} from 'lucide-react';
import { GOOGLE_MAPS_DARK_STYLE, BENGALURU_DEFAULTS } from '../../utils/mapStyles';
import { MapKeyModal } from './MapKeyModal';

export const GoogleMapContainer = ({
  center = BENGALURU_DEFAULTS.center,
  zoom = 15,
  markers = [],
  circles = [],
  polylines = [],
  height = "340px",
  interactive = true,
  showControls = true,
  onLocationSelect = null,
  showTrafficOption = true,
  title = "GIS Live Map"
}) => {
  const mapElementRef = useRef(null);
  const googleMapInstance = useRef(null);
  const markersRef = useRef([]);
  const circlesRef = useRef([]);
  const polylinesRef = useRef([]);
  const trafficLayerRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [mapType, setMapType] = useState('dark'); // 'dark' | 'satellite' | 'roadmap'
  const [trafficActive, setTrafficActive] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('swachhta_gmaps_api_key') || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );

  // Fallback map state for when no Google key is available
  const [fallbackZoom, setFallbackZoom] = useState(zoom);
  const [fallbackCenter, setFallbackCenter] = useState(center);

  useEffect(() => {
    setFallbackCenter(center);
  }, [center.lat, center.lng]);

  // Load Google Maps JavaScript API script dynamically
  useEffect(() => {
    if (!apiKey) {
      setMapLoaded(false);
      return;
    }

    if (window.google?.maps) {
      initGoogleMap();
      return;
    }

    const scriptId = 'google-maps-api-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        initGoogleMap();
      };

      script.onerror = () => {
        console.warn('Google Maps script failed to load. Falling back to high-res vector GIS map.');
        setLoadError(true);
      };

      document.head.appendChild(script);
    } else {
      script.onload = () => initGoogleMap();
    }
  }, [apiKey]);

  // Initialize Native Google Maps instance
  const initGoogleMap = () => {
    if (!mapElementRef.current || !window.google?.maps) return;

    try {
      const mapOptions = {
        center: { lat: center.lat, lng: center.lng },
        zoom: zoom,
        styles: mapType === 'dark' ? GOOGLE_MAPS_DARK_STYLE : [],
        mapTypeId: mapType === 'satellite' ? window.google.maps.MapTypeId.HYBRID : window.google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: !showControls,
        zoomControl: showControls,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: showControls,
        gestureHandling: interactive ? 'auto' : 'none'
      };

      const map = new window.google.maps.Map(mapElementRef.current, mapOptions);
      googleMapInstance.current = map;
      setMapLoaded(true);
      setLoadError(false);

      if (onLocationSelect) {
        map.addListener('click', (e) => {
          onLocationSelect({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          });
        });
      }
    } catch (err) {
      console.warn('Error creating Google Map:', err);
      setLoadError(true);
    }
  };

  // Update Map Type (Dark / Satellite / Roadmap)
  useEffect(() => {
    if (!googleMapInstance.current || !window.google?.maps) return;
    if (mapType === 'satellite') {
      googleMapInstance.current.setMapTypeId(window.google.maps.MapTypeId.HYBRID);
      googleMapInstance.current.setOptions({ styles: [] });
    } else if (mapType === 'dark') {
      googleMapInstance.current.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
      googleMapInstance.current.setOptions({ styles: GOOGLE_MAPS_DARK_STYLE });
    } else {
      googleMapInstance.current.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
      googleMapInstance.current.setOptions({ styles: [] });
    }
  }, [mapType, mapLoaded]);

  // Update Traffic Layer
  useEffect(() => {
    if (!googleMapInstance.current || !window.google?.maps) return;
    if (trafficActive) {
      trafficLayerRef.current = new window.google.maps.TrafficLayer();
      trafficLayerRef.current.setMap(googleMapInstance.current);
    } else if (trafficLayerRef.current) {
      trafficLayerRef.current.setMap(null);
    }
  }, [trafficActive, mapLoaded]);

  // Update Markers, Circles, Polylines on Google Map
  useEffect(() => {
    if (!googleMapInstance.current || !window.google?.maps) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // Clear old circles
    circlesRef.current.forEach((c) => c.setMap(null));
    circlesRef.current = [];

    // Clear old polylines
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    // Add new markers
    markers.forEach((item) => {
      const position = { lat: item.lat, lng: item.lng };

      let iconConfig = undefined;
      if (item.type === 'truck') {
        iconConfig = {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          rotation: item.heading || 45
        };
      } else if (item.type === 'home') {
        iconConfig = {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#06b6d4',
          fillOpacity: 1,
          strokeWeight: 3,
          strokeColor: '#ffffff'
        };
      } else if (item.type === 'hazard') {
        iconConfig = {
          path: 'M 0 -10 L 9 6 L -9 6 Z',
          scale: 2,
          fillColor: '#f43f5e',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        };
      }

      const marker = new window.google.maps.Marker({
        position,
        map: googleMapInstance.current,
        title: item.title,
        icon: iconConfig
      });

      marker.addListener('click', () => {
        setSelectedMarker(item);
      });

      markersRef.current.push(marker);
    });

    // Add new circles (e.g. 300m siren geo-fence)
    circles.forEach((c) => {
      const circle = new window.google.maps.Circle({
        strokeColor: c.color || '#10b981',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: c.color || '#10b981',
        fillOpacity: 0.15,
        map: googleMapInstance.current,
        center: { lat: c.lat, lng: c.lng },
        radius: c.radius || 300
      });
      circlesRef.current.push(circle);
    });

    // Add new polylines
    polylines.forEach((p) => {
      const poly = new window.google.maps.Polyline({
        path: p.path,
        geodesic: true,
        strokeColor: p.color || '#10b981',
        strokeOpacity: 0.9,
        strokeWeight: 4
      });
      poly.setMap(googleMapInstance.current);
      polylinesRef.current.push(poly);
    });
  }, [markers, circles, polylines, mapLoaded]);

  // Center pan when center prop changes
  useEffect(() => {
    if (googleMapInstance.current && center?.lat && center?.lng) {
      googleMapInstance.current.panTo({ lat: center.lat, lng: center.lng });
    }
  }, [center.lat, center.lng]);

  const openGoogleMapsExternal = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all"
      style={{ height }}
    >
      {/* 1. Native Google Maps Canvas Container */}
      <div
        ref={mapElementRef}
        className={`w-full h-full ${apiKey && mapLoaded && !loadError ? 'block' : 'hidden'}`}
      />

      {/* 2. Resilient High-Fidelity GIS Fallback Canvas (renders whenever API key is not active) */}
      {(!apiKey || !mapLoaded || loadError) && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950 select-none">
          {/* Detailed Tactical Road Grid Pattern */}
          <svg className="w-full h-full opacity-35 absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gisGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gisGrid)" />

            {/* Urban Arterial Highways */}
            <path d="M -50 180 Q 250 140 500 200 T 950 120" fill="none" stroke="#0369a1" strokeWidth="6" />
            <path d="M 220 -20 L 260 420" fill="none" stroke="#334155" strokeWidth="5" />
            <path d="M 480 -20 L 460 420" fill="none" stroke="#334155" strokeWidth="5" />
            <path d="M 80 80 L 800 280" fill="none" stroke="#1e293b" strokeWidth="4" />

            {/* Collection Route Polyline */}
            <path
              d="M 120 280 Q 240 180 460 200 T 700 130"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeDasharray="6,4"
            />
          </svg>

          {/* Geo-Fence Circle (e.g. 300m siren perimeter) */}
          {circles.map((c, idx) => (
            <div
              key={idx}
              className="absolute pointer-events-none rounded-full border-2 border-emerald-400/40 bg-emerald-500/10 animate-pulse"
              style={{
                width: '180px',
                height: '180px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900/90 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shadow">
                300m Arrival Perimeter
              </span>
            </div>
          ))}

          {/* Interactive Dynamic Markers */}
          {markers.map((item, idx) => {
            const isTruck = item.type === 'truck';
            const isHome = item.type === 'home';
            const isHazard = item.type === 'hazard';

            // Calculate responsive position relative to center
            const latDiff = (item.lat - center.lat) * 8000;
            const lngDiff = (item.lng - center.lng) * 8000;

            const topPos = Math.min(85, Math.max(15, 50 - latDiff));
            const leftPos = Math.min(85, Math.max(15, 50 + lngDiff));

            return (
              <div
                key={idx}
                onClick={() => setSelectedMarker(item)}
                className="absolute transition-all duration-1000 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-20 group"
                style={{
                  top: `${topPos}%`,
                  left: `${leftPos}%`
                }}
              >
                {/* Pin Head */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`animate-ping absolute rounded-full ${
                      isTruck ? 'w-10 h-10 bg-emerald-400/30' :
                      isHome ? 'w-8 h-8 bg-cyan-400/30' :
                      'w-8 h-8 bg-rose-500/40'
                    }`}
                  ></span>

                  <div
                    className={`rounded-full border-2 border-white shadow-xl flex items-center justify-center text-slate-950 font-bold transition-transform group-hover:scale-110 ${
                      isTruck
                        ? 'w-9 h-9 bg-emerald-500 shadow-emerald-500/50'
                        : isHome
                        ? 'w-8 h-8 bg-cyan-500 shadow-cyan-500/50 text-xs'
                        : 'w-7 h-7 bg-rose-600 shadow-rose-500/50 text-white'
                    }`}
                  >
                    {isTruck ? (
                      <Truck className="w-4 h-4 text-slate-950" />
                    ) : isHome ? (
                      <span className="text-xs">🏠</span>
                    ) : (
                      <Flame className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {/* Marker Badge */}
                <div
                  className={`border text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-lg mt-1 flex items-center gap-1 backdrop-blur-sm whitespace-nowrap ${
                    isTruck
                      ? 'bg-slate-900/95 text-emerald-300 border-emerald-500/50'
                      : isHome
                      ? 'bg-slate-900/95 text-cyan-300 border-cyan-500/50'
                      : 'bg-rose-950/95 text-rose-300 border-rose-800'
                  }`}
                >
                  <span>{item.title}</span>
                  {item.extra && <span className="text-white font-normal">({item.extra})</span>}
                </div>
              </div>
            );
          })}

          {/* Interactive Pin-Drop Target (when onLocationSelect is active) */}
          {onLocationSelect && (
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
                const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
                onLocationSelect({
                  lat: Number((center.lat - yPercent * 0.01).toFixed(6)),
                  lng: Number((center.lng + xPercent * 0.01).toFixed(6))
                });
              }}
              className="absolute inset-0 cursor-crosshair z-10"
              title="Click anywhere to drop or update garbage incident location"
            />
          )}

          {/* Status Overlay Note */}
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl px-2 py-1 text-[9px] sm:text-[10px] font-mono text-slate-300 flex items-center gap-1.5 shadow-lg backdrop-blur-sm z-30 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span><span className="hidden md:inline">GOOGLE MAPS </span>GIS: <strong className="text-cyan-300">ACTIVE</strong></span>
          </div>
        </div>
      )}

      {/* Top Action Toolbar */}
      {showControls && (
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-30">
          {/* Map Style Selector */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-0.5 sm:p-1 flex items-center gap-0.5 shadow-lg backdrop-blur-sm text-xs">
            <button
              onClick={() => setMapType('dark')}
              className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer ${
                mapType === 'dark' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Tactical </span>Dark
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer ${
                mapType === 'satellite' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Satellite</span>
              <span className="sm:hidden">Sat</span>
            </button>
          </div>

          {/* Traffic Toggle */}
          {showTrafficOption && (
            <button
              onClick={() => setTrafficActive(!trafficActive)}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl border text-[9px] sm:text-[10px] font-bold shadow-lg transition-all backdrop-blur-sm cursor-pointer ${
                trafficActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:text-white'
              }`}
              title="Toggle Bangalore Real-Time Traffic"
            >
              Traffic
            </button>
          )}

          {/* API Key Modal Button - hidden on tiny mobile, accessible via sm or desktop */}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className="hidden sm:flex p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 shadow-lg backdrop-blur-sm transition-all cursor-pointer"
            title="Configure Google Maps API Key"
          >
            <Key className="w-3.5 h-3.5" />
          </button>

          {/* Open in Google Maps External */}
          <button
            onClick={openGoogleMapsExternal}
            className="p-1 sm:p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-700/80 shadow-lg backdrop-blur-sm transition-all cursor-pointer"
            title="Open in Google Maps App"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected Marker Popup / InfoWindow Card */}
      {selectedMarker && (
        <div className="absolute bottom-3 right-3 left-3 md:left-auto md:w-80 bg-slate-900/95 border border-slate-700 rounded-xl p-3.5 shadow-2xl backdrop-blur-md z-40 space-y-2 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">{selectedMarker.title}</h4>
                <p className="text-[10px] text-slate-400 font-mono">
                  {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer p-1"
            >
              ✕
            </button>
          </div>

          {selectedMarker.details && (
            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              {selectedMarker.details}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Navigation className="w-3 h-3" />
              <span>Turn-by-Turn Directions</span>
            </a>
            <span className="text-[10px] text-slate-400 font-mono">
              Ward 12
            </span>
          </div>
        </div>
      )}

      {/* Bottom Telemetry HUD Overlay */}
      <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700/80 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-300 flex items-center gap-2.5 shadow backdrop-blur-sm z-30">
        <span>LAT: <strong className="text-white">{center.lat.toFixed(4)}</strong></span>
        <span>LNG: <strong className="text-white">{center.lng.toFixed(4)}</strong></span>
        <span>ZOOM: <strong className="text-cyan-400">{zoom}x</strong></span>
      </div>

      {/* API Key Modal */}
      <MapKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        currentKey={apiKey}
        onKeySaved={(newKey) => setApiKey(newKey)}
      />
    </div>
  );
};
