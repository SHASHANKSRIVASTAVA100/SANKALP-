import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VehicleRadarCard } from './VehicleRadarCard';
import { ReportComplaintModal } from './ReportComplaintModal';
import { ComplaintTimelineModal } from './ComplaintTimelineModal';
import { LeaderboardModal } from './LeaderboardModal';
import { PaidServicesModal } from './PaidServicesModal';
import { EcoBotChat } from './EcoBotChat';
import {
  Camera,
  Truck,
  Trophy,
  Bot,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getValidPhotoUrl, handleImageError, REAL_WASTE_FALLBACK } from '../../utils/photoUtils';

export const CitizenDashboard = () => {
  const {
    complaints,
    citizenPoints,
    wardFilter,
    activeModal,
    setActiveModal,
    t
  } = useApp();

  const [selectedComplaint, setSelectedComplaint] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('timeline') === 'true' || params.get('complaint')) {
        return complaints[0] || null;
      }
    } catch (e) {}
    return null;
  });

  // Filter complaints matching ward if selected
  const filteredComplaints = complaints.filter(c => {
    if (wardFilter === 'All Wards') return true;
    return c.ward === wardFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5 w-full max-w-full overflow-hidden">
      {/* Page header */}
      <div className="bg-slate-900 border border-slate-800 rounded p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-white">Citizen Portal</h2>
            <p className="text-xs text-slate-400 mt-0.5">Ward 12 – Indiranagar · PS-26195</p>
          </div>

          {/* Civic points */}
          <div className="bg-slate-800 border border-slate-700 rounded p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-emerald-600 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t('civicWallet')}</div>
              <div className="text-lg font-bold text-white flex items-center gap-1">
                <span className="text-emerald-400">{citizenPoints}</span>
                <span className="text-xs text-slate-400 font-medium">{t('points')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          <button onClick={() => setActiveModal('report')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer">
            <Camera className="w-3.5 h-3.5" /><span>{t('aiReportDump')}</span>
          </button>
          <button onClick={() => setActiveModal('leaderboard')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer">
            <Trophy className="w-3.5 h-3.5" /><span>{t('leaderboard')}</span>
          </button>
          <button onClick={() => setActiveModal('paid')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer">
            <Calendar className="w-3.5 h-3.5" /><span>{t('bookPaidPickup')}</span>
          </button>
          <button onClick={() => setActiveModal('bot')} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer">
            <Bot className="w-3.5 h-3.5" /><span>{t('aiHelper')}</span>
          </button>
          <button onClick={() => { const el = document.getElementById('vehicle-radar'); el?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer">
            <Truck className="w-3.5 h-3.5" /><span>{t('liveRadarBtn')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Vehicle Radar + Complaints Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Live Vehicle Radar */}
        <div id="vehicle-radar" className="lg:col-span-5 space-y-4">
          <VehicleRadarCard />
        </div>

        {/* Right Column: Complaints */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                <span>{t('communityComplaints')}</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {filteredComplaints.length}
                </span>
              </h3>
            </div>

            <button
              onClick={() => setActiveModal('report')}
              className="text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t('reportNew')}</span>
            </button>
          </div>

          {/* Complaints Cards List */}
          <div className="space-y-3">
            {filteredComplaints.map((c) => {
              const isAwaiting = c.status === 'awaiting_verification';
              const isDone = c.status === 'verified';

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedComplaint(c)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
                    isAwaiting
                      ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/30'
                      : isDone
                      ? 'bg-slate-900/60 border-emerald-900/40 hover:border-emerald-700/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Photo Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                        <img
                          src={getValidPhotoUrl(c.beforeImage, REAL_WASTE_FALLBACK)}
                          alt={c.title || "Waste Report"}
                          onError={(e) => handleImageError(e, REAL_WASTE_FALLBACK)}
                          className="w-full h-full object-cover"
                        />
                        {c.afterImage && (
                          <div className="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 text-[9px] font-bold px-1 rounded-tl">
                            AFTER
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.2 rounded">
                            {c.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                            c.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            c.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {c.priority}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            {c.ward}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white line-clamp-1">{c.title}</h4>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate max-w-sm">{c.locationName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge & Action */}
                    <div className="text-right space-y-1 shrink-0">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        c.status === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : c.status === 'awaiting_verification'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : c.status === 'in_progress'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {c.status === 'verified' ? '✓ Verified Clean' :
                         c.status === 'awaiting_verification' ? 'Supervisor Audit' :
                         c.status === 'in_progress' ? 'Worker on Site' : 'Pending Allocation'}
                      </span>

                      {c.assignedWorkerName && (
                        <div className="text-[10px] text-slate-400">
                          Assigned: <strong className="text-slate-300">{c.assignedWorkerName}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Waste Summary Tag Pill */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">AI Detected:</span>
                      <span className="text-emerald-300 font-mono text-[11px]">
                        {c.aiAnalysis?.detectedTypes[0]} (~{c.aiAnalysis?.estimatedWeightKg} kg)
                      </span>
                    </div>

                    <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <span>{t('viewLifecycle')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReportComplaintModal
        isOpen={activeModal === 'report'}
        onClose={() => setActiveModal(null)}
      />

      <LeaderboardModal
        isOpen={activeModal === 'leaderboard'}
        onClose={() => setActiveModal(null)}
      />

      <PaidServicesModal
        isOpen={activeModal === 'paid'}
        onClose={() => setActiveModal(null)}
      />

      <EcoBotChat
        isOpen={activeModal === 'bot'}
        onClose={() => setActiveModal(null)}
      />

      {/* Complaint Inspection / Verification Modal */}
      {selectedComplaint && (
        <ComplaintTimelineModal
          complaint={selectedComplaint}
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};
