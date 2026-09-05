import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  X,
  CheckCircle,
  HardHat,
  Star,
  MapPin,
  AlertTriangle,
  Send
} from 'lucide-react';

export const AssignWorkerModal = ({ complaint, isOpen, onClose }) => {
  const { workers, assignWorker } = useApp();

  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0].id);
  const [priorityOverride, setPriorityOverride] = useState(complaint?.priority || "high");

  // Lock body scroll on open to prevent background screen from rolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !complaint) return null;

  const handleAssign = (e) => {
    e.preventDefault();
    assignWorker(complaint.id, selectedWorkerId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto overscroll-contain">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 p-3.5 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 truncate sm:overflow-visible">
                Allocate Sanitation Team & Set Priority
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {complaint.id}
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1 sm:line-clamp-none">Assign available field crew based on location proximity and workload</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAssign} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* Target Ticket Details */}
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="font-bold text-white">{complaint.title}</div>
            <div className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {complaint.locationName} ({complaint.ward})
            </div>
            <div className="text-slate-400">
              AI Waste Type: <strong className="text-emerald-400">{complaint.aiAnalysis?.detectedTypes[0]}</strong> (~{complaint.aiAnalysis?.estimatedWeightKg} kg)
            </div>
          </div>

          {/* Priority Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Set / Override SLA Priority Level:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['critical', 'high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriorityOverride(p)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                    priorityOverride === p
                      ? p === 'critical' ? 'bg-rose-950 border-rose-500 text-rose-300 ring-1 ring-rose-500' :
                        p === 'high' ? 'bg-amber-950 border-amber-500 text-amber-300 ring-1 ring-amber-500' :
                        'bg-cyan-950 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Workers Roster Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Select Field Worker / Squad:
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() => setSelectedWorkerId(worker.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedWorkerId === worker.id
                      ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-2">
                        {worker.name}
                        <span className="text-[10px] text-amber-300 font-normal flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {worker.rating}★
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {worker.team} • {worker.ward}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      worker.attendance === 'punched_in'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {worker.attendance === 'punched_in' ? 'On Duty' : 'Off Duty'}
                    </span>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {worker.activeTasksCount} Active Tasks
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
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
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Confirm Worker Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
