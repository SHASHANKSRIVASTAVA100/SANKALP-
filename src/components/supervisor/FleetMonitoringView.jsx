import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  MapPin,
  AlertTriangle,
  Radio,
  Navigation,
  CheckCircle2,
  Clock,
  BatteryCharging,
  Flame,
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { GoogleMapContainer } from '../common/GoogleMapContainer';

export const FleetMonitoringView = () => {
  const { vehicles, wardFilter, addNotification, playChime } = useApp();

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

  const handleSimulateReroute = () => {
    playChime('alert');
    addNotification(
      "Route Optimization Sent! 🛰️",
      `Dynamic diversion dispatched to ${selectedVehicle.registrationNo} to bypass congestion on 100ft Road.`,
      "radar"
    );
  };

  const handleReportHazardOnRoute = () => {
    playChime('alert');
    addNotification(
      "HAZARDOUS SPILL MARKED ON ROUTE ☣️",
      `Caution waypoint broadcast to vehicle ${selectedVehicle.registrationNo}. Hazmat containment protocol active.`,
      "alert"
    );
  };

  return (
    <div className="space-y-6">
      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelectedVehicle(v)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedVehicle.id === v.id
                ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white">{v.registrationNo}</div>
                  <div className="text-[11px] text-slate-400">{v.type}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                v.status === 'collecting' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                v.status === 'in_transit' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {v.status}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-xs space-y-1">
              <div className="text-slate-300 flex items-center justify-between">
                <span>Driver:</span>
                <strong className="text-white">{v.driverName}</strong>
              </div>
              <div className="text-slate-300 flex items-center justify-between">
                <span>Assigned Area:</span>
                <strong className="text-cyan-300">{v.ward}</strong>
              </div>
              <div className="text-slate-300 flex items-center justify-between">
                <span>Route Deviation:</span>
                <span className={v.routeDeviation ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {v.routeDeviation ? '⚠️ 150m Off-Route' : '✓ On Track'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Tactical Map & Vehicle Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400" />
              Live GIS Fleet Telemetry & Hazardous Route Monitor
            </h3>
            <p className="text-xs text-slate-400">
              Tracking vehicle <strong className="text-cyan-300">{selectedVehicle.registrationNo}</strong> in real-time
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReportHazardOnRoute}
              className="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" />
              Flag Hazardous Spill on Route
            </button>

            <button
              onClick={handleSimulateReroute}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow"
            >
              <Navigation className="w-3.5 h-3.5" />
              Recalculate Route
            </button>
          </div>
        </div>

        {/* Interactive Google Maps GIS Fleet Center */}
        <GoogleMapContainer
          center={selectedVehicle.currentLocation || { lat: 12.9772, lng: 77.6415 }}
          zoom={14}
          height="420px"
          title="Bangalore Municipal GIS Fleet Telematics"
          showTrafficOption={true}
          markers={[
            ...vehicles.map((v) => ({
              lat: v.currentLocation.lat,
              lng: v.currentLocation.lng,
              title: `${v.registrationNo} (${v.type.split(' ')[0]})`,
              type: "truck",
              heading: 90,
              extra: `${v.speedKmH} km/h • ${v.status}`,
              details: `Driver: ${v.driverName} (${v.driverPhone}) • Ward: ${v.ward} • Compaction: ${v.capacityPercent}% • Location: ${v.currentStreet}`
            })),
            {
              lat: 12.9805,
              lng: 77.6450,
              title: "HAZARD ALERT: Chemical Paint Spill",
              type: "hazard",
              extra: "Hazmat Required",
              details: "Toxic industrial paint spill reported on arterial corridor. Immediate road isolation protocol active."
            }
          ]}
          polylines={[
            {
              path: [
                { lat: 12.9710, lng: 77.6350 },
                { lat: 12.9740, lng: 77.6380 },
                { lat: selectedVehicle.currentLocation.lat, lng: selectedVehicle.currentLocation.lng },
                { lat: 12.9805, lng: 77.6450 }
              ],
              color: "#06b6d4"
            }
          ]}
        />
      </div>
    </div>
  );
};
