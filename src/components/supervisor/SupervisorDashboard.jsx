import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssignWorkerModal } from './AssignWorkerModal';
import { SupervisorVerificationModal } from './SupervisorVerificationModal';
import { EscalationMatrixView } from './EscalationMatrixView';
import { FleetMonitoringView } from './FleetMonitoringView';
import { HotspotsAnalysisView } from './HotspotsAnalysisView';
import { SmartBinsTelemetryView } from './SmartBinsTelemetryView';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Eye,
  Filter,
  Flame,
  Radio,
  MapPin,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const SupervisorDashboard = () => {
  const { complaints, wardFilter, t } = useApp();

  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'escalation' | 'fleet' | 'hotspots'
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [assignModalComplaint, setAssignModalComplaint] = useState(null);
  const [verifyModalComplaint, setVerifyModalComplaint] = useState(null);

  // Compute Ward-level KPIs
  const wardComplaints = complaints.filter(c => {
    if (wardFilter === 'All Wards') return true;
    return c.ward === wardFilter;
  });

  const totalComplaints = wardComplaints.length;
  const pendingComplaints = wardComplaints.filter(c => c.status === 'pending').length;
  const inProgressComplaints = wardComplaints.filter(c => c.status === 'in_progress').length;
  const awaitingVerificationComplaints = wardComplaints.filter(c => c.status === 'awaiting_verification').length;
  const verifiedComplaints = wardComplaints.filter(c => c.status === 'verified').length;
  const overdueComplaints = wardComplaints.filter(
    c => c.status !== 'verified' && (new Date(c.slaDeadline) < new Date() || c.sosAlert)
  ).length;

  // Filter complaints for the management table
  const displayedComplaints = wardComplaints.filter(c => {
    if (priorityFilter !== 'all' && c.priority !== priorityFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Supervisor Command Hub Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-6 w-full max-w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                WARD COMMAND & CONTROL ROOM
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Jurisdiction: {wardFilter}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              {t('supervisorTitle')}
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {t('supervisorDesc')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-300">
              Active Shift Officer: <strong className="text-cyan-300">Inspector Ananya Rao</strong>
            </span>
          </div>
        </div>

        {/* Top KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('totalComplaints')}</span>
            <span className="text-xl font-bold text-white font-mono">{totalComplaints}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('pendingTriage')}</span>
            <span className="text-xl font-bold text-amber-400 font-mono">{pendingComplaints}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('inProgress')}</span>
            <span className="text-xl font-bold text-cyan-400 font-mono">{inProgressComplaints}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('awaitingReviewTitle')}</span>
            <span className="text-xl font-bold text-purple-400 font-mono">{awaitingVerificationComplaints}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('verifiedClean')}</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{verifiedComplaints}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">{t('slaBreaches')}</span>
            <span className={`text-xl font-bold font-mono ${overdueComplaints > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`}>
              {overdueComplaints}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0 no-scrollbar">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'complaints'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Complaint Management ({displayedComplaints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('escalation')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'escalation'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Escalation Hierarchy ({overdueComplaints} Breaches)</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'fleet'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>Vehicle Fleet Monitoring</span>
        </button>

        <button
          onClick={() => setActiveTab('hotspots')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'hotspots'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Hotspots & Root Cause Resolution</span>
        </button>

        <button
          onClick={() => setActiveTab('smart_bins')}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
            activeTab === 'smart_bins'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>📡 IoT Smart Bins (LoRaWAN)</span>
        </button>
      </div>

      {/* Tab 1: Complaint Management Table & Filters */}
      {activeTab === 'complaints' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 flex items-center gap-1 font-semibold">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                Filter Table:
              </span>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="awaiting_verification">Awaiting Verification</option>
                <option value="verified">Verified Clean</option>
              </select>
            </div>

            <span className="text-slate-400 font-mono text-[11px]">
              Showing {displayedComplaints.length} of {totalComplaints} tickets
            </span>
          </div>

          {/* Complaints Table */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[720px] w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-3">Ticket ID & Title</th>
                  <th className="py-3 px-3">Ward / Street</th>
                  <th className="py-3 px-3">AI Waste Analysis</th>
                  <th className="py-3 px-3">Priority / SLA</th>
                  <th className="py-3 px-3">Assigned Worker</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {displayedComplaints.map((c) => {
                  const isOverdue = new Date(c.slaDeadline) < new Date() && c.status !== 'verified';
                  const isAwaiting = c.status === 'awaiting_verification';

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-950/60 transition-colors group"
                    >
                      {/* Ticket Title & Photo */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={c.beforeImage}
                            alt="thumb"
                            className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[11px] font-bold text-slate-300">{c.id}</span>
                              {c.sosAlert && (
                                <span className="text-[9px] bg-rose-950 text-rose-300 px-1 rounded font-bold">
                                  SOS
                                </span>
                              )}
                            </div>
                            <div className="font-semibold text-white truncate max-w-[220px]">{c.title}</div>
                          </div>
                        </div>
                      </td>

                      {/* Ward */}
                      <td className="py-3 px-3 text-slate-300">
                        <div className="font-medium text-white">{c.ward.split('-')[0]}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{c.locationName}</div>
                      </td>

                      {/* AI Detection */}
                      <td className="py-3 px-3">
                        <span className="font-mono text-emerald-300 text-[11px] block truncate max-w-[180px]">
                          {c.aiAnalysis?.detectedTypes[0]}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ~{c.aiAnalysis?.estimatedWeightKg} kg • {c.aiAnalysis?.hazardScore}
                        </span>
                      </td>

                      {/* Priority & SLA */}
                      <td className="py-3 px-3">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded uppercase ${
                          c.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                          c.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {c.priority}
                        </span>
                        <div className={`text-[10px] font-mono mt-0.5 ${isOverdue ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                          {isOverdue ? '⚠️ SLA BREACHED' : `${c.slaHours}h SLA`}
                        </div>
                      </td>

                      {/* Assigned Worker */}
                      <td className="py-3 px-3">
                        {c.assignedWorkerName ? (
                          <div>
                            <span className="font-bold text-white block">{c.assignedWorkerName}</span>
                            <span className="text-[10px] text-slate-400">{c.assignedTeam}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'verified'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : c.status === 'awaiting_verification'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                            : c.status === 'in_progress'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {c.status === 'verified' ? 'Verified' :
                           c.status === 'awaiting_verification' ? 'Awaiting Audit' :
                           c.status === 'in_progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Worker Allocation Button */}
                          <button
                            onClick={() => setAssignModalComplaint(c)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium transition-all"
                            title="Assign or Reassign Team"
                          >
                            Assign Worker
                          </button>

                          {/* Verification Button */}
                          {isAwaiting && (
                            <button
                              onClick={() => setVerifyModalComplaint(c)}
                              className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold transition-all shadow"
                            >
                              Verify Proof
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Escalation Matrix View */}
      {activeTab === 'escalation' && <EscalationMatrixView />}

      {/* Tab 3: Fleet Monitoring */}
      {activeTab === 'fleet' && <FleetMonitoringView />}

      {/* Tab 4: Hotspots Analysis */}
      {activeTab === 'hotspots' && <HotspotsAnalysisView />}

      {/* Tab 5: IoT Smart Bins Telemetry */}
      {activeTab === 'smart_bins' && <SmartBinsTelemetryView />}

      {/* Modals */}
      <AssignWorkerModal
        complaint={assignModalComplaint}
        isOpen={!!assignModalComplaint}
        onClose={() => setAssignModalComplaint(null)}
      />
      <SupervisorVerificationModal
        complaint={verifyModalComplaint}
        isOpen={!!verifyModalComplaint}
        onClose={() => setVerifyModalComplaint(null)}
      />
    </div>
  );
};
