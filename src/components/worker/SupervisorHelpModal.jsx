import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  X,
  Send,
  Truck,
  ShieldAlert,
  Dog,
  Lock,
  Flame
} from 'lucide-react';

export const SupervisorHelpModal = ({ complaint, isOpen, onClose }) => {
  const { reportWorkerSos } = useApp();

  const [reason, setReason] = useState("Requires Heavy Machinery (JCB / Excavator)");
  const [notes, setNotes] = useState("Dump includes large reinforced concrete chunks and buried metal pipes exceeding manual shovel capacity.");

  if (!isOpen || !complaint) return null;

  const blockerReasons = [
    {
      id: "machinery",
      title: "Requires Heavy Machinery (JCB / Excavator)",
      desc: "Massive concrete debris or buried rubble needing hydraulic equipment.",
      icon: <Truck className="w-4 h-4 text-amber-400" />
    },
    {
      id: "chemical",
      title: "Hazardous Chemical / Toxic Biohazard Detected",
      desc: "Chemical drums, hazardous hospital waste, or noxious fumes present.",
      icon: <Flame className="w-4 h-4 text-rose-400" />
    },
    {
      id: "animals",
      title: "Aggressive Stray Dogs / Threat to Worker Safety",
      desc: "Pack of territorial animals preventing safe approach to the spot.",
      icon: <ShieldAlert className="w-4 h-4 text-orange-400" />
    },
    {
      id: "access",
      title: "Inaccessible Private Plot / Locked Compound",
      desc: "Dump is behind a locked boundary wall requiring municipal entry notice.",
      icon: <Lock className="w-4 h-4 text-cyan-400" />
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    reportWorkerSos(complaint.id, reason, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-rose-800/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 p-5 border-b border-rose-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Supervisor Help! (Task Blocker SOS)
                <span className="text-xs font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                  {complaint.id}
                </span>
              </h3>
              <p className="text-xs text-rose-300">
                Immediately escalates ticket to Ward Supervisor for backup or equipment dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <label className="text-xs font-semibold text-slate-300 block">
            Select Primary Ground Blocker Reason:
          </label>

          <div className="space-y-2">
            {blockerReasons.map((r) => (
              <div
                key={r.id}
                onClick={() => setReason(r.title)}
                className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  reason === r.title
                    ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5 shrink-0">{r.icon}</div>
                <div>
                  <div className="text-xs font-bold text-white">{r.title}</div>
                  <div className="text-[11px] text-slate-400">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Field Observations & Specific Assistance Needed:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              placeholder="Describe the obstacle and what backup is required..."
            />
          </div>

          <div className="bg-rose-950/30 border border-rose-800/40 rounded-xl p-3 text-xs text-rose-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              Triggering this alert halts the standard SLA timer and flags the ticket on the Supervisor Command Radar.
            </span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Dispatch SOS to Supervisor Desk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
