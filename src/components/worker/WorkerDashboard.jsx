import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceUploadModal } from './EvidenceUploadModal';
import { SupervisorHelpModal } from './SupervisorHelpModal';
import { GoogleMapContainer } from '../common/GoogleMapContainer';
import {
  HardHat,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Camera,
  HelpCircle,
  TrendingUp,
  Award,
  Navigation,
  CheckSquare,
  Square,
  DollarSign,
  Truck,
  Sparkles,
  Phone,
  ShieldCheck,
  Star
} from 'lucide-react';
import {
  getValidPhotoUrl,
  handleImageError,
  REAL_WASTE_FALLBACK,
  REAL_CLEAN_FALLBACK
} from '../../utils/photoUtils';

export const WorkerDashboard = () => {
  const {
    workers,
    activeWorkerId,
    setActiveWorkerId,
    complaints,
    toggleAttendance,
    playChime,
    addNotification,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'checklist' | 'gigs' | 'archive'
  const [uploadModalComplaint, setUploadModalComplaint] = useState(null);
  const [sosModalComplaint, setSosModalComplaint] = useState(null);
  const [showRouteMap, setShowRouteMap] = useState(false);

  // Active Worker Profile
  const currentWorker = workers.find(w => w.id === activeWorkerId) || workers[0];

  // Daily Routine Checklist State
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Morning Ward Sweep & Footpath Clearance (12th to 16th Main)", done: true, time: "08:15 AM" },
    { id: 2, label: "Door-to-Door Source Segregation Compliance Check (Sector 3)", done: true, time: "09:40 AM" },
    { id: 3, label: "Resolve Assigned App Complaints with AI Classification", done: false, time: "Pending" },
    { id: 4, label: "Secondary Waste Transfer to Indiranagar MRF Weighbridge", done: false, time: "Pending" },
    { id: 5, label: "Disinfectant Lime Powder Spray at Cleared Hotspots", done: false, time: "Pending" }
  ]);

  // Paid Gigs Available for Worker
  const [availableGigs, setAvailableGigs] = useState([
    {
      id: "GIG-101",
      title: "Royal Grand Banquet - Post-Birthday Cleanup",
      location: "80 Feet Road, Indiranagar (450m from you)",
      payout: 450,
      wasteType: "Dry Disposable Paper & Food Waste (Approx. 60 kg)",
      timeSlot: "Today, 03:00 PM",
      status: "available"
    },
    {
      id: "GIG-102",
      title: "Cafe Coffee Day Commercial Bulk Pickup",
      location: "100 Feet Road, Near Metro (800m)",
      payout: 320,
      wasteType: "Coffee Grounds & Paper Cartons (Approx. 40 kg)",
      timeSlot: "Today, 05:30 PM",
      status: "available"
    }
  ]);

  // Complaints assigned to this worker
  const myComplaints = complaints.filter(c => c.assignedWorkerId === currentWorker.id);
  const activeTasks = myComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned');
  const completedTasks = myComplaints.filter(c => c.status === 'verified' || c.status === 'awaiting_verification');

  // Checklist Toggle
  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextDone = !item.done;
        return {
          ...item,
          done: nextDone,
          time: nextDone ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Pending"
        };
      }
      return item;
    }));
    playChime();
  };

  // Accept Paid Gig
  const handleAcceptGig = (gigId) => {
    setAvailableGigs(prev => prev.map(g => {
      if (g.id === gigId) return { ...g, status: "accepted" };
      return g;
    }));
    playChime('success');
    addNotification(
      "Paid Gig Accepted! 💰",
      `Added gig to your route! ₹${availableGigs.find(g => g.id === gigId)?.payout} will be credited upon MRF drop-off.`,
      "worker"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Worker Hero Status Card */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6 w-full max-w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Worker Profile Info */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative shrink-0">
              <img
                src={currentWorker.avatar}
                alt={currentWorker.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-lg shadow-amber-950"
              />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                currentWorker.attendance === 'punched_in' ? 'bg-emerald-400' : 'bg-slate-600'
              }`}></span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{currentWorker.name}</h1>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                  {currentWorker.role}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  {currentWorker.ward} ({currentWorker.team})
                </span>
                <span>•</span>
                <span className="text-amber-300 font-bold flex items-center gap-1 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {currentWorker.rating} ★ ({currentWorker.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Worker Selector (For Demo Testing) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs w-full sm:w-auto">
              <span className="text-slate-400 text-[11px] block">Select Field Worker:</span>
              <select
                value={activeWorkerId}
                onChange={(e) => setActiveWorkerId(e.target.value)}
                className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer w-full"
              >
                {workers.map(w => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-slate-200">
                    {w.name} ({w.ward.split('-')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance Punch-In / Punch-Out Toggle */}
            <button
              onClick={() => toggleAttendance(currentWorker.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer ${
                currentWorker.attendance === 'punched_in'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${
                currentWorker.attendance === 'punched_in' ? 'bg-slate-950 animate-ping' : 'bg-slate-500'
              }`}></span>
              <span>
                {currentWorker.attendance === 'punched_in'
                  ? `Shift Active (In @ ${currentWorker.punchInTime || '07:30 AM'})`
                  : 'Punch In (Start Shift)'}
              </span>
            </button>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t('activeTasks')}</span>
            <span className="text-lg font-bold text-amber-400 font-mono">
              {activeTasks.length} Tickets
            </span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t('completedToday')}</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {currentWorker.completedToday} Spots Cleared
            </span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t('wasteClearedToday')}</span>
            <span className="text-lg font-bold text-white font-mono">
              {currentWorker.totalKgClearedToday} KG
            </span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block">{t('dailyIncentives')}</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              ₹{currentWorker.earningsToday}
            </span>
          </div>
        </div>
      </div>

      {/* AICTE PS-26195: Pillar 3 National Sanitization Worker Safety & PPE Protocol */}
      <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Pillar 3: Frontline Worker Safety & PPE Compliance (AICTE PS-26195)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            Zero Manual Scavenging Mandate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">✓</span>
            <div>
              <strong className="text-white block text-[11px]">Nitrile Heavy-Duty Safety Gloves</strong>
              <span className="text-slate-400 text-[10px]">Verified Puncture & Chemical Resistant</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">✓</span>
            <div>
              <strong className="text-white block text-[11px]">Steel-Toe Safety Gumboots</strong>
              <span className="text-slate-400 text-[10px]">Anti-slip wet terrain & glass protection</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">✓</span>
            <div>
              <strong className="text-white block text-[11px]">FFP3 Toxic Vapor & Odor Respirator</strong>
              <span className="text-slate-400 text-[10px]">Active bio-filtration for sewage & wet piles</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Encountering hazardous chemical waste, dead animal, or deep drain blockage?</span>
          </div>
          <button
            type="button"
            onClick={() => setSosModalComplaint(activeTasks[0] || complaints[0])}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow cursor-pointer shrink-0 self-stretch sm:self-auto text-center"
          >
            Escalate to Mechanized JCB / Suction
          </button>
        </div>
      </div>

      {/* Tabs Navigation (Scrollable on mobile) */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0 no-scrollbar">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'tasks'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <HardHat className="w-4 h-4" />
          <span>{t('activeTasks')} ({activeTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>{t('dailyChecklist')}</span>
        </button>

        <button
          onClick={() => setActiveTab('gigs')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'gigs'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{t('paidGigs')} ({availableGigs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('archive')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'archive'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{t('completedHistory')}</span>
        </button>
      </div>

      {/* Tab 1: Active Assigned Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Route Map Header & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span>Daily Pickup Route & Navigation</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/30">
                    {activeTasks.length} Assigned Spots
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Optimized collection sequence for {currentWorker.ward}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowRouteMap(!showRouteMap)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow cursor-pointer text-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{showRouteMap ? "Hide Route Map" : "🗺️ View Route on Google Maps"}</span>
            </button>
          </div>

          {/* Expandable Google Maps Route Map */}
          {showRouteMap && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Circuit Waypoints (Google Maps)
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Indiranagar Zone 12
                </span>
              </div>
              <GoogleMapContainer
                center={activeTasks[0]?.coordinates || { lat: 12.9784, lng: 77.6408 }}
                zoom={15}
                height="320px"
                title="Assigned Daily Pickup Circuit"
                markers={activeTasks.map((t, idx) => ({
                  lat: t.coordinates?.lat || 12.9784,
                  lng: t.coordinates?.lng || 77.6408,
                  title: `Stop #${idx + 1}: ${t.id}`,
                  type: "hazard",
                  extra: `${t.priority} priority`,
                  details: `${t.title} at ${t.locationName}. Est. Weight: ${t.aiAnalysis?.estimatedWeightKg} kg.`
                }))}
                polylines={activeTasks.length > 0 ? [{
                  path: [
                    { lat: 12.9750, lng: 77.6380 },
                    ...activeTasks.map(t => ({ lat: t.coordinates?.lat || 12.9784, lng: t.coordinates?.lng || 77.6408 }))
                  ],
                  color: "#f59e0b"
                }] : []}
              />
            </div>
          )}

          {activeTasks.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-base">All Caught Up! Zero Pending Assigned Tasks</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No active complaints currently require your intervention. Switch to Supervisor Hub to assign new complaints, or pick up a local Paid Gig!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl space-y-4 transition-all"
                >
                  {/* Task Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                          {task.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          task.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          task.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {task.priority} Priority
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mt-1">{task.title}</h3>
                    </div>

                    {/* SLA Countdown Timer */}
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-right shrink-0">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-amber-400" />
                        SLA Deadline
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        01h 12m remaining
                      </div>
                    </div>
                  </div>

                  {/* Location & Photo */}
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-4 relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
                      <img
                        src={getValidPhotoUrl(task.beforeImage, REAL_WASTE_FALLBACK)}
                        alt="Task"
                        onError={(e) => handleImageError(e, REAL_WASTE_FALLBACK)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 bg-slate-950/90 text-[9px] text-white px-1.5 py-0.2 rounded font-mono">
                        Citizen Photo
                      </div>
                    </div>

                    <div className="col-span-8 space-y-1 text-xs">
                      <div className="text-slate-300 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-white">{task.locationName}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        AI Detection: <strong className="text-emerald-300 font-mono">{task.aiAnalysis?.detectedTypes[0]}</strong>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Est. Weight: <strong className="text-white">~{task.aiAnalysis?.estimatedWeightKg} kg</strong>
                      </div>
                    </div>
                  </div>

                  {/* Supervisor Note if present */}
                  {task.supervisorNotes && (
                    <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-2.5 text-[11px] text-cyan-200">
                      <strong>Supervisor Note:</strong> {task.supervisorNotes}
                    </div>
                  )}

                  {/* SOS Alert banner if present */}
                  {task.sosAlert && (
                    <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-2.5 text-[11px] text-rose-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Blocker Pending: <strong>{task.sosAlert.reason}</strong></span>
                      </div>
                      <span className="text-[10px] bg-rose-900 px-1.5 py-0.2 rounded">Flagged</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    {/* SOS Blocker Trigger */}
                    <button
                      type="button"
                      onClick={() => setSosModalComplaint(task)}
                      className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5"
                      title="Report Blocker (Need JCB, Animals, Hazmat)"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Supervisor Help!</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${task.coordinates.lat},${task.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 shadow"
                        title="Open Google Maps Turn-by-Turn Mobile Directions"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>Google Directions</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setUploadModalComplaint(task)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Upload Evidence</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Daily Routine Checklist */}
      {activeTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white">Daily Ward Maintenance Checklist</h3>
              <p className="text-xs text-slate-400">Standard operating procedure tasks for {currentWorker.ward}</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
              {checklist.filter(c => c.done).length} / {checklist.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  item.done
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.done ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 shrink-0" />
                  )}
                  <span className={`text-xs font-medium ${item.done ? 'text-white line-through opacity-80' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </div>

                <div className="text-right font-mono text-[11px] text-slate-500">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Paid Service Gigs */}
      {activeTab === 'gigs' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-teal-950/60 to-slate-900 border border-teal-500/30 rounded-2xl p-5">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-400" />
              Neighborhood Commercial Gigs Marketplace
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Pick up paid post-event or shop bulk waste pickups along your route for instant direct incentive pay!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800">
                      {gig.id}
                    </span>
                    <h4 className="font-bold text-sm text-white mt-1">{gig.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                      {gig.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Payout:</span>
                    <span className="text-lg font-mono font-black text-emerald-400">+₹{gig.payout}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                  <div className="text-slate-400">
                    Waste Spec: <strong className="text-slate-200">{gig.wasteType}</strong>
                  </div>
                  <div className="text-slate-400">
                    Slot Window: <strong className="text-teal-300">{gig.timeSlot}</strong>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  {gig.status === 'accepted' ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Accepted & Added to Route
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAcceptGig(gig.id)}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow"
                    >
                      Accept Gig (+₹{gig.payout})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Completed Complaints History */}
      {activeTab === 'archive' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-white">Your Completed Jobs Archive</h3>
          <div className="space-y-3">
            {completedTasks.map((c) => (
              <div
                key={c.id}
                className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                    <img
                      src={getValidPhotoUrl(c.afterImage || c.beforeImage, REAL_CLEAN_FALLBACK)}
                      alt="Resolved"
                      onError={(e) => handleImageError(e, REAL_CLEAN_FALLBACK)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">{c.id}</span>
                      <span className="text-xs font-bold text-white">{c.title}</span>
                    </div>
                    <div className="text-xs text-slate-400">{c.locationName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">MRF Log:</span>
                    <span className="text-white font-bold">{c.collectedWeightKg || 65} kg</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Citizen Rating:</span>
                    <span className="text-amber-400 font-bold">
                      {c.reportedBy?.citizenRating || 5} ★
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <EvidenceUploadModal
        complaint={uploadModalComplaint}
        isOpen={!!uploadModalComplaint}
        onClose={() => setUploadModalComplaint(null)}
      />
      <SupervisorHelpModal
        complaint={sosModalComplaint}
        isOpen={!!sosModalComplaint}
        onClose={() => setSosModalComplaint(null)}
      />
    </div>
  );
};
