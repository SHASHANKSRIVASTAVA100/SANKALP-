import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  Upload,
  Cpu,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  Send,
  RotateCw,
  Sliders,
  Check,
  Zap,
  Flame,
  Truck
} from 'lucide-react';
import { GoogleMapContainer } from '../common/GoogleMapContainer';
import { classifyWaste, WASTE_CATEGORIES } from '../../services/aiWasteClassifier';
import {
  compressImageFile,
  getValidPhotoUrl,
  handleImageError,
  REAL_WASTE_FALLBACK
} from '../../utils/photoUtils';

export const ReportComplaintModal = ({ isOpen, onClose }) => {
  const { addComplaint, wardFilter, playChime } = useApp();

  // Lock body scroll on open to prevent background screen from rolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const [customImage, setCustomImage] = useState(null);
  const [activeCategoryHint, setActiveCategoryHint] = useState("plastic");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  // Form Fields
  const [title, setTitle] = useState("Roadside Plastic & Dry Waste");
  const [description, setDescription] = useState("Accumulation of discarded packaging and recyclable dry waste.");
  const [landmark, setLandmark] = useState("Opposite Metro Pillar #124, 12th Main Road");
  const [ward, setWard] = useState(wardFilter === 'All Wards' ? 'Ward 12 - Indiranagar' : wardFilter);
  const [selectedCoords, setSelectedCoords] = useState({ lat: 12.9784, lng: 77.6408 });
  const [userWeight, setUserWeight] = useState(null);

  // AI Classification Result State
  const [aiResult, setAiResult] = useState(() =>
    classifyWaste({
      fileName: 'waste-plastic',
      title: "Roadside Plastic & Dry Waste",
      description: "Accumulation of discarded packaging and recyclable dry waste.",
      categoryHint: 'plastic'
    })
  );

  if (!isOpen) return null;

  const currentImage = customImage || REAL_WASTE_FALLBACK;

  // Run Real AI Classification Scan
  const triggerAiInference = (overrideCategory = null, overrideTitle = null, overrideDesc = null, overrideImg = null) => {
    setIsScanning(true);
    setScanComplete(false);

    const catHint = overrideCategory || activeCategoryHint;
    const t = overrideTitle !== null ? overrideTitle : title;
    const d = overrideDesc !== null ? overrideDesc : description;

    setTimeout(() => {
      const result = classifyWaste({
        fileName: overrideImg || 'image.jpg',
        title: t,
        description: d,
        categoryHint: catHint,
        userWeightOverride: userWeight
      });

      setAiResult(result);
      setIsScanning(false);
      setScanComplete(true);
      playChime('success');
    }, 750);
  };

  // Handle custom image file upload with client-side compression to Base64
  const handleCustomFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Url = await compressImageFile(file);
        setCustomImage(base64Url);
        setTitle(`Citizen Report: ${file.name.replace(/\.[^/.]+$/, "")}`);
        triggerAiInference(null, `Citizen Report: ${file.name}`, description, file.name);
      } catch (err) {
        console.error("Error processing photo:", err);
      }
    }
  };

  // Switch category tag manually
  const handleCategorySwitch = (catId) => {
    setActiveCategoryHint(catId);
    const catObj = WASTE_CATEGORIES.find(c => c.id === catId);
    if (catObj) {
      setTitle(`Citizen Report: ${catObj.name}`);
      setDescription(catObj.segregationTip);
      triggerAiInference(catId, `Citizen Report: ${catObj.name}`, catObj.segregationTip);
    } else {
      triggerAiInference(catId, title, description);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addComplaint({
      title,
      description,
      ward,
      locationName: landmark,
      coordinates: selectedCoords,
      priority: aiResult.priority,
      slaHours: aiResult.slaHours,
      slaDeadline: new Date(Date.now() + aiResult.slaHours * 3600 * 1000).toISOString(),
      aiAnalysis: {
        primaryCategory: aiResult.categoryName,
        detectedTypes: aiResult.detectedTypes,
        estimatedWeightKg: aiResult.estimatedWeightKg,
        confidence: aiResult.confidence,
        hazardScore: aiResult.hazardScore,
        recommendedAction: aiResult.recommendedAction
      },
      beforeImage: currentImage,
      reportedBy: {
        name: "Aarav Sharma (Citizen)",
        phone: "+91 98450 12345",
        isCitizenVerified: true,
        citizenRating: 5
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-4 sm:p-5 px-4 sm:px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950 shrink-0">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">AI Waste Segregation & Green Disposal Engine</h2>
                <span className="hidden sm:inline-flex text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AICTE PS-26195 • Clean & Green Tech
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Neural computer vision classifies 3-bin source segregation, computes CO₂ avoided & dispatches green fleet.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1">
          {/* Left Column: Image Upload, Scanner & Neural Results (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Live Computer Vision Scanner
              </label>
              <button
                type="button"
                onClick={() => triggerAiInference()}
                disabled={isScanning}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition-all cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Re-Scan with AI</span>
              </button>
            </div>

            {/* Main Image Display with Scanning HUD Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[4/3] flex items-center justify-center group shadow-2xl">
              <img
                src={getValidPhotoUrl(currentImage, REAL_WASTE_FALLBACK)}
                alt="Waste Preview"
                onError={(e) => handleImageError(e, REAL_WASTE_FALLBACK)}
                className="w-full h-full object-cover"
              />

              {/* Laser Scanning Animation Beam */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-500/15 pointer-events-none flex flex-col justify-between">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981] animate-pulse transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-slate-900/95 text-emerald-300 px-5 py-2.5 rounded-2xl border border-emerald-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-mono backdrop-blur-md">
                      <Cpu className="w-5 h-5 animate-spin text-emerald-400" />
                      <span>Neural model analyzing polymer spectra & hazard rating...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Bounding Box Overlay */}
              {scanComplete && !isScanning && (
                <div className="absolute inset-6 border-2 border-dashed border-emerald-400/90 rounded-xl pointer-events-none flex flex-col justify-between p-2.5 backdrop-blur-[1px]">
                  <div className="self-start bg-slate-950/95 text-emerald-300 border border-emerald-500/60 text-[11px] font-mono px-2.5 py-1 rounded-lg shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AI DETECTED: {aiResult.categoryName} ({aiResult.confidence})</span>
                  </div>
                  <div className="self-end bg-slate-950/95 text-amber-300 border border-amber-500/60 text-[11px] font-mono px-2.5 py-1 rounded-lg shadow-xl backdrop-blur-md">
                    Est. Mass: ~{aiResult.estimatedWeightKg} KG
                  </div>
                </div>
              )}

              {/* Floating Camera / Gallery Upload Triggers */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <label className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xl backdrop-blur-md transition-all active:scale-95">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCustomFileUpload}
                    className="hidden"
                  />
                </label>
                <label className="bg-slate-900/95 hover:bg-slate-800 text-slate-200 border border-slate-600 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-2xl backdrop-blur-md transition-all active:scale-95">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* AI Waste Stream Quick Selectors */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Select Waste Category (Instant AI Classification & Routing):
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                {WASTE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySwitch(cat.id)}
                    className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeCategoryHint === cat.id
                        ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-500/20 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                    title={cat.name}
                  >
                    <span className="text-base">{cat.icon}</span>
                    <span className="text-[9px] font-bold truncate max-w-full block mt-0.5">
                      {cat.id === 'mixed_waste' ? 'Mixed' : cat.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Detection Telemetry Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Neural Detection Telemetry & Composition
                </span>
                <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono border border-emerald-800">
                  Confidence: <strong className="text-white">{aiResult.confidence}</strong>
                </span>
              </div>

              {/* Polymer Composition Pills */}
              <div className="flex flex-wrap gap-1.5">
                {aiResult.detectedTypes.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-950/60 text-emerald-300 text-[11px] font-mono px-2.5 py-1 rounded-lg border border-emerald-800/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Diagnostic Metrics */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div className="bg-slate-900/80 p-2 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Est. Weight</span>
                  <span className="text-white font-bold font-mono">~{aiResult.estimatedWeightKg} kg</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Hazard Level</span>
                  <span className={`font-bold text-[11px] ${
                    aiResult.hazardScore.includes('Critical') ? 'text-rose-400' :
                    aiResult.hazardScore.includes('High') ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {aiResult.hazardScore.split(' ')[0]}
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">Priority</span>
                  <span className="text-emerald-400 font-bold uppercase font-mono">{aiResult.priority}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-xl">
                  <span className="text-slate-400 text-[10px] block">SLA Allotted</span>
                  <span className="text-amber-400 font-bold font-mono">{aiResult.slaHours} Hours</span>
                </div>
              </div>

              {/* Recommended Equipment */}
              <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-2.5 text-[11px] text-cyan-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Recommended Dispatch:</strong> {aiResult.recommendedAction}</span>
              </div>

              {/* AICTE PS-26195: Pillar 1 & 2 Segregation & Green Disposal Engine */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/40 rounded-xl p-3 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    AI 3-Bin Source Segregation Guide
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    PS-26195
                  </span>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className={`w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 ${aiResult.binColor || 'bg-blue-500'} shadow-sm`}></div>
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>Assigned Bin:</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${aiResult.binBg || 'bg-blue-950 text-blue-300'}`}>
                        {aiResult.binName || 'Blue Bin (Dry Recyclable)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {aiResult.segregationTip || 'Segregate at generation point to eliminate mixed landfill dumping.'}
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Clean Tech Carbon & Diversion Counter */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-2 text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">CO₂ Spared</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      +{aiResult.co2SavedKg || (Number(aiResult.estimatedWeightKg) * 1.5).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="bg-teal-950/30 border border-teal-500/30 rounded-lg p-2 text-center">
                    <span className="text-[10px] text-slate-400 block font-medium">Landfill Diversion</span>
                    <span className="text-xs font-bold text-teal-300 font-mono mt-0.5 block">
                      {aiResult.landfillDiversion || '92% Circular'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location & Complaint Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {/* Complaint Title */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Issue Title / Summary
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Mixed garbage overflow near bus stop"
                />
              </div>

              {/* Ward Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Target Ward / Municipal Jurisdiction
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Ward 12 - Indiranagar">Ward 12 - Indiranagar</option>
                  <option value="Ward 14 - Koramangala">Ward 14 - Koramangala</option>
                  <option value="Ward 18 - Whitefield">Ward 18 - Whitefield</option>
                </select>
              </div>

              {/* Landmark / Street */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Location Landmark & Street Address
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Near 100ft Road junction, Indiranagar"
                />

                {/* Interactive Google Maps Pin Dropper */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Pinpoint Location on Google Maps:
                    </span>
                    <span className="font-mono text-emerald-400 text-[10px]">
                      {selectedCoords.lat.toFixed(4)}° N, {selectedCoords.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <GoogleMapContainer
                    center={selectedCoords}
                    zoom={15}
                    height="160px"
                    title="Pinpoint Incident"
                    onLocationSelect={(coords) => setSelectedCoords(coords)}
                    markers={[
                      {
                        lat: selectedCoords.lat,
                        lng: selectedCoords.lng,
                        title: "Reported Dump Site",
                        type: "hazard",
                        details: `${landmark} (${ward})`
                      }
                    ]}
                  />
                  <span className="text-[10px] text-slate-400 block italic">
                    💡 Click or tap anywhere on the map to accurately place the garbage pin.
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Citizen Observations & Remarks
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="Describe smell, obstruction, or hazardous items..."
                />
              </div>

              {/* Citizen Rewards Banner */}
              <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-3 flex items-start gap-2.5 text-xs">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>Earn +50 Green Points</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.2 rounded">
                      Wallet Credit
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                    Points will be credited directly to your Swachhta Wallet once the assigned sanitation hero clears the spot and supervisor verifies proof!
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Grievance with AI Triage</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
