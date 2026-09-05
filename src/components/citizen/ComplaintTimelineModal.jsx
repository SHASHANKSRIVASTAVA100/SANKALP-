import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  UserCheck,
  Camera,
  MapPin,
  Star,
  Award,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ComplaintTimelineModal = ({ complaint, onClose }) => {
  const { citizenConfirm, role } = useApp();
  const [rating, setRating] = useState(5);
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'slider'
  const [sliderPosition, setSliderPosition] = useState(50);
  const [feedback, setFeedback] = useState("");

  if (!complaint) return null;

  const isAwaitingVerification = complaint.status === 'awaiting_verification';
  const isVerified = complaint.status === 'verified';
  const isCitizenDone = complaint.reportedBy?.isCitizenVerified;

  const handleConfirm = () => {
    citizenConfirm(complaint.id, rating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
              isVerified ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
            }`}>
              {isVerified ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {complaint.id}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                  complaint.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  complaint.priority === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {complaint.priority} Priority
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">{complaint.title}</h2>
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
          {/* Progress Timeline Stepper */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Resolution Lifecycle Tracker
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
              {/* Step 1: Reported */}
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900 border border-emerald-500/30">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">1. AI Analysis</span>
                  <span className="text-[10px] text-emerald-400">Classified & SLA set</span>
                </div>
              </div>

              {/* Step 2: Assigned */}
              <div className={`flex items-start gap-2.5 p-2 rounded-lg ${
                complaint.assignedWorkerName ? 'bg-slate-900 border border-emerald-500/30' : 'bg-slate-900/40 border border-slate-800 opacity-60'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  complaint.assignedWorkerName ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {complaint.assignedWorkerName ? '✓' : '2'}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">2. Worker Assigned</span>
                  <span className="text-[10px] text-slate-400">
                    {complaint.assignedWorkerName || 'Pending Dispatch'}
                  </span>
                </div>
              </div>

              {/* Step 3: Evidence Uploaded */}
              <div className={`flex items-start gap-2.5 p-2 rounded-lg ${
                complaint.afterImage ? 'bg-slate-900 border border-emerald-500/30' : 'bg-slate-900/40 border border-slate-800 opacity-60'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  complaint.afterImage ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {complaint.afterImage ? '✓' : '3'}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">3. Site Cleaned</span>
                  <span className="text-[10px] text-slate-400">
                    {complaint.afterImage ? 'Evidence Uploaded' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Step 4: Verification */}
              <div className={`flex items-start gap-2.5 p-2 rounded-lg ${
                isVerified ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-200' :
                isAwaitingVerification ? 'bg-cyan-950/60 border border-cyan-500 animate-pulse' :
                'bg-slate-900/40 border border-slate-800 opacity-60'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isVerified ? 'bg-emerald-500 text-slate-950' :
                  isAwaitingVerification ? 'bg-cyan-500 text-slate-950' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {isVerified ? '✓' : '4'}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">4. Verification</span>
                  <span className="text-[10px] text-slate-300">
                    {isVerified ? 'Approved & Points Given' :
                     isAwaitingVerification ? 'Action Required!' : 'Pending Clean'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Before & After Verification Desk */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                Before vs After Photographic Evidence
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                    viewMode === 'split' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Side-by-Side
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('slider')}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                    viewMode === 'slider' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Interactive Slider
                </button>
              </div>
            </div>

            {/* Split View Mode */}
            {viewMode === 'split' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Photo */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      BEFORE CLEANUP (Citizen Report)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(complaint.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-rose-900/50 aspect-[4/3] bg-slate-950">
                    <img
                      src={complaint.beforeImage}
                      alt="Before Cleanup"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      📍 {complaint.locationName}
                    </div>
                  </div>
                </div>

                {/* After Photo */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      AFTER CLEANUP (Worker Evidence)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {complaint.afterImage ? 'Ready for Verification' : 'Cleaning in Progress'}
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-emerald-900/50 aspect-[4/3] bg-slate-950 flex items-center justify-center">
                    {complaint.afterImage ? (
                      <img
                        src={complaint.afterImage}
                        alt="After Cleanup"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-6 text-slate-500 space-y-2">
                        <Clock className="w-8 h-8 mx-auto animate-spin text-slate-600" />
                        <p className="text-xs">Worker is on site. Evidence will appear once submitted.</p>
                      </div>
                    )}
                    {complaint.afterImage && (
                      <div className="absolute bottom-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-700">
                        ✓ Disinfected & Transferred to MRF
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Interactive Comparison Slider */
              <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-[16/9] bg-slate-950 select-none">
                <img
                  src={complaint.beforeImage}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {complaint.afterImage && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <img
                      src={complaint.afterImage}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Slider divider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs shadow-lg">
                    ⇄
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                />
                <div className="absolute top-3 left-3 bg-rose-950/80 text-rose-300 text-[10px] px-2 py-1 rounded font-bold">
                  BEFORE
                </div>
                <div className="absolute top-3 right-3 bg-emerald-950/80 text-emerald-300 text-[10px] px-2 py-1 rounded font-bold">
                  AFTER
                </div>
              </div>
            )}
          </div>

          {/* Citizen Verification Action Box */}
          {isAwaitingVerification && !isCitizenDone && (
            <div className="bg-gradient-to-r from-emerald-950/90 to-slate-900 border-2 border-emerald-500/60 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      Citizen Verification & Satisfaction Rating
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Confirming the clean site releases your <strong>+50 Citizen Green Points</strong> and rewards the sanitation worker.
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                  +50 Points Reward
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300 font-medium">Rate Worker Quality:</span>
                <div className="flex items-center gap-1.5">
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
                </div>
                <span className="text-xs font-bold text-amber-300">{rating} of 5 Stars</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Cleaned & Claim 50 Green Points
                </button>
              </div>
            </div>
          )}

          {/* Already Verified Notice */}
          {isCitizenDone && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block">
                  You have verified this resolution ({complaint.reportedBy?.citizenRating || 5}★)!
                </span>
                <span className="text-slate-400 text-[11px]">
                  +50 Green Points were added to your civic account. Thank you for making our city cleaner!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
