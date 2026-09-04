import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Clock,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  Building,
  CheckCircle2,
  Send
} from 'lucide-react';

export const EscalationMatrixView = () => {
  const { complaints, addNotification, playChime } = useApp();

  // Find overdue tickets or tickets with SOS alerts
  const overdueTickets = complaints.filter(
    c => c.status !== 'verified' && (new Date(c.slaDeadline) < new Date() || c.sosAlert || c.priority === 'critical')
  );

  const [escalatedMap, setEscalatedMap] = useState({});

  const handleEscalate = (ticketId, targetLevel) => {
    setEscalatedMap(prev => ({ ...prev, [ticketId]: targetLevel }));
    playChime('alert');
    addNotification(
      "SLA Breach Escalation Triggered! 🚨",
      `Ticket ${ticketId} escalated directly to ${targetLevel} under Municipal SLA Bylaws.`,
      "alert"
    );
  };

  return (
    <div className="space-y-6">
      {/* Visual Hierarchy Ladder Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Hierarchical Municipal Escalation Protocol
            </h3>
            <p className="text-xs text-slate-400">
              Automated multi-tier escalation triggered when worker or ward response exceeds defined SLA threshold
            </p>
          </div>
          <span className="text-xs bg-rose-950/60 text-rose-300 border border-rose-800 px-3 py-1 rounded-full font-mono">
            SLA Policy: Strict 2h-8h
          </span>
        </div>

        {/* 4-Tier Visual Flow Ladder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Level 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 font-bold">LEVEL 1</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">0 - 2 Hours</span>
            </div>
            <div className="font-bold text-sm text-white">Sanitation Worker</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Assigned field crew dispatched with GPS routing. Responsible for on-site sweeping & evidence capture.
            </p>
          </div>

          {/* Level 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative group hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-400 font-bold">LEVEL 2</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.2 rounded font-mono">2 - 4 Hours</span>
            </div>
            <div className="font-bold text-sm text-white">Ward Supervisor</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Triages blockers, resolves SOS requests, reallocates machinery, or reviews photographic verification.
            </p>
          </div>

          {/* Level 3 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-purple-400 font-bold">LEVEL 3</span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded font-mono">4 - 6 Hours</span>
            </div>
            <div className="font-bold text-sm text-white">Sanitary Inspector</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zonal officer dispatches rapid reinforcement squads and issues spot penalties to chronic polluters.
            </p>
          </div>

          {/* Level 4 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative group hover:border-rose-500/50 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-rose-400 font-bold">LEVEL 4</span>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.2 rounded font-mono">&gt; 6 Hours</span>
            </div>
            <div className="font-bold text-sm text-white">Municipal Officer</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              City Joint Commissioner executive audit. Disciplinary action or emergency hazmat contractor mobilized.
            </p>
          </div>
        </div>
      </div>

      {/* Critical / Overdue Tickets Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              SLA Breaches & Priority Escalations
            </h3>
            <p className="text-xs text-slate-400">Complaints that exceeded SLA deadline or contain worker SOS flags</p>
          </div>
          <span className="text-xs font-mono bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-1 rounded-full">
            {overdueTickets.length} At-Risk Tickets
          </span>
        </div>

        {overdueTickets.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-950/60 rounded-xl border border-slate-800">
            ✓ Excellent! Zero SLA breaches in this ward currently.
          </div>
        ) : (
          <div className="space-y-3">
            {overdueTickets.map((t) => {
              const currentEscalation = escalatedMap[t.id] || (t.sosAlert ? "Ward Supervisor (SOS Action)" : "Sanitation Worker (SLA Lapsed)");

              return (
                <div
                  key={t.id}
                  className="bg-slate-950 p-4 rounded-xl border border-rose-900/50 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-rose-400 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                        {t.id}
                      </span>
                      <span className="text-xs font-bold text-white">{t.title}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Location: {t.locationName} • Worker: {t.assignedWorkerName || 'Unassigned'}
                    </div>
                    {t.sosAlert && (
                      <div className="text-xs text-rose-300 font-medium">
                        🚨 Worker Blocker: {t.sosAlert.reason} ({t.sosAlert.notes})
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase">Current Escalation Desk:</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{currentEscalation}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEscalate(t.id, "Sanitary Inspector")}
                        className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800 text-xs font-semibold transition-all"
                      >
                        Escalate to Inspector
                      </button>
                      <button
                        onClick={() => handleEscalate(t.id, "Municipal Commissioner")}
                        className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-semibold transition-all"
                      >
                        Escalate to Commissioner
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
