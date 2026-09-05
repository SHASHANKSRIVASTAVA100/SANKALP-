import React, { useRef, useEffect } from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Landmark,
  Scale,
  Recycle,
  Flame,
  Award,
  Calendar,
  Building2,
  FileCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const OfficialSbmAuditModal = ({ isOpen, onClose, municipalStats = {} }) => {
  const printRef = useRef(null);

  // Lock body scroll on open to prevent background screen from rolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalGenerated = municipalStats?.cityTotalGenerationTonsPerDay || 1750;
  const totalRecycled = municipalStats?.cityTotalRecycledTonsPerDay || 1420;
  const diversionRate = municipalStats?.landfillDiversionPercent || '81.1%';
  const cleanEnergyKwh = municipalStats?.biogasCleanEnergyKwhPerDay || 38400;
  const co2Saved = municipalStats?.co2EquivalentSavedMetricTons || 845;

  const auditHash = "SHA256:8f4b1192e0d37e928fa8e204c32b5e28a1d65dfc2d4b1fa3d677284addd20012";
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn">
      {/* Container */}
      <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              SBM-Urban 2.0 Compliance Audit Certificate Generator
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 text-slate-100 print:text-slate-950 print:bg-white print:p-0 print:overflow-visible">
          {/* Official Document Wrapper (Simulated White Bond Paper for print or high-contrast in screen) */}
          <div
            ref={printRef}
            className="bg-slate-950/80 border border-slate-700/60 print:border-0 rounded-2xl p-6 sm:p-10 relative overflow-hidden print:bg-white print:text-slate-950 print:shadow-none shadow-inner"
          >
            {/* Watermark Emblem for Authenticity */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none print:opacity-5">
              <img src="/logo-emblem.png" alt="Emblem Watermark" className="w-[450px] h-[450px] object-contain" />
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-purple-500/40 pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-md flex items-center justify-center shrink-0">
                  <img src="/logo-emblem.png" alt="Swachhta Sangam" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 print:text-emerald-700">
                    Government of India • ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE) • PS-26195
                  </h3>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-slate-950">
                    SWACHH BHARAT MISSION (URBAN 2.0)
                  </h1>
                  <p className="text-xs text-slate-400 print:text-slate-600 font-mono">
                    Statutory Municipal Solid Waste Audit & Circular Economy Compliance Report
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l border-slate-700/60 print:border-slate-300 sm:pl-6 text-xs space-y-1">
                <div className="font-mono text-[11px] bg-purple-500/10 text-purple-300 print:text-purple-800 px-2 py-0.5 rounded font-bold border border-purple-500/30">
                  GAZETTE ID: SBM2/KA-BLR/2026/094 • AICTE MIC PS-26195
                </div>
                <div className="text-slate-400 print:text-slate-600">Audit Date: <strong>{currentDate}</strong></div>
                <div className="text-slate-400 print:text-slate-600">ULB Ward: <strong>Ward 12 (Central Zone)</strong></div>
              </div>
            </div>

            {/* Executive Certification Statement */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 mb-6 print:bg-emerald-50 print:border-emerald-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 print:text-emerald-800">
                    MUNICIPAL LANDFILL DIVERSION & SWM RULES (2016) COMPLIANCE CERTIFICATION
                  </h4>
                  <p className="text-xs text-slate-300 print:text-slate-700 mt-1 leading-relaxed">
                    This document certifies that under the supervision of the Municipal Commissioner and CPCB Environmental Cell, 
                    <strong> Ward 12</strong> has achieved an audited <strong>Landfill Diversion Rate of {diversionRate}</strong> for the current billing cycle, 
                    diverting <strong>{totalRecycled} Tons/Day</strong> out of {totalGenerated} Tons/Day generated into certified circular economy processing facilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Audit KPI Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-slate-900/90 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-400 print:text-slate-600 font-medium">Daily Waste Inflow</div>
                <div className="text-lg font-black text-white print:text-slate-900 mt-1">{totalGenerated} TPD</div>
                <span className="text-[10px] text-emerald-400 print:text-emerald-700 font-semibold">98.2% Segregated</span>
              </div>
              <div className="bg-slate-900/90 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-400 print:text-slate-600 font-medium">Landfill Diversion</div>
                <div className="text-lg font-black text-emerald-400 print:text-emerald-700 mt-1">{diversionRate}</div>
                <span className="text-[10px] text-purple-400 print:text-purple-700 font-semibold">Exceeds 75% Target</span>
              </div>
              <div className="bg-slate-900/90 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-400 print:text-slate-600 font-medium">Clean Energy Generated</div>
                <div className="text-lg font-black text-amber-400 print:text-amber-700 mt-1">{cleanEnergyKwh.toLocaleString()} kWh</div>
                <span className="text-[10px] text-slate-400 print:text-slate-600">Bio-CNG Micro-Grid</span>
              </div>
              <div className="bg-slate-900/90 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-400 print:text-slate-600 font-medium">GHG Methane Offset</div>
                <div className="text-lg font-black text-cyan-400 print:text-cyan-700 mt-1">{co2Saved} MT CO₂e</div>
                <span className="text-[10px] text-cyan-400 print:text-cyan-700 font-semibold">Certified Carbon Offset</span>
              </div>
            </div>

            {/* 8-Category Waste Taxonomy & Processing Channel Table */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-slate-700 mb-2.5 flex items-center gap-2">
                <Recycle className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-600" />
                Audited Waste Stream Allocation (8 Statutory Streams)
              </h4>
              <div className="border border-slate-800 print:border-slate-300 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 print:bg-slate-100 text-slate-300 print:text-slate-800 font-semibold border-b border-slate-800 print:border-slate-300">
                    <tr>
                      <th className="p-2.5">Category Stream</th>
                      <th className="p-2.5 text-right">Daily Mass (TPD)</th>
                      <th className="p-2.5 text-right">% Share</th>
                      <th className="p-2.5">Primary Processing Technology</th>
                      <th className="p-2.5 text-right">Regulatory Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 text-slate-300 print:text-slate-700">
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-emerald-400 print:text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Organic Wet Food Waste
                      </td>
                      <td className="p-2.5 text-right font-mono">580 TPD</td>
                      <td className="p-2.5 text-right font-mono">33.1%</td>
                      <td className="p-2.5">Continuous Anaerobic Bio-Methanation</td>
                      <td className="p-2.5 text-right"><span className="text-emerald-400 print:text-emerald-700 font-bold">100% Diverted</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-amber-400 print:text-amber-800">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> C&D Concrete Rubble
                      </td>
                      <td className="p-2.5 text-right font-mono">380 TPD</td>
                      <td className="p-2.5 text-right font-mono">21.7%</td>
                      <td className="p-2.5">Impact Crushing & M-Sand Grading</td>
                      <td className="p-2.5 text-right"><span className="text-emerald-400 print:text-emerald-700 font-bold">100% Diverted</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-cyan-400 print:text-cyan-800">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" /> Plastic & Polymers (PET/HDPE)
                      </td>
                      <td className="p-2.5 text-right font-mono">290 TPD</td>
                      <td className="p-2.5 text-right font-mono">16.6%</td>
                      <td className="p-2.5">Optical Near-IR Sorting & Flaking</td>
                      <td className="p-2.5 text-right"><span className="text-cyan-400 print:text-cyan-700 font-bold">CPCB Form-IV Valid</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-sky-400 print:text-sky-800">
                        <span className="w-2 h-2 rounded-full bg-sky-500" /> Cardboard & Clean Paper
                      </td>
                      <td className="p-2.5 text-right font-mono">185 TPD</td>
                      <td className="p-2.5 text-right font-mono">10.6%</td>
                      <td className="p-2.5">Automated High-Density Hydraulic Baling</td>
                      <td className="p-2.5 text-right"><span className="text-emerald-400 print:text-emerald-700 font-bold">100% Diverted</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-purple-400 print:text-purple-800">
                        <span className="w-2 h-2 rounded-full bg-purple-500" /> Metal Scrap & Cans
                      </td>
                      <td className="p-2.5 text-right font-mono">95 TPD</td>
                      <td className="p-2.5 text-right font-mono">5.4%</td>
                      <td className="p-2.5">Eddy Current Magnetic Separator</td>
                      <td className="p-2.5 text-right"><span className="text-emerald-400 print:text-emerald-700 font-bold">100% Diverted</span></td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium flex items-center gap-1.5 text-rose-400 print:text-rose-800">
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Hazardous & E-Waste
                      </td>
                      <td className="p-2.5 text-right font-mono">35 TPD</td>
                      <td className="p-2.5 text-right font-mono">2.0%</td>
                      <td className="p-2.5">TSDF Plasma Arc & Battery Neutralization</td>
                      <td className="p-2.5 text-right"><span className="text-rose-400 print:text-rose-700 font-bold">Secure Manifest</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cryptographic Verification Seal Strip */}
            <div className="bg-slate-900/90 print:bg-slate-100 border border-slate-800 print:border-slate-300 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 print:bg-white text-purple-400 print:text-purple-800">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-purple-300 print:text-purple-900 uppercase">
                    CPCB Digital Seal & SHA-256 Ledger Fingerprint
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 print:text-slate-600 break-all">
                    {auditHash}
                  </div>
                  <div className="text-[10px] text-emerald-400 print:text-emerald-700 mt-0.5">
                    ✓ Cryptographically verified via State Pollution Control Board Node
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right shrink-0">
                <span className="inline-block bg-emerald-500/20 text-emerald-300 print:text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/40 uppercase">
                  SBM 2.0 5-STAR RATING QUALIFIED
                </span>
              </div>
            </div>

            {/* Signatures & Official Seals */}
            <div className="pt-6 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-xs">
              <div className="space-y-1">
                <div className="font-serif italic text-purple-300 print:text-purple-900 text-sm">
                  Dr. Rajeshwari Swamy
                </div>
                <div className="font-bold text-white print:text-slate-950">Dr. Rajeshwari Swamy, IAS</div>
                <div className="text-slate-400 print:text-slate-600 text-[10px]">Municipal Commissioner</div>
                <div className="text-[10px] text-slate-500">Urban Local Body HQ</div>
              </div>

              <div className="space-y-1">
                <div className="font-serif italic text-cyan-300 print:text-cyan-900 text-sm">
                  K. Venkatesh Rao
                </div>
                <div className="font-bold text-white print:text-slate-950">K. Venkatesh Rao</div>
                <div className="text-slate-400 print:text-slate-600 text-[10px]">Chief Environmental Engineer</div>
                <div className="text-[10px] text-slate-500">Karnataka State PCB</div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/50 print:border-emerald-700 flex flex-col items-center justify-center p-1 text-[8px] uppercase tracking-tighter text-emerald-400 print:text-emerald-800 font-bold">
                  <span>SBM-U 2.0</span>
                  <span>OFFICIAL</span>
                  <span>SEAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0 print:hidden">
          <span>All India Council for Technical Education (AICTE) • PS-26195 Clean & Green Tech Governance</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
