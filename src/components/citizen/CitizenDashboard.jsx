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
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileCheck
} from 'lucide-react';

export const CitizenDashboard = () => {
  const {
    complaints,
    citizenPoints,
    wardFilter,
    activeModal,
    setActiveModal,
    t
  } = useApp();

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints matching ward if selected
  const filteredComplaints = complaints.filter(c => {
    if (wardFilter === 'All Wards') return true;
    return c.ward === wardFilter;
  });

  const awaitingCount = filteredComplaints.filter(c => c.status === 'awaiting_verification').length;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 w-full max-w-full overflow-hidden">
      {/* Citizen Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 p-4 sm:p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AICTE PS-26195 • Clean & Green Tech
              </span>
              <span className="text-xs text-slate-400">Ward 12 (Indiranagar)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {t('citizenHeroTitle')}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t('citizenHeroDesc')}
            </p>
          </div>

          {/* Gamification Points Capsule */}
          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-bold text-2xl text-slate-950 shadow-lg shadow-emerald-500/30">
              🏆
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{t('civicWallet')}</div>
              <div className="text-2xl font-black text-white flex items-center gap-1.5">
                <span className="text-emerald-400">{citizenPoints}</span>
                <span className="text-xs text-slate-400 font-medium">{t('points')}</span>
              </div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1 mt-0.5">
                <span>{t('rankInWard')}</span>
                <span>•</span>
                <span className="text-slate-400">{t('badgeTitle')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Quick Launchers Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setActiveModal('report')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 group cursor-pointer"
          >
            <Camera className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>{t('aiReportDump')}</span>
          </button>

          <button
            onClick={() => setActiveModal('leaderboard')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{t('leaderboard')}</span>
          </button>

          <button
            onClick={() => setActiveModal('paid')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>{t('bookPaidPickup')}</span>
          </button>

          <button
            onClick={() => setActiveModal('bot')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>{t('aiHelper')}</span>
          </button>

          <button
            onClick={() => {
              const radarEl = document.getElementById('vehicle-radar');
              radarEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all cursor-pointer"
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>{t('liveRadarBtn')}</span>
          </button>
        </div>
      </div>

      {/* AICTE PS-26195: Pillar 2 Clean & Green Tech Environmental Impact Bar */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
            🌱
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">CO₂ Avoided</span>
            <span className="text-base font-black text-white font-mono">48.5 kg</span>
            <span className="text-[9px] text-emerald-400 font-bold block">Spared via AI Segregation</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/20">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
            ♻️
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Landfill Diversion Rate</span>
            <span className="text-base font-black text-teal-300 font-mono">84.2%</span>
            <span className="text-[9px] text-teal-400 font-bold block">Routed to Recyclers</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/20">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
            🌳
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Tree Offset Equivalent</span>
            <span className="text-base font-black text-amber-300 font-mono">2.4 Trees</span>
            <span className="text-[9px] text-amber-400 font-bold block">Carbon Sequestration Eq.</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-lg">
            🎯
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">3-Bin Accuracy</span>
            <span className="text-base font-black text-cyan-300 font-mono">92.8%</span>
            <span className="text-[9px] text-cyan-400 font-bold block">MoSJE Citizen Standard</span>
          </div>
        </div>
      </div>

      {/* Awaiting Verification Banner Alert (if any complaint needs confirmation) */}
      {awaitingCount > 0 && (
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <FileCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {awaitingCount} {t('awaitingReviewTitle')}
              </h4>
              <p className="text-xs text-slate-300">
                {t('awaitingReviewDesc')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const item = filteredComplaints.find(c => c.status === 'awaiting_verification');
              if (item) setSelectedComplaint(item);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow cursor-pointer self-stretch sm:self-auto text-center"
          >
            {t('reviewEvidenceNow')}
          </button>
        </div>
      )}

      {/* Main Grid: Vehicle Radar + Complaints Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Vehicle Radar (5 cols) */}
        <div id="vehicle-radar" className="lg:col-span-5 space-y-4">
          <VehicleRadarCard />
        </div>

        {/* Right Column: Active Complaints Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>{t('communityComplaints')}</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  {filteredComplaints.length} tickets
                </span>
              </h3>
              <p className="text-xs text-slate-400">Track resolution progress and inspect photo evidence</p>
            </div>

            <button
              onClick={() => setActiveModal('report')}
              className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
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
                          src={c.beforeImage}
                          alt="Thumbnail"
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
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                          : c.status === 'in_progress'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {c.status === 'verified' ? '✓ Verified Clean' :
                         c.status === 'awaiting_verification' ? '★ Verification Ready' :
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
