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
  Check
} from 'lucide-react';

export const EPRPortal = () => {
  const [selectedCompany, setSelectedCompany] = useState(EPR_COMPANIES[0]);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'certificate' | 'network'

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* EPR Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/40 p-6 md:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                EXTENDED PRODUCER RESPONSIBILITY (EPR) PLATFORM
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                CPCB COMPLIANT
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
              Circular Economy & Digital Compliance Ledger
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Enabling brand producers to finance waste collection, verify recycling capacity across our municipal worker network, and receive tamper-proof digital certificates for regulatory compliance.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            Producer Compliance Dashboard
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'certificate'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            Cryptographic Digital Certificate
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'network'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            EPR Network & Stakeholders
          </button>
        </div>
      </div>

      {/* Tab 1: Corporate Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Company Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Select Registered Producer:</span>
              <div className="flex gap-2">
                {EPR_COMPANIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCompany(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedCompany.id === c.id
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c.companyName}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full">
              Status: {selectedCompany.status}
            </span>
          </div>

          {/* Compliance Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Target Annual Quota</span>
              <div className="text-2xl font-black text-white font-mono">
                {selectedCompany.targetTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <span className="text-[11px] text-indigo-300 block">{selectedCompany.category}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Collected via Workers</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {selectedCompany.collectedTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${selectedCompany.compliancePercent}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Recycled by Processors</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {selectedCompany.recycledTons} <span className="text-sm font-normal text-slate-400">Tons</span>
              </div>
              <span className="text-[11px] text-slate-400 block">
                {selectedCompany.compliancePercent}% Fulfillment
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Circulated Worker Value</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {selectedCompany.currentCreditValue}
              </div>
              <span className="text-[11px] text-slate-400 block">Funds worker dignity & tools</span>
            </div>
          </div>

          {/* 5-Step Traceable Digital Flow */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                End-to-End Digital Custody Trail
              </h3>
              <p className="text-xs text-slate-400">
                How our platform verifies capacity, connects sanitation heroes, and generates compliant CPCB audits
              </p>
            </div>

            {/* 5-Step Visual Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {selectedCompany.digitalTrail.map((step) => (
                <div
                  key={step.step}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-indigo-500/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs">
                        {step.step}
                      </span>
                      <span className="text-slate-500 font-mono text-[10px]">{step.time}</span>
                    </div>
                    <div className="font-bold text-xs text-white">{step.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                  <div className="text-emerald-400 text-[10px] font-mono flex items-center gap-1 pt-2 border-t border-slate-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Audit Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cryptographic Verifiable Digital Certificate */}
      {activeTab === 'certificate' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl space-y-6">
          <div className="border-2 border-indigo-500/40 rounded-2xl p-6 bg-slate-950 space-y-6 relative overflow-hidden">
            {/* Background Watermark */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <Building2 className="w-96 h-96 text-white" />
            </div>

            {/* Certificate Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                  GOVERNMENT OF INDIA • CPCB COMPLIANCE
                </span>
                <h2 className="text-lg font-black text-white mt-0.5">
                  DIGITAL EXTENDED PRODUCER RESPONSIBILITY CERTIFICATE
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  Certificate ID: {selectedCompany.lastCertificateId}
                </span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-indigo-900/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <QrCode className="w-10 h-10" />
              </div>
            </div>

            {/* Certificate Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Registered Producer:</span>
                <strong className="text-white text-sm">{selectedCompany.companyName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Waste Category:</span>
                <strong className="text-white text-sm">{selectedCompany.category}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Authorized Recycler Partner:</span>
                <strong className="text-indigo-300">{selectedCompany.authorizedRecycler}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Certified Recycled Tonnage:</span>
                <strong className="text-emerald-400 font-mono text-base">
                  {selectedCompany.recycledTons} Metric Tons
                </strong>
              </div>
            </div>

            {/* Cryptographic Hash */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 flex items-center justify-between">
                <span>Tamper-Proof SHA-256 Ledger Hash:</span>
                <span className="text-emerald-400 font-bold">✓ VERIFIED</span>
              </div>
              <div className="text-[11px] text-indigo-300 break-all">
                0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified by Swachhta Sangam Municipal Node & State Pollution Control Board</span>
              </div>
              <button
                onClick={() => alert("Digital Certificate downloaded as PDF.")}
                className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: EPR Network & Stakeholders */}
      {activeTab === 'network' && (
        <div className="space-y-6">
          {/* Core Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Workers Paid Properly</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Corporate EPR compliance budgets directly subsidize fair wage top-ups, paid gig incentives, and healthcare for frontline sanitation heroes.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Modern Equipment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                EPR funding finances compactor trucks, smart dustbins with ultrasonic fill sensors, solar CCTV poles, and AI computer vision cameras.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Massive Waste Recycled</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforms uncontrolled street dumps into segregated material streams channeled to licensed processors instead of burning in open landfills.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Company Efficiency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Brands reduce compliance overhead by 25% by cutting corrupt middleman brokers and eliminating counterfeit recycling claims.
              </p>
            </div>
          </div>

          {/* Members in Our Network */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              5 Key Network Stakeholders (EPR Ecosystem)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-2xl">👷</span>
                <div className="font-bold text-xs text-white">1. Sanitation Workers</div>
                <p className="text-[11px] text-slate-400">Collects, segregates, and earns extra incentive pay per verified kg.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-2xl">🛡️</span>
                <div className="font-bold text-xs text-white">2. Supervisors</div>
                <p className="text-[11px] text-slate-400">Verifies photo evidence, manages MRF weighbridge, and guarantees purity.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-2xl">🚚</span>
                <div className="font-bold text-xs text-white">3. Collection Agencies</div>
                <p className="text-[11px] text-slate-400">Transports bulk segregated batches from ward hubs to recycling plants.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-2xl">🏭</span>
                <div className="font-bold text-xs text-white">4. Authorized Recyclers</div>
                <p className="text-[11px] text-slate-400">Processes waste into recycled pellets, granules, and certifies zero landfill.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-2xl">🏢</span>
                <div className="font-bold text-xs text-white">5. Producers / Brands</div>
                <p className="text-[11px] text-slate-400">Finances the loop, accesses real-time dashboards, and receives legal certificates.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
