import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  MapPin,
  Bell,
  Volume2,
  Navigation,
  Phone,
  Clock,
  Battery,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { GoogleMapContainer } from '../common/GoogleMapContainer';

export const VehicleRadarCard = () => {
  const { vehicles, playChime, addNotification, t } = useApp();

  // Active Vehicle in Focus
  const [activeVehicle, setActiveVehicle] = useState(vehicles[0]);
  const [distance, setDistance] = useState(280);
  const [eta, setEta] = useState(3);
  const [alertActive, setAlertActive] = useState(true);

  // Simulate vehicle movement closer over time
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(prev => {
        if (prev <= 90) return 320; // reset loop for demo
        return prev - 15;
      });
      setEta(prev => (prev <= 1 ? 4 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTestChime = () => {
    playChime('alert');
    addNotification(
      "Doorstep Vehicle Alert! 🔔",
      `Truck ${activeVehicle.registrationNo} has entered your lane (12th Main Road). Please bring out segregated wet and dry bins!`,
      "radar"
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">{t('vehicleRadarTitle')}</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {t('liveSatellite')}
              </span>
            </div>
            <p className="text-xs text-slate-400">{t('vehicleRadarDesc')}</p>
          </div>
        </div>

        {/* Chime Bell Trigger */}
        <button
          onClick={handleTestChime}
          className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('simulateArrivalBell')}</span>
        </button>
      </div>

      {/* Proximity Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold text-sm">
            <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400/20"></span>
            {distance}m
          </div>
          <div>
            <div className="text-xs text-slate-400">{t('proximityToDoorstep')}:</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{activeVehicle.registrationNo}</span>
              <span className="text-emerald-400 font-normal text-xs">({activeVehicle.type})</span>
            </div>
            <div className="text-xs text-emerald-300 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              {t('estArrival')}: <strong className="font-bold">~{eta} Minutes</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
            {t('speed')}: <strong className="text-white font-mono">{activeVehicle.speedKmH} km/h</strong>
          </span>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
            {t('routeDone')}: <strong className="text-emerald-400 font-mono">{activeVehicle.routeProgress}%</strong>
          </span>
        </div>
      </div>

      {/* Live Interactive Google Map Radar Container */}
      <GoogleMapContainer
        center={{ lat: 12.9784, lng: 77.6408 }}
        zoom={16}
        height="320px"
        title="Doorstep Collection Radar (Ward 12)"
        markers={[
          {
            lat: 12.9784,
            lng: 77.6408,
            title: "Your Residence",
            type: "home",
            details: "12th Main Road, Indiranagar • Doorstep Collection Point"
          },
          {
            lat: activeVehicle.currentLocation?.lat || (12.9784 - (distance / 320) * 0.0025),
            lng: activeVehicle.currentLocation?.lng || (77.6408 - (distance / 320) * 0.0025),
            title: activeVehicle.registrationNo,
            type: "truck",
            extra: `${distance}m • ETA ${eta}m`,
            heading: 45,
            details: `${activeVehicle.type} operated by ${activeVehicle.driverName}. Speed: ${activeVehicle.speedKmH} km/h. Route: ${activeVehicle.routeProgress}% completed.`
          }
        ]}
        circles={[
          {
            lat: 12.9784,
            lng: 77.6408,
            radius: 300,
            color: "#10b981"
          }
        ]}
        polylines={[
          {
            path: [
              { lat: 12.9755, lng: 77.6380 },
              { lat: 12.9772, lng: 77.6395 },
              { lat: 12.9784, lng: 77.6408 }
            ],
            color: "#10b981"
          }
        ]}
      />

      {/* Driver Card & Route Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
        {/* Driver Contact */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-200">
              SG
            </div>
            <div>
              <div className="font-semibold text-white">{activeVehicle.driverName}</div>
              <div className="text-[11px] text-slate-400">Primary Ward Driver</div>
            </div>
          </div>
          <a
            href={`tel:${activeVehicle.driverPhone}`}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded-lg text-xs"
          >
            <Phone className="w-3 h-3" />
            <span>{t('callDriver')}</span>
          </a>
        </div>

        {/* Current Street Status */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400">{t('currentStreet')}</div>
            <div className="font-medium text-white truncate max-w-[220px]">{activeVehicle.currentStreet}</div>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            {activeVehicle.stopsRemaining} {t('stopsLeft')}
          </span>
        </div>
      </div>
    </div>
  );
};
