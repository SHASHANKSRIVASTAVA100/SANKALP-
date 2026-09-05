import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  Star,
  MapPin,
  Camera,
  AlertTriangle,
  Send,
  Eye
} from 'lucide-react';

export const SupervisorVerificationModal = ({ complaint, isOpen, onClose }) => {
  const { supervisorAction } = useApp();

  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [actionType, setActionType] = useState('approve'); // 'approve' | 'rework' | 'reject' | 'ground_inspect'

  if (!isOpen || !complaint) return null;

  const isCitizenDone = complaint.reportedBy?.isCitizenVerified;

  const handleExecute = () => {
    supervisorAction(complaint.id, actionType, rating, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Supervisor Verification & Audit Desk
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {complaint.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Audit Before/After imagery, check citizen feedback, and issue final certification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Dual Photographic Evidence Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  BEFORE (Reported Condition)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {complaint.aiAnalysis?.estimatedWeightKg} kg est.
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-rose-900/40 aspect-[4/3] bg-slate-950">
                <img src={complaint.beforeImage} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-slate-950/90 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  Reported by: {complaint.reportedBy?.name}
                </div>
              </div>
            </div>

            {/* After Photo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  AFTER (Worker Evidence Submission)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  Logged: {complaint.collectedWeightKg || 45} kg
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-emerald-900/40 aspect-[4/3] bg-slate-950 flex items-center justify-center">
                {complaint.afterImage ? (
                  <img src={complaint.afterImage} alt="After" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 text-slate-500 text-xs">
                    Evidence not yet submitted by worker
                  </div>
                )}
                {complaint.afterImage && (
                  <div className="absolute bottom-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-700">
                    Cleaned by: {complaint.assignedWorkerName}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Citizen Verification Status Bar */}
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
            isCitizenDone
              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                isCitizenDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {isCitizenDone ? '✓' : '!'}
              </div>
              <div>
                <span className="font-bold block text-white">
                  Citizen Verification: {isCitizenDone ? "CONFIRMED BY CITIZEN" : "AWAITING CITIZEN CONFIRMATION"}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isCitizenDone
                    ? `Citizen gave ${complaint.reportedBy?.citizenRating || 5}★ rating and verified spot is spotless.`
                    : "Citizen has been sent a mobile notification to confirm the cleaned site."}
                </span>
              </div>
            </div>
            {isCitizenDone && (
              <span className="bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-full text-xs">
                Verified ({complaint.reportedBy?.citizenRating || 5}★)
              </span>
            )}
          </div>

          {/* Supervisor Decision Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Supervisor Verification Verdict:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setActionType('approve')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  actionType === 'approve'
                    ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Close
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Spot cleared to municipal standards
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActionType('rework')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  actionType === 'rework'
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/30 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                  Request Rework
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Residue remains, send worker back
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActionType('ground_inspect')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  actionType === 'ground_inspect'
                    ? 'bg-cyan-950/60 border-cyan-500 ring-2 ring-cyan-500/30 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 text-cyan-400">
                  <Eye className="w-4 h-4" />
                  Ground Inspection
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Dispatch sanitary inspector in person
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActionType('reject')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  actionType === 'reject'
                    ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/30 text-rose-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center gap-1.5 text-rose-400">
                  <XCircle className="w-4 h-4" />
                  Reject Evidence
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Fake or invalid photo evidence
                </div>
              </button>
            </div>
          </div>

          {/* Rate Worker & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Supervisor Rating for {complaint.assignedWorkerName || 'Worker'}:
              </label>
              <div className="flex items-center gap-1.5 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-300 ml-2">{rating}★</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Supervisor Audit Remarks:
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Spot thoroughly sanitized with bleaching powder"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExecute}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Finalize Supervisor Verdict
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
