import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  Camera,
  AlertTriangle,
  Lightbulb,
  PlusCircle,
  Video
} from 'lucide-react';
import { GoogleMapContainer } from '../common/GoogleMapContainer';

export const HotspotsAnalysisView = () => {
  const { hotspots, triggerHotspotAction } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            AI RECURRENCE & ROOT CAUSE ENGINE
          </span>
        </div>
        <h3 className="text-xl font-bold text-white">
          Garbage Dump Hotspots & Long-Term Infrastructure Remediation
        </h3>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          AI spatial analysis identifies repeat dumping points across wards. Instead of repeatedly clearing, supervisors can arrange municipal dustbins, install solar CCTV poles, and deploy night enforcement to solve the root causes permanently.
        </p>
      </div>

      {/* Interactive Google Maps Hotspot Cluster View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-sm text-white">GIS Chronic Hotspot Clusters (Bengaluru)</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {hotspots.length} Persistent Sites Mapped
          </span>
        </div>
        <GoogleMapContainer
          center={{ lat: 12.9568, lng: 77.6326 }} // Midpoint between Indiranagar & Koramangala
          zoom={13}
          height="320px"
          title="Chronic Hotspot Spatial Clusters"
          markers={hotspots.map((h) => ({
            lat: h.coordinates.lat,
            lng: h.coordinates.lng,
            title: h.id,
            type: "hazard",
            extra: h.frequencyScore.split(' ')[0],
            details: `${h.title} (${h.ward}). Root cause: ${h.rootCause}. Primary: ${h.primaryWaste}.`
          }))}
          circles={hotspots.map((h) => ({
            lat: h.coordinates.lat,
            lng: h.coordinates.lng,
            radius: 250,
            color: "#f43f5e"
          }))}
        />
      </div>

      {/* Hotspots Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotspots.map((h) => (
          <div
            key={h.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl hover:border-cyan-500/40 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                    {h.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {h.frequencyScore}
                  </span>
                </div>
                <h4 className="font-bold text-base text-white mt-1">{h.title}</h4>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {h.ward}
                </div>
              </div>

              <span className="text-xs bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-1 rounded-full font-semibold shrink-0">
                {h.currentStatus}
              </span>
            </div>

            {/* Root Cause Card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block">Root Cause Diagnosis:</strong>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{h.rootCause}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Primary Waste Stream:</span>
                <strong className="text-white">{h.primaryWaste}</strong>
              </div>
            </div>

            {/* Remediation Interventions (Arrange Dustbins, CCTV, etc.) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Recommended Root-Cause Solutions:
              </span>

              <div className="space-y-2">
                {h.recommendedInterventions.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Trash2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white block">{item.label}</span>
                        <span className="text-[11px] text-slate-400 font-mono">Budget: {item.cost}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => triggerHotspotAction(h.id, item.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow ${
                        item.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : item.status === 'active'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {item.status === 'completed' ? '✓ Installed' :
                       item.status === 'active' ? 'Active / In Place' : 'Arrange Dustbin / Act'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
