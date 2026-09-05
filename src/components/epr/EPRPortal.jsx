import React, { useState } from 'react';
import { EPR_COMPANIES } from '../../data/mockData';
import {
  Building2,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  FileText,
  DollarSign,
  Users,
  Award,
  ArrowRight,
  Download,
  Layers,
  TrendingUp,
  Cpu,
  Flame,
  Check,
  HelpCircle,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Factory,
  Truck,
  Recycle
} from 'lucide-react';

export const EPRPortal = () => {
  const [selectedCompany, setSelectedCompany] = useState(EPR_COMPANIES[0]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'certificate' | 'network'
  const [showExplainer, setShowExplainer] = useState(true);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText("0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069");
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 w-full max-w-full overflow-x-hidden">
      {/* EPR Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 p-4 sm:p-6 md:p-8 shadow-2xl space-y-4 w-full max-w-full">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                BRAND PLASTIC RECYCLING & EPR PORTAL
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                CPCB (GOVT. POLLUTION BOARD) APPROVED
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1">
              Company Waste Cleanup & Recycling Proof (EPR)
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed mt-1">
              By law, companies that package goods (like beverage bottles & electronics) must pay to clean up equal amounts of plastic. Here, brands track their real cleanup progress, reward waste workers with bonus wages, and receive verified digital certificates.
            </p>
          </div>

          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="px-3 py-1.5 rounded-xl bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-center"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showExplainer ? 'Hide 30-Second Guide' : 'What is EPR? (30-Second Guide)'}</span>
            {showExplainer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Friendly 30-Second Explainer Banner (What is EPR?) */}
        {showExplainer && (
          <div className="bg-slate-950/90 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 mt-3 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>How Extended Producer Responsibility (EPR) Works in 3 Simple Steps:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px]">1</span>
                  <span>Brands Sell Packaged Goods</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Companies like beverage & electronics makers register their yearly plastic footprint with the government.
                </p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                  <span>Workers Collect & Get Bonus Pay</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Municipal sanitation heroes collect the plastic from streets. Corporate EPR funds pay them direct cash bonuses per kg!
                </p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[11px]">3</span>
                  <span>Recycled with Official Certificate</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Waste is recycled at certified factories, and companies get an official, tamper-proof certificate to prove compliance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher (Scrollable on Mobile) */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800 overflow-x-auto pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Company Progress & Targets</span>
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Recycling Certificate (PDF)</span>
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'network'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>How Everyone Works Together (The System)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Corporate Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Company Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full max-w-full overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Select Company to View:</span>
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {EPR_COMPANIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCompany(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      selectedCompany.id === c.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3 h-3 text-indigo-400" />
                    <span>{c.companyName}</span>
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full shrink-0 self-start sm:self-auto font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Government Status: {selectedCompany.status}
            </span>
          </div>

          {/* Compliance Progress Cards (Plain Language) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-slate-700 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Yearly Target (Required by Law)</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Quota</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {selectedCompany.targetTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <span className="text-[11px] text-indigo-300 block font-medium">
                {selectedCompany.category}
              </span>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                Amount of plastic packaging company introduced into city
              </p>
            </div>

            <div className="bg-slate-900 border border-emerald-900/40 rounded-2xl p-5 space-y-2 hover:border-emerald-700/50 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-medium">Waste Collected by Workers</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  {selectedCompany.compliancePercent}% Done
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {selectedCompany.collectedTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${selectedCompany.compliancePercent}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                Picked up from wards by 45 verified municipal workers
              </p>
            </div>

            <div className="bg-slate-900 border border-cyan-900/40 rounded-2xl p-5 space-y-2 hover:border-cyan-700/50 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-medium">Turned into New Products</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded font-bold">
                  Recycled
                </span>
              </div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {selectedCompany.recycledTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <span className="text-[11px] text-slate-300 block font-medium">
                Sent to: {selectedCompany.authorizedRecycler.split('(')[0]}
              </span>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                Melted into recycled plastic pellets for reuse
              </p>
            </div>

            <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-5 space-y-2 hover:border-amber-700/50 transition-all shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-medium">Worker Bonus Cash Paid</span>
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-bold">
                  Direct Benefit
                </span>
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {selectedCompany.currentCreditValue}
              </div>
              <span className="text-[11px] text-slate-300 block font-medium">
                Distributed to 45 Sanitation Heroes
              </span>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                Extra income above their salary for keeping streets clean
              </p>
            </div>
          </div>

          {/* 5-Step Traceable Digital Flow (Human-Friendly) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  Step-by-Step Waste Journey (From Street to Recycled Product)
                </h3>
                <p className="text-xs text-slate-400">
                  Every gram of plastic is tracked with photos and weight checks so companies cannot submit fake recycling claims.
                </p>
              </div>
              <span className="bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% Traceable Chain
              </span>
            </div>

            {/* 5-Step Visual Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {selectedCompany.digitalTrail.map((step) => {
                const stepIcons = [Building2, Users, Scale, Factory, FileText];
                const StepIcon = stepIcons[step.step - 1] || Layers;
                return (
                  <div
                    key={step.step}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/50 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs">
                          {step.step}
                        </span>
                        <span className="text-slate-500 font-mono text-[10px]">{step.time}</span>
                      </div>
                      <div className="font-bold text-xs text-white flex items-center gap-1.5">
                        <StepIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                    <div className="text-emerald-400 text-[10px] font-mono flex items-center gap-1 pt-2 border-t border-slate-800">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Govt. Verified</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Verifiable Digital Certificate */}
      {activeTab === 'certificate' && (
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Certificate Explainer Banner */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-indigo-200">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">What is this certificate?</strong>
              This official document is submitted by the company to the Central Pollution Control Board (CPCB). It proves that the company financed the collection and verified recycling of its plastic packaging, satisfying Indian environmental laws.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="border-2 border-indigo-500/40 rounded-2xl p-6 bg-slate-950 space-y-6 relative overflow-hidden">
              {/* Background Watermark */}
              <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                <Building2 className="w-96 h-96 text-white" />
              </div>

              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                    GOVERNMENT OF INDIA • CPCB COMPLIANCE RECORD
                  </span>
                  <h2 className="text-lg font-black text-white mt-0.5">
                    DIGITAL RECYCLING & PLASTIC OFFSET CERTIFICATE
                  </h2>
                  <span className="text-xs text-slate-400 font-mono block mt-0.5">
                    Official Certificate ID: <strong className="text-indigo-300">{selectedCompany.lastCertificateId}</strong>
                  </span>
                </div>
                <div className="w-16 h-16 rounded-xl bg-indigo-900/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 self-end sm:self-auto">
                  <QrCode className="w-10 h-10" />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Registered Company (Producer):</span>
                  <strong className="text-white text-sm block mt-0.5">{selectedCompany.companyName}</strong>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Material Stream:</span>
                  <strong className="text-white text-sm block mt-0.5">{selectedCompany.category}</strong>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Authorized Recycling Partner:</span>
                  <strong className="text-indigo-300 text-xs block mt-0.5">{selectedCompany.authorizedRecycler}</strong>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-900/40">
                  <span className="text-emerald-400 block text-[11px] font-bold">Certified Recycled Tonnage:</span>
                  <strong className="text-emerald-400 font-mono text-base block mt-0.5">
                    {selectedCompany.recycledTons} Metric Tons (100% Landfill Diverted)
                  </strong>
                </div>
              </div>

              {/* Security Verification Code */}
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                <div className="text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Anti-Tamper Digital Security Code:</span>
                  </span>
                  <span className="text-emerald-400 font-bold">✓ VERIFIED & IMMUTABLE</span>
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-indigo-300 break-all font-mono">
                    0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 shrink-0 cursor-pointer"
                  >
                    {copiedHash ? "Copied!" : "Copy"}
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Guarantees this certificate was generated through real weighbridge scales and cannot be duplicated or faked.
                </span>
              </div>

              {/* Certificate Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs">
                    Audited by Swachhta Sangam Municipal Hub & State Pollution Control Board
                  </span>
                </div>
                <button
                  onClick={() => alert("Digital Certificate downloaded as PDF.")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shrink-0 self-stretch sm:self-auto justify-center cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Official PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: EPR Network & Stakeholders (How Everyone Works Together) */}
      {activeTab === 'network' && (
        <div className="space-y-6">
          {/* Core Value Proposition Cards (Plain Language) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Workers Paid Extra Bonus</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Brand money doesn't disappear into government fees. It goes directly to frontline sanitation workers as bonus cash per kg of clean waste collected.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Modern City Equipment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                EPR funding purchases hydraulic compactor trucks, solar-powered compactor street bins, and optical sorting machines for the municipality.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Real Landfill Reduction</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instead of piling into smelly open dumps, plastic is channeled directly to licensed factories that melt it into recycled pellets.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Zero Fake Claims</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digital weighbridges and photo checks ensure companies cannot fake their recycling. Every kilogram is weighed and accounted for.
              </p>
            </div>
          </div>

          {/* 5 Key Partners in the Ecosystem */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                The 5 Key Partners in Our Waste Loop
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                How every person and organization works together in harmony to keep our city clean:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-2xl">👷</span>
                <div className="font-bold text-xs text-white">1. Sanitation Heroes</div>
                <span className="text-[10px] text-emerald-400 font-semibold block">Ground Collection</span>
                <p className="text-[11px] text-slate-400">Collects and segregates waste on streets, earning direct bonus money per kg.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-2xl">🛡️</span>
                <div className="font-bold text-xs text-white">2. Ward Supervisors</div>
                <span className="text-[10px] text-indigo-400 font-semibold block">Quality & Safety Audit</span>
                <p className="text-[11px] text-slate-400">Verifies photo evidence, checks weighbridge receipts, and ensures clean batches.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-2xl">🚚</span>
                <div className="font-bold text-xs text-white">3. Transport Drivers</div>
                <span className="text-[10px] text-cyan-400 font-semibold block">Fast Logistics</span>
                <p className="text-[11px] text-slate-400">Drives GPS-tracked garbage trucks from local ward hubs to authorized factories.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-2xl">🏭</span>
                <div className="font-bold text-xs text-white">4. Recycling Factories</div>
                <span className="text-[10px] text-purple-400 font-semibold block">Manufacturing</span>
                <p className="text-[11px] text-slate-400">Melts plastic into pellets and paper into pulp, keeping material out of landfills.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-2xl">🏢</span>
                <div className="font-bold text-xs text-white">5. Consumer Brands</div>
                <span className="text-[10px] text-amber-400 font-semibold block">Funding & Compliance</span>
                <p className="text-[11px] text-slate-400">Pays for the collection and receives legal proof to show government regulators.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
