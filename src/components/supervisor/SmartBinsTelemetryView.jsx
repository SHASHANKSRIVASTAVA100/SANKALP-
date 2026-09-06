import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Radio,
  Wifi,
  BatteryCharging,
  AlertTriangle,
  CheckCircle2,
  Truck,
  RotateCcw,
  Zap,
  Flame,
  Volume2,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
  Activity,
  Sliders,
  Bell,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

export const SmartBinsTelemetryView = () => {
  const { playChime, addNotification, vehicles } = useApp();

  const [bins, setBins] = useState([
    {
      id: 'SB-IND-01',
      location: 'Indiranagar 100ft Road (Commercial Corridor)',
      type: 'Commercial Dual Stream',
      fillLevel: 94,
      capacityLiters: 1100,
      depthCm: 8,
      gasPpm: 58,
      battery: 92,
      lastPing: '3s ago (LoRaWAN)',
      signalRssi: '-68 dBm',
      status: 'CRITICAL_OVERFLOW',
      autoDispatched: true,
      dispatchedTruck: 'KA-01-EA-2024'
    },
    {
      id: 'SB-IND-02',
      location: 'Peenya Industrial Complex Gate 3',
      type: 'Dry Recyclables & Packaging',
      fillLevel: 68,
      capacityLiters: 2400,
      depthCm: 45,
      gasPpm: 14,
      battery: 88,
      lastPing: '12s ago (NB-IoT)',
      signalRssi: '-74 dBm',
      status: 'MODERATE',
      autoDispatched: false,
      dispatchedTruck: null
    },
    {
      id: 'SB-IND-03',
      location: 'MG Road Metro Station Concourse',
      type: 'Pedestrian Civic Smart Bin',
      fillLevel: 32,
      capacityLiters: 660,
      depthCm: 90,
      gasPpm: 6,
      battery: 98,
      lastPing: 'Just now (LoRaWAN)',
      signalRssi: '-62 dBm',
      status: 'NORMAL',
      autoDispatched: false,
      dispatchedTruck: null
    },
    {
      id: 'SB-IND-04',
      location: 'KR Market Wholesale Vegetable Yard',
      type: 'Organic Bio-Degradable Bin',
      fillLevel: 87,
      capacityLiters: 3200,
      depthCm: 18,
      gasPpm: 84,
      battery: 76,
      lastPing: '7s ago (4G Telemetry)',
      signalRssi: '-78 dBm',
      status: 'HIGH_ALERT',
      autoDispatched: false,
      dispatchedTruck: null
    }
  ]);

  const [selectedBinId, setSelectedBinId] = useState('SB-IND-01');
  const selectedBin = bins.find(b => b.id === selectedBinId) || bins[0];

  const handleSimulateFill = (binId, newLevel) => {
    setBins(prev =>
      prev.map(b => {
        if (b.id === binId) {
          const isCritical = newLevel >= 90;
          const status = isCritical
            ? 'CRITICAL_OVERFLOW'
            : newLevel >= 75
            ? 'HIGH_ALERT'
            : newLevel >= 50
            ? 'MODERATE'
            : 'NORMAL';

          if (isCritical && !b.autoDispatched) {
            playChime('alert');
            addNotification(
              `🚨 IoT Alert: Smart Bin ${b.id} at ${newLevel}%!`,
              `Automated IoT trigger: Compactor Truck #KA-01-EA-2024 automatically dispatched to ${b.location}.`,
              'warning'
            );
          }

          return {
            ...b,
            fillLevel: newLevel,
            depthCm: Math.max(5, Math.round(120 * (1 - newLevel / 100))),
            status,
            autoDispatched: isCritical,
            dispatchedTruck: isCritical ? 'KA-01-EA-2024' : null
          };
        }
        return b;
      })
    );
  };

  const handleManualEmpty = (binId) => {
    playChime('success');
    setBins(prev =>
      prev.map(b => {
        if (b.id === binId) {
          return {
            ...b,
            fillLevel: 5,
            depthCm: 115,
            gasPpm: 4,
            status: 'NORMAL',
            autoDispatched: false,
            dispatchedTruck: null
          };
        }
        return b;
      })
    );
    addNotification(
      `♻️ Bin Empty Cycle Recorded`,
      `Smart Bin ${binId} tare-weight verified and reset by sanitation crew.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with IoT Protocol Live Indicators */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/30 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              Live Telemetry Grid (LoRaWAN & NB-IoT)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Frequency: 865-867 MHz (IN865 Band)
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            Smart Ultrasonic Bin Telemetry & Automated Fleet Dispatch
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time ultrasonic depth sensors, VOC/Methane odor monitoring, and autonomous compactor truck routing without manual human intervention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-medium">Network Nodes</div>
            <div className="text-base font-black text-emerald-400 font-mono">4 / 4 ONLINE</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-medium">Avg Latency</div>
            <div className="text-base font-black text-cyan-400 font-mono">42 ms</div>
          </div>
        </div>
      </div>

      {/* Autonomous Dispatch Alert Strip (if any bin is critical) */}
      {bins.some(b => b.autoDispatched) && (
        <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>AUTONOMOUS IOT TRUCK DISPATCH ACTIVE</span>
                <span className="text-[10px] bg-rose-900/80 text-rose-200 px-2 py-0.5 rounded font-mono">
                  SLA: 25 MINS
                </span>
              </h4>
              <p className="text-xs text-slate-300">
                Bin <strong>#SB-IND-01</strong> reached <strong>94% capacity</strong>. Sensor algorithm automatically routed{' '}
                <strong className="text-rose-300">Electric Compactor Truck #KA-01-EA-2024</strong> (Driver: Raghu K.).
              </p>
            </div>
          </div>
          <button
            onClick={() => handleManualEmpty('SB-IND-01')}
            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
          >
            Simulate Crew Empty Cycle
          </button>
        </div>
      )}

      {/* Grid of 4 Smart Bins Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bins.map(bin => {
          const isSelected = bin.id === selectedBinId;
          const isCritical = bin.fillLevel >= 90;
          const isHigh = bin.fillLevel >= 75 && bin.fillLevel < 90;

          return (
            <div
              key={bin.id}
              onClick={() => setSelectedBinId(bin.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    {bin.id}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                        : isHigh
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {bin.fillLevel}% Full
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{bin.location}</h4>
                <p className="text-[11px] text-slate-400 mb-3">{bin.type}</p>

                {/* Vertical Fill Level Animation Visualizer */}
                <div className="w-full bg-slate-950 rounded-xl p-2.5 border border-slate-800/80 mb-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span>Ultrasonic Depth</span>
                    <span className="text-white font-bold">{bin.depthCm} cm gap</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isCritical
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : isHigh
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      }`}
                      style={{ width: `${bin.fillLevel}%` }}
                    />
                  </div>
                </div>

                {/* Micro Sensor Stats */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 font-mono">
                  <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
                    <span className="text-slate-500 block">VOC / Gas:</span>
                    <span className={bin.gasPpm > 50 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                      {bin.gasPpm} ppm
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
                    <span className="text-slate-500 block">Battery:</span>
                    <span className="text-emerald-400">{bin.battery}% Solar</span>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-mono">{bin.lastPing}</span>
                {bin.autoDispatched ? (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Auto-Dispatched
                  </span>
                ) : (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Normal Routing
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Hardware Simulator Console for Judges - Bullet-Point Type Opening */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Hardware Simulator Console: Bin {selectedBin.id}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any bullet point below to open its real-time telemetry diagnostics, sensor calculations, and automated IoT dispatch.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateFill(selectedBin.id, 95)}
              className="px-3 py-1.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Emergency 95%
            </button>
            <button
              onClick={() => handleManualEmpty(selectedBin.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              Reset (5%)
            </button>
          </div>
        </div>

        {/* Selected Bin Current Status Indicator */}
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Target Location:</span>
            <span className="font-bold text-white">{selectedBin.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Sensor Level:</span>
            <span className={`font-mono font-bold text-sm px-2.5 py-0.5 rounded-lg ${
              selectedBin.fillLevel >= 90 ? 'bg-rose-950 text-rose-400 border border-rose-800' :
              selectedBin.fillLevel >= 75 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              selectedBin.fillLevel >= 50 ? 'bg-blue-950 text-blue-400 border border-blue-800' :
              'bg-emerald-950 text-emerald-400 border border-emerald-800'
            }`}>
              {selectedBin.fillLevel}%
            </span>
            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => handleSimulateFill(selectedBin.id, Math.max(0, selectedBin.fillLevel - 5))}
                className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center font-bold cursor-pointer"
                title="Decrease fill by 5%"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => handleSimulateFill(selectedBin.id, Math.min(100, selectedBin.fillLevel + 5))}
                className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center font-bold cursor-pointer"
                title="Increase fill by 5%"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Bullet-Point Type Opening Stages */}
        <div className="space-y-2">
          {[
            {
              level: 5,
              bulletLabel: '• Level 1: 5% (Empty / Cleared)',
              title: 'Empty & Clean Chamber',
              status: 'OPTIMAL CLEAR',
              badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
              dotColor: 'bg-emerald-400',
              distance: '95 cm (Clear line-of-sight)',
              weight: '12 kg (Baseline residual)',
              gas: '8 ppm (Clean ambient air)',
              summary: 'Bin is newly emptied, washed, and disinfected. Ultrasonic ping confirmed.',
              action: 'Routine status OK. Regular daily morning collection cycle active.'
            },
            {
              level: 35,
              bulletLabel: '• Level 2: 35% (Normal Civic Accumulation)',
              title: 'Light Daytime Civic Fill',
              status: 'NORMAL CAPACITY',
              badgeClass: 'bg-teal-500/20 text-teal-400 border-teal-500/40',
              dotColor: 'bg-teal-400',
              distance: '65 cm to waste surface',
              weight: '82 kg (Dry packaging & paper)',
              gas: '16 ppm (Well-ventilated chamber)',
              summary: 'Steady daytime usage along public commercial sidewalk.',
              action: 'Telemetry heartbeat normal. Scheduled on routine afternoon shift.'
            },
            {
              level: 65,
              bulletLabel: '• Level 3: 65% (Moderate Capacity)',
              title: 'Moderate Afternoon Accumulation',
              status: 'MODERATE LOAD',
              badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
              dotColor: 'bg-blue-400',
              distance: '35 cm to waste surface',
              weight: '165 kg (Approaching threshold)',
              gas: '26 ppm (Normal microbial level)',
              summary: 'Bin capacity at 2/3. Current average fill velocity is ~14 kg/hour.',
              action: 'Route optimizer flags bin for prioritized collection in the next cycle.'
            },
            {
              level: 85,
              bulletLabel: '• Level 4: 85% (Warning Alert Threshold)',
              title: 'Pre-Overflow Warning Trigger',
              status: 'ALERT THRESHOLD',
              badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
              dotColor: 'bg-amber-400',
              distance: '15 cm to acoustic transceiver',
              weight: '215 kg (High bulk volume)',
              gas: '44 ppm (Decomposition fumes detected)',
              summary: 'High accumulation risk detected prior to peak evening market hours.',
              action: 'Yellow alert pre-notified on Ward 12 driver navigation dashboard.'
            },
            {
              level: 95,
              bulletLabel: '• Level 5: 95% (Critical Overflow — Auto-Dispatch)',
              title: 'Critical Emergency Overflow',
              status: 'CRITICAL OVERFLOW',
              badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
              dotColor: 'bg-rose-500',
              distance: '4 cm to sensor (Lid near breach)',
              weight: '248 kg (Severe spill hazard)',
              gas: '68 ppm (Methane spike detected)',
              summary: 'Garbage overflowing onto pedestrian pavement. Immediate hazard.',
              action: '🚨 Emergency IoT work order generated! EV Compactor Truck KA-04-E-1192 rerouted automatically.'
            }
          ].map((stage) => {
            const isSelected = selectedBin.fillLevel === stage.level;
            return (
              <div
                key={stage.level}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Bullet Point Clickable Header */}
                <button
                  type="button"
                  onClick={() => handleSimulateFill(selectedBin.id, stage.level)}
                  className="w-full text-left p-3 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {/* Bullet Point Indicator */}
                    <div className="flex items-center justify-center w-5 h-5">
                      <span className={`w-3 h-3 rounded-full ${stage.dotColor} ${isSelected ? 'ring-4 ring-cyan-500/30' : ''}`} />
                    </div>
                    <div>
                      <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {stage.bulletLabel}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                        — {stage.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${stage.badgeClass}`}>
                      {stage.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {isSelected ? (
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-slate-400 hover:text-white">Click to Open</span>
                      )}
                    </span>
                  </div>
                </button>

                {/* Bullet Point Opening: Expanded Diagnostic Details */}
                {isSelected && (
                  <div className="p-3.5 pt-0 border-t border-slate-800/80 bg-slate-900/60 space-y-2.5">
                    <p className="text-xs text-slate-300 mt-2">
                      {stage.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Ultrasonic Distance</span>
                        <span className="font-mono text-cyan-400 font-bold">{stage.distance}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Estimated Weight</span>
                        <span className="font-mono text-white font-bold">{stage.weight}</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-500 block uppercase font-medium">Internal Gas & VOC</span>
                        <span className="font-mono text-amber-400 font-bold">{stage.gas}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2 text-xs">
                      <Radio className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-cyan-300 block">Automated Dispatch Response:</span>
                        <span className="text-slate-300 text-[11px]">{stage.action}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
