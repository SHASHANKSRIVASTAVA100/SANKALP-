import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trash2,
  User,
  HardHat,
  ShieldAlert,
  Building2,
  Phone,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Globe,
  Truck,
  Layers,
  Award,
  Lock,
  ChevronRight,
  Info,
  Landmark,
  Download
} from 'lucide-react';

export const LoginGateway = () => {
  const { login, language, setLanguage, t, setIsInstallModalOpen } = useApp();

  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'worker' | 'supervisor' | 'epr' | 'municipality'

  // Citizen Form State
  const [citizenPhone, setCitizenPhone] = useState('9845012345');
  const [citizenOtp, setCitizenOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);

  // Worker Form State
  const [workerId, setWorkerId] = useState('WRK-01');
  const [workerPin, setWorkerPin] = useState('2026');

  // Supervisor Form State
  const [officerId, setOfficerId] = useState('SUP-08');
  const [officerPassword, setOfficerPassword] = useState('••••••••');

  // EPR Company Form State
  const [companyGstin, setCompanyGstin] = useState('CPCB/EPR/2024/PL-0941');
  const [companyAuthKey, setCompanyAuthKey] = useState('EPR-SEC-9921');

  // Municipality Form State
  const [muniOfficeId, setMuniOfficeId] = useState('BBMP/HQ/COMM-01');
  const [muniSecurityKey, setMuniSecurityKey] = useState('MUNI-SEC-2026-X');

  // Language options
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' }
  ];

  // Pre-configured profiles for 1-click test/login
  const roleProfiles = {
    citizen: {
      id: "CIT-9821",
      name: "Aarav Sharma",
      role: "citizen",
      phone: "+91 98450 12345",
      ward: "Ward 12 - Indiranagar",
      points: 650,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      badge: "Ward Guardian"
    },
    worker: {
      id: "WRK-01",
      name: "Ramesh Kumar",
      role: "worker",
      designation: "Senior Sanitation Hero",
      ward: "Ward 12 - Indiranagar",
      team: "Zone 12 Alpha Crew",
      rating: 4.9,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    },
    supervisor: {
      id: "SUP-08",
      name: "Inspector Ananya Rao",
      role: "supervisor",
      designation: "Ward Sanitary Officer",
      ward: "Ward 12 - Indiranagar",
      zone: "East Bengaluru Zone",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    epr: {
      id: "EPR-CO-01",
      name: "AquaPure Beverage Industries",
      role: "epr",
      gstin: "29AAACH7409R1ZX",
      cpcbReg: "CPCB/EPR/2024/PL-0941",
      category: "FMCG / Rigid Plastics (PET)",
      authorizedRecycler: "GreenRecycle Hub Ltd",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80"
    },
    municipality: {
      id: "MUNI-HQ-01",
      name: "Dr. Rajeshwari Swamy, IAS",
      role: "municipality",
      designation: "Municipal Commissioner & Director of Urban Solid Waste Management",
      ulbOfficeId: "BBMP/HQ/COMM-01",
      jurisdiction: "Greater Metropolitan Urban Local Body (ULB)",
      contact: "+91 80 2222 1188",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    }
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    login(roleProfiles[selectedRole]);
  };

  const handleQuickLogin = (roleKey) => {
    login(roleProfiles[roleKey]);
  };

  const selectAndScroll = (roleKey) => {
    setSelectedRole(roleKey);
    setTimeout(() => {
      document.getElementById('login-box')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Tricolor National Mission Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500 shadow-sm" />

      {/* Top Header with Brand and Multilingual Selector */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-800/90 border border-emerald-500/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-white/10 shrink-0">
            <img src="/logo-emblem.png" alt="Swachhta Sangam" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-xl text-white tracking-tight leading-none">
                Swachhta <span className="text-emerald-400">Sangam</span>
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t('tagline')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Install App Quick Button */}
          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow active:scale-95"
            title="Download & Install App on Mobile or PC"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline sm:inline">Install App</span>
          </button>

          {/* Multilingual Selector */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 sm:px-3 py-1.5 shadow-inner">
          <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">{t('selectLanguage')}:</span>
          <div className="flex items-center gap-1">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`text-xs px-2 py-0.5 rounded-md font-medium transition-all ${
                  language === l.code
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-6xl mx-auto w-full relative z-10">
        {/* Gateway Heading */}
        <div className="text-center max-w-2xl mb-6 flex flex-col items-center">
          {/* Official Brand Logo Showcase */}
          <div className="mb-4 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-cyan-500/30 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-3 shadow-2xl flex items-center justify-center backdrop-blur-md">
              <img 
                src="/logo-emblem.png" 
                alt="Swachhta Sangam Official Emblem" 
                className="w-full h-full object-contain filter drop-shadow-lg transform transition-transform group-hover:scale-105 duration-300"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SIH 2026 Real-Life Waste Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t('loginGatewayTitle')}
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            {t('loginGatewaySubtitle')}
          </p>
        </div>

        {/* Quick 1-Tap Demo Switcher Pills (Ultra-convenient for mobile preview) */}
        <div className="w-full mb-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>⚡ 1-Tap Direct Portal Entry:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar pb-1 sm:pb-0 justify-start sm:justify-end">
            <button
              type="button"
              onClick={() => handleQuickLogin('citizen')}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-500/40 shrink-0 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Citizen</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('worker')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 text-xs font-bold border border-amber-500/40 shrink-0 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <HardHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Worker</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('supervisor')}
              className="px-2.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-xs font-bold border border-cyan-500/40 shrink-0 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>Supervisor</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('epr')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 text-xs font-bold border border-indigo-500/40 shrink-0 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>EPR</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('municipality')}
              className="px-2.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 text-xs font-bold border border-purple-500/40 shrink-0 transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <Landmark className="w-3.5 h-3.5 text-purple-400" />
              <span>ULB HQ</span>
            </button>
          </div>
        </div>

        {/* 5 Role Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full mb-8">
          {/* 1. Citizen */}
          <div
            onClick={() => selectAndScroll('citizen')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
              selectedRole === 'citizen'
                ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xl shadow-emerald-950/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedRole === 'citizen' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                {t('citizenTab')}
                {selectedRole === 'citizen' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {t('citizenRoleDesc')}
              </p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickLogin('citizen');
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[10px] font-bold border border-emerald-500/40 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" />
                <span>1-Tap Entry ⚡</span>
              </button>
            </div>
          </div>

          {/* 2. Worker */}
          <div
            onClick={() => selectAndScroll('worker')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
              selectedRole === 'worker'
                ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedRole === 'worker' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
              }`}>
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                {t('workerTab')}
                {selectedRole === 'worker' && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {t('workerRoleDesc')}
              </p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickLogin('worker');
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 text-[10px] font-bold border border-amber-500/40 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" />
                <span>1-Tap Entry ⚡</span>
              </button>
            </div>
          </div>

          {/* 3. Supervisor */}
          <div
            onClick={() => selectAndScroll('supervisor')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
              selectedRole === 'supervisor'
                ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-950/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedRole === 'supervisor' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                {t('supervisorTab')}
                {selectedRole === 'supervisor' && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {t('supervisorRoleDesc')}
              </p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickLogin('supervisor');
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[10px] font-bold border border-cyan-500/40 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" />
                <span>1-Tap Entry ⚡</span>
              </button>
            </div>
          </div>

          {/* 4. Company (EPR) */}
          <div
            onClick={() => selectAndScroll('epr')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between ${
              selectedRole === 'epr'
                ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-950/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedRole === 'epr' ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
              }`}>
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                {t('companyTab')}
                {selectedRole === 'epr' && <span className="w-2 h-2 rounded-full bg-indigo-400"></span>}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {t('companyRoleDesc')}
              </p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickLogin('epr');
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500 text-indigo-300 hover:text-white text-[10px] font-bold border border-indigo-500/40 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" />
                <span>1-Tap Entry ⚡</span>
              </button>
            </div>
          </div>

          {/* 5. Municipality Office (spans 2 cols on mobile for balanced layout) */}
          <div
            onClick={() => selectAndScroll('municipality')}
            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1 ${
              selectedRole === 'municipality'
                ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30 shadow-xl shadow-purple-950/50'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedRole === 'municipality' ? 'bg-purple-500 text-white font-bold' : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
              }`}>
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white flex items-center justify-between">
                {t('municipalityTab')}
                {selectedRole === 'municipality' && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {t('municipalityRoleDesc')}
              </p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickLogin('municipality');
                }}
                className="w-full py-1.5 px-2 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white text-[10px] font-bold border border-purple-500/40 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" />
                <span>1-Tap Entry ⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Role Dedicated Login Box */}
        <div id="login-box" className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative scroll-mt-20">
          <form onSubmit={handleRoleSubmit} className="space-y-5">
            {/* Citizen Form */}
            {selectedRole === 'citizen' && (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {t('citizenTab')} • Swachh Bharat Hub
                    </h3>
                    <p className="text-xs text-slate-400">Login via Aadhaar/Mobile linked SMS OTP</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    {t('mobileNumber')}
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden focus-within:border-emerald-500">
                    <span className="px-3 py-2.5 bg-slate-800/80 text-xs font-semibold text-slate-300 border-r border-slate-700">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      placeholder={t('mobilePlaceholder')}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="px-3 py-1.5 mr-2 text-[11px] font-bold rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-700/60 hover:bg-emerald-900 transition-colors shrink-0"
                    >
                      {otpSent ? 'Resend' : t('sendOtp')}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                      {t('enterOtp')}
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {t('otpSentHint')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={citizenOtp}
                    onChange={(e) => setCitizenOtp(e.target.value)}
                    maxLength={4}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white tracking-widest font-mono text-center focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3 text-xs text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Logged-in citizens can verify street cleanups, track vehicle arrival sirens in real-time, and redeem Green Points.
                  </span>
                </div>
              </>
            )}

            {/* Worker Form */}
            {selectedRole === 'worker' && (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {t('workerTab')} • Field Operations
                    </h3>
                    <p className="text-xs text-slate-400">Sanitary Hero & Route Crew Shift Access</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <HardHat className="w-3.5 h-3.5 text-amber-400" />
                    {t('workerBadgeId')}
                  </label>
                  <input
                    type="text"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    placeholder={t('workerIdPlaceholder')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      {t('workerShiftPin')}
                    </label>
                    <span className="text-[10px] text-amber-400 font-mono">
                      Demo PIN: 2026
                    </span>
                  </div>
                  <input
                    type="password"
                    value={workerPin}
                    onChange={(e) => setWorkerPin(e.target.value)}
                    placeholder={t('workerPinPlaceholder')}
                    maxLength={4}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white tracking-widest font-mono text-center focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3 text-xs text-amber-300 flex items-start gap-2">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Access assigned collection route, punch daily attendance, upload Before/After geostamped photos, and trigger Supervisor SOS.
                  </span>
                </div>
              </>
            )}

            {/* Supervisor Form */}
            {selectedRole === 'supervisor' && (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {t('supervisorTab')} • Control Room Hub
                    </h3>
                    <p className="text-xs text-slate-400">Municipal Sanitary Inspector & Zonal Dispatch</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    {t('officerId')}
                  </label>
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder={t('officerIdPlaceholder')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    {t('officerPassword')}
                  </label>
                  <input
                    type="password"
                    value={officerPassword}
                    onChange={(e) => setOfficerPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3 text-xs text-cyan-300 flex items-start gap-2">
                  <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Manage ward complaint escalation matrices, dispatch workers, conduct Before/After audit approvals, and track GPS fleet deviations.
                  </span>
                </div>
              </>
            )}

            {/* EPR Company Form */}
            {selectedRole === 'epr' && (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {t('companyTab')} • EPR Circular Portal
                    </h3>
                    <p className="text-xs text-slate-400">Producer Brand & Authorized Recycler Gateway</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    {t('companyGstin')}
                  </label>
                  <input
                    type="text"
                    value={companyGstin}
                    onChange={(e) => setCompanyGstin(e.target.value)}
                    placeholder={t('companyGstinPlaceholder')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                    {t('digitalAuthKey')}
                  </label>
                  <input
                    type="text"
                    value={companyAuthKey}
                    onChange={(e) => setCompanyAuthKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                </div>

                <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3 text-xs text-indigo-300 flex items-start gap-2">
                  <Award className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    Fulfill mandatory plastic/e-waste statutory obligations, trace recycler weighbridge custody, and generate CPCB tamper-proof certificates.
                  </span>
                </div>
              </>
            )}

            {/* Municipality Office Form */}
            {selectedRole === 'municipality' && (
              <>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {t('municipalityTab')} • Urban Local Body HQ
                    </h3>
                    <p className="text-xs text-slate-400">Municipal Commissioner, Processing Telemetry & Fleet Ledger</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Landmark className="w-3.5 h-3.5 text-purple-400" />
                    {t('muniOfficeId')}
                  </label>
                  <input
                    type="text"
                    value={muniOfficeId}
                    onChange={(e) => setMuniOfficeId(e.target.value)}
                    placeholder={t('muniOfficePlaceholder')}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                    {t('muniSecurityKey')}
                  </label>
                  <input
                    type="password"
                    value={muniSecurityKey}
                    onChange={(e) => setMuniSecurityKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                    required
                  />
                </div>

                <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-3 text-xs text-purple-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    Direct access to certified recycler registry, 8-class daily waste generation telemetry, circular diversion metrics, optical sorting machinery, and municipal vehicle records.
                  </span>
                </div>
              </>
            )}

            {/* Submit Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                  selectedRole === 'citizen'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : selectedRole === 'worker'
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : selectedRole === 'supervisor'
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                    : selectedRole === 'epr'
                    ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/20'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20'
                }`}
              >
                <span>{t('enterPortalBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Demo Login Button */}
              <button
                type="button"
                onClick={() => handleQuickLogin(selectedRole)}
                className="w-full py-2.5 rounded-xl font-semibold text-xs transition-all border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {t('oneClickDemoBtn')}: <strong>{roleProfiles[selectedRole].name}</strong>
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          Swachhta Sangam (स्वच्छता संगम) • Smart India Hackathon 2026
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Ministry of Housing and Urban Affairs & Smart Cities Mission Initiative
        </p>
      </footer>
    </div>
  );
};
