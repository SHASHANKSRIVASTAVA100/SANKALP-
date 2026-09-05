import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Upload,
  X,
  CheckCircle2,
  Scale,
  Building,
  Send,
  Sparkles
} from 'lucide-react';

export const EvidenceUploadModal = ({ complaint, isOpen, onClose }) => {
  const { uploadEvidence } = useApp();

  const [afterImage, setAfterImage] = useState(
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
  );
  const [weightKg, setWeightKg] = useState(complaint?.aiAnalysis?.estimatedWeightKg || 45);
  const [mrfDestination, setMrfDestination] = useState("Municipal MRF Unit #12 - Indiranagar");

  if (!isOpen || !complaint) return null;

  const sampleCleanImages = [
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAfterImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadEvidence(complaint.id, afterImage, weightKg, mrfDestination);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Upload Cleaning Evidence & MRF Log
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {complaint.id}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Attach cleaned site photographic proof and weighbridge log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Comparison Preview (Before vs Uploaded After) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Photo */}
            <div>
              <span className="text-xs font-bold text-rose-400 block mb-1.5">
                BEFORE (Citizen Reference Photo):
              </span>
              <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-[4/3] bg-slate-950">
                <img
                  src={complaint.beforeImage}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* After Clean Photo */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-400">
                  AFTER CLEANUP (Live Evidence):
                </span>
                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] text-emerald-300 hover:underline cursor-pointer flex items-center gap-1 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                    <Camera className="w-3 h-3 text-emerald-400" />
                    <span>Camera</span>
                    <input type="file" accept="image/*" capture="environment" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <label className="text-[10px] text-slate-300 hover:underline cursor-pointer flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    <Upload className="w-3 h-3" />
                    <span>Gallery</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-emerald-500/50 aspect-[4/3] bg-slate-950">
                <img
                  src={afterImage}
                  alt="After Cleaning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-700">
                  ✓ Geostamped & Time-verified
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sample Selector for Clean Evidence */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5">
              Select Camera Snapshot / Upload Proof:
            </span>
            <div className="flex gap-2">
              {sampleCleanImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAfterImage(imgUrl)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border transition-all ${
                    afterImage === imgUrl ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Clean sample" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Weight & Destination inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                Actual Waste Collected (in Kilograms)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
                min="1"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                AI estimated ~{complaint.aiAnalysis?.estimatedWeightKg} kg
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                Disposal MRF / Recycler Destination
              </label>
              <select
                value={mrfDestination}
                onChange={(e) => setMrfDestination(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Municipal MRF Unit #12 - Indiranagar">Municipal MRF Unit #12 - Indiranagar</option>
                <option value="Central Compost & Biogas Plant - Koramangala">Central Compost & Biogas Plant - Koramangala</option>
                <option value="Authorized E-Waste & Hazmat Hub - Peenya">Authorized E-Waste & Hazmat Hub - Peenya</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
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
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit for Citizen & Supervisor Verification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
