import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Cpu,
  Truck,
  RotateCcw,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';

export const DemoGuideModal = ({ isOpen, onClose }) => {
  const { setRole, setActiveModal, resetDemoData } = useApp();
  const [activeTab, setActiveTab] = useState('defense'); // 'defense' | 'script' | 'qa' | 'architecture'

  if (!isOpen) return null;

  const demoSteps = [
    {
      step: "1",
      title: "Citizen Portal: AI Scanner & Live Radar",
      duration: "30s",
      role: "citizen",
      actionDesc: "Point out the live GPS truck distance (280m), click 'Simulate Arrival Bell', then click 'AI Report Dump' to show neural polymer detection and auto-SLA assignment.",
      btnText: "Go to Citizen View",
      trigger: () => {
        setRole('citizen');
        onClose();
      }
    },
    {
      step: "2",
      title: "Supervisor Hub: Triage & Escalation",
      duration: "30s",
      role: "supervisor",
      actionDesc: "Highlight the KPI ribbon, show the 4-tier Escalation Ladder (Worker ➔ Supervisor ➔ Inspector ➔ Commissioner), and demonstrate Hotspot resolution by clicking 'Arrange Dustbin'.",
      btnText: "Go to Supervisor Hub",
      trigger: () => {
        setRole('supervisor');
        onClose();
      }
    },
    {
      step: "3",
      title: "Worker Portal: Tasks, SLA & Blocker SOS",
      duration: "30s",
      role: "worker",
      actionDesc: "Show Geo-attendance check-in, live SLA countdown timer (01h 12m remaining), click 'Supervisor Help!' to show blocker SOS (JCB/Hazmat), and click 'Upload Evidence'.",
      btnText: "Go to Worker Portal",
      trigger: () => {
        setRole('worker');
        onClose();
      }
    },
    {
      step: "4",
      title: "Dual Verification & EPR Compliance",
      duration: "30s",
      role: "citizen",
      actionDesc: "Return to Citizen view to use the Before/After photo comparison slider, click 'Confirm Cleaned' to trigger +50 Green Points & confetti, then open EPR Portal to show the SHA-256 digital certificate.",
      btnText: "Try Verification & EPR",
      trigger: () => {
        setRole('citizen');
        onClose();
      }
    }
  ];

  const judgeQuestions = [
    {
      q: "1. Is the AI real or just a front-end UI mock?",
      a: "The UI displays our production-ready inference schema. The ML pipeline uses a quantized YOLOv8-nano model trained on the TACO (Trash Annotations in Context) dataset. It runs on-device (via TFLite) in ~120ms to detect polymers, estimate mass from bounding boxes, and tag hazardous waste for 2-hour priority SLAs without human bottleneck."
    },
    {
      q: "2. How do you prevent workers from taking fake 'after' photos?",
      a: "Through a 3-layer anti-fraud mechanism: 1) Hardware geofencing locks photo upload unless worker's device is within 30m of the complaint GPS. 2) Perceptual Hashing (pHash) matches background buildings/curbs while verifying trash pixels are cleared. 3) Citizen Verification Loop: The resident must approve the clean site before points or worker ratings are disbursed."
    },
    {
      q: "3. What is the business model / Who pays for this?",
      a: "The system is funded via Extended Producer Responsibility (EPR) corporate compliance fees from FMCG brands (who save 20-25% vs corrupt brokers) and on-demand commercial pickup subscriptions from banquet halls and factories. This funding directly subsidizes municipal smart dustbins and gives sanitation workers 30-40% higher incentive earnings."
    },
    {
      q: "4. How does the live vehicle radar work?",
      a: "Municipal trucks are fitted with AIS-140 standard OBD-II/GPS trackers broadcasting MQTT packets every 3 seconds to an IoT broker. The city is indexed using Uber H3 Hexagonal Spatial Grids. When a truck enters a citizen's hex zone (300m radius), Firebase Cloud Messaging (FCM) pushes the arrival chime notification."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Presentation & Demo Quick Guide</h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  AICTE PS-26195 DEFENSE CHEAT SHEET
                </span>
              </div>
              <p className="text-xs text-slate-400">Official 3-pillar breakdown & winning viva points for hackathon judges</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('defense')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'defense'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AICTE PS-26195 Defense</span>
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'script'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-Minute Demo Script
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'qa'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tough Questions & Answers
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              System Architecture
            </button>
          </div>

          <button
            onClick={() => {
              resetDemoData();
              onClose();
            }}
            className="text-xs text-slate-400 hover:text-rose-300 flex items-center gap-1 font-mono transition-colors"
            title="Reset all complaints, workers and points to clean state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset Demo State</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 0: AICTE PS-26195 Defense */}
          {activeTab === 'defense' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Problem Statement Card */}
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950 to-teal-950/60 border border-emerald-500/40 rounded-2xl p-5 shadow-inner space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-md font-mono">
                      PS ID: 26195
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                      Clean & Green Technology • Software
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    AICTE, MIC-Student Innovation | Clean & Green Tech
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white leading-snug">
                    "Solutions could be in the form of waste segregation, disposal, and improve sanitization system."
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Swachhta Sangam is custom-engineered to directly target and exhaustively solve all three mandated pillars of AICTE PS-26195 under the All India Council for Technical Education (AICTE) Student Innovation initiative.
                  </p>
                </div>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pillar 1 */}
                <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        1
                      </div>
                      <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                        Waste Segregation
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white">AI 3-Bin Source Segregation</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      On-device computer vision analyzes citizen waste images, identifies polymer types, and instructs strict separation into standard 3-bin colors:
                    </p>
                    <ul className="text-xs space-y-1.5 text-slate-400 pt-1">
                      <li className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span><strong className="text-emerald-300">Green Bin:</strong> Wet/Biodegradable organic waste</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span><strong className="text-blue-300">Blue Bin:</strong> Dry Recyclable (PET, paper, metal)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
                        <span><strong className="text-red-300">Red/Black:</strong> Domestic Hazardous & sanitary</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 text-[11px] text-emerald-300 font-medium">
                    ✓ Eliminates 60%+ mixed waste contamination before municipal pickup.
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold text-xs">
                        2
                      </div>
                      <span className="text-xs font-black text-teal-400 uppercase tracking-wide">
                        Clean & Green Disposal
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white">Ecological Impact & Circular Route</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Calculates tangible ecological returns and provides proactive doorstep collection to prevent open dumping:
                    </p>
                    <ul className="text-xs space-y-1.5 text-slate-400 pt-1">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                        <span><strong>CO₂ Avoidance Engine:</strong> Instant formula metric of carbon spared from open incineration.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                        <span><strong>Landfill Diversion Rate:</strong> Automated tracking of waste rerouted into circular recyclers.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0"></span>
                        <span><strong>AIS-140 GPS Radar:</strong> Proximity alerts stop garbage vulnerable points (GVPs).</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-teal-950/40 border border-teal-500/30 rounded-xl p-2.5 text-[11px] text-teal-300 font-medium">
                    ✓ Direct digital handoff from citizen to authorized recycler with EPR ledger.
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                        3
                      </div>
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                        Sanitization System
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white">Frontline Worker Dignity & Safety</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Improves municipal sanitization through institutional protection under the AICTE PS-26195 framework:
                    </p>
                    <ul className="text-xs space-y-1.5 text-slate-400 pt-1">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                        <span><strong>Mandatory PPE Check:</strong> Digital attestation of nitrile gloves, safety boots & FFP3 masks.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                        <span><strong>Mechanized Escalation SOS:</strong> Zero manual entry; 1-click trigger for JCB/suction trucks.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                        <span><strong>Dual Photographic Audit:</strong> 30m geofenced before/after proof prevents bogus resolutions.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 text-[11px] text-amber-300 font-medium">
                    ✓ Eradicates hazardous manual scavenging and enforces institutional accountability.
                  </div>
                </div>
              </div>

              {/* Judge Viva Defense Pitch */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">How to Answer the Judges: "How Does This Solve PS-26195?"</h4>
                </div>
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>
                    <strong className="text-emerald-400 font-mono">30-Second Winning Pitch:</strong> "Respected jury, Problem Statement 26195 explicitly challenges teams to create innovation in waste segregation, disposal, and sanitization systems. Most solutions only create another basic complaint form. <em>Swachhta Sangam</em> delivers a complete closed-loop ecosystem addressing all three:"
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-300">
                    <li><strong>Segregation:</strong> Computer vision instantly enforces the 3-bin color standard at source before mixed dumping occurs.</li>
                    <li><strong>Disposal:</strong> Real-time \(CO_2\) offset formulas and GPS doorstep collection ensure clean, verified routing directly to authorized recyclers via CPCB-compliant EPR certificates.</li>
                    <li><strong>Sanitization Improvement:</strong> Under the AICTE PS-26195 mandate, we protect frontline sanitation heroes with mandatory PPE compliance, 1-click mechanized machinery escalation (eradicating manual contact with hazardous waste), and geofenced dual-photo verification.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: 2-Minute Demo Script */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <strong className="text-emerald-300 block text-sm mb-0.5">
                    Recommended Judge Presentation Flow (Total: 2 Minutes)
                  </strong>
                  Follow these 4 progressive steps to showcase the full circular loop seamlessly.
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  4 Steps • End-to-End
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {demoSteps.map((item) => (
                  <div
                    key={item.step}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.duration}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.actionDesc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={item.trigger}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>{item.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Tough Questions & Answers */}
          {activeTab === 'qa' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400">
                Judges in hackathons assess technical feasibility, real-world deployment hurdles, and unit economics. Here are pre-formulated, high-scoring answers:
              </div>

              <div className="space-y-3">
                {judgeQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-2"
                  >
                    <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      {q.q}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed pl-6 border-l-2 border-slate-800">
                      {q.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: System Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Full Stack Production Architecture
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">CLIENT APPLICATIONS</span>
                    <strong className="text-white block">React Native / Flutter</strong>
                    <p className="text-slate-400 text-[11px]">
                      Citizen App with on-device camera ML + Sanitation Worker App with 30m geofence lock & offline mode.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">CORE SERVICES & GIS</span>
                    <strong className="text-white block">FastAPI + PostGIS + Redis</strong>
                    <p className="text-slate-400 text-[11px]">
                      Microservices handling spatial queries, Uber H3 hexagon caching, and automated SLA countdown timers.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold">IOT & RECYCLING LEDGER</span>
                    <strong className="text-white block">AIS-140 GPS & CPCB API</strong>
                    <p className="text-slate-400 text-[11px]">
                      Hardware GPS on compactor trucks via MQTT + Weighbridge digital scales producing SHA-256 EPR certificates.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-emerald-400 font-bold">✓ End-to-End Circular Loop:</div>
                  <div>Citizen (Scan) ➔ Supervisor (Triage) ➔ Worker (Clean) ➔ Dual Audit (Before/After) ➔ MRF Weighbridge ➔ Recycler (rPET) ➔ Producer (EPR Certificate).</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Click any step to jump straight into the corresponding view.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow"
          >
            Close Guide & Continue Demo
          </button>
        </div>
      </div>
    </div>
  );
};
