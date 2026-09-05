import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trash2,
  User,
  HardHat,
  ShieldAlert,
  Building2,
  Bell,
  MapPin,
  RotateCcw,
  Volume2,
  Truck,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Globe,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Landmark,
  Smartphone,
  Monitor,
  Download
} from 'lucide-react';
import { MapKeyModal } from './MapKeyModal';

export const Header = () => {
  const {
    currentUser,
    logout,
    language,
    setLanguage,
    t,
    wardFilter,
    setWardFilter,
    notifications,
    citizenPoints,
    playChime,
    resetDemoData,
    viewMode,
    setViewMode,
    setIsInstallModalOpen
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMapKeyModal, setShowMapKeyModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];
  const role = currentUser?.role || 'citizen';

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top Proximity Alert Banner (Shown for Citizen & Worker) */}
      {(role === 'citizen' || role === 'worker') && (
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-b border-emerald-500/20 px-3 py-1.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs w-full">
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 text-[11px] truncate">
              <strong className="text-emerald-400">{t('radarBanner')}:</strong> {t('truckNear')} <strong className="text-white">#KA-03-GH-1102</strong> <span className="text-emerald-300 font-bold">~3 mins</span>.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => playChime('alert')}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer"
              title="Simulate Doorstep Collection Bell"
            >
              <Volume2 className="w-3 h-3" />
              <span>{t('testBell')}</span>
            </button>
            <span className="text-slate-400 hidden lg:inline text-[11px]">MoSJE ID: <strong>SBM-IND-2026</strong></span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 w-full">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/90 border border-emerald-500/30 p-1 flex items-center justify-center shadow-lg shadow-emerald-900/30 shrink-0">
            <img src="/logo-emblem.png" alt="Swachhta Sangam Logo" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none whitespace-nowrap">
                Swachhta <span className="text-emerald-400">Sangam</span>
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 whitespace-nowrap">
                AICTE PS-26195
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">{t('tagline')}</p>
          </div>
        </div>

        {/* Center: Strict Role Indicator Pill (NO CROSS-PORTAL SWITCHING) */}
        <div className="hidden sm:flex items-center gap-2">
          {role === 'citizen' && (
            <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl shadow-inner text-xs">
              <User className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">{t('citizenView')}</span>
              <span className="text-slate-500">•</span>
              <span className="bg-emerald-900/90 text-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-md font-mono border border-emerald-700/50">
                🏆 {citizenPoints} pts
              </span>
            </div>
          )}

          {role === 'worker' && (
            <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 px-3.5 py-1.5 rounded-xl shadow-inner text-xs">
              <HardHat className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-300">{t('workerPortal')}</span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Shift Active
              </span>
            </div>
          )}

          {role === 'supervisor' && (
            <div className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-500/40 px-3.5 py-1.5 rounded-xl shadow-inner text-xs">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-cyan-300">{t('supervisorHub')}</span>
              <span className="text-slate-500">•</span>
              <span className="bg-cyan-900/80 text-cyan-200 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-cyan-700/50">
                Ward 12 Control Room
              </span>
            </div>
          )}

          {role === 'epr' && (
            <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/40 px-3.5 py-1.5 rounded-xl shadow-inner text-xs">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-indigo-300">{t('eprPortal')}</span>
              <span className="text-slate-500">•</span>
              <span className="bg-indigo-900/80 text-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-indigo-700/50">
                CPCB VERIFIED
              </span>
            </div>
          )}

          {role === 'municipality' && (
            <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/40 px-3.5 py-1.5 rounded-xl shadow-inner text-xs">
              <Landmark className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-purple-300">{t('municipalityPortal')}</span>
              <span className="text-slate-500">•</span>
              <span className="bg-purple-900/80 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-700/50">
                ULB COMMISSIONER HQ
              </span>
            </div>
          )}
        </div>

        {/* Right Tools (Language Switcher, Ward Selector, Bell, User Profile, Logout) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Multilingual Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-lg px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs text-slate-200 transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
              <span className="font-semibold">{currentLangObj.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      language === l.code
                        ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ward Selector (For Citizen, Supervisor, & Municipality - Desktop/Tablet) */}
          {(role === 'citizen' || role === 'supervisor' || role === 'municipality') && (
            <div className="relative hidden md:flex items-center bg-slate-800/80 border border-slate-700/70 rounded-lg px-2.5 py-1 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
              <select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer pr-2"
              >
                <option value="All Wards" className="bg-slate-900 text-slate-200">{t('allWards')}</option>
                <option value="Ward 12 - Indiranagar" className="bg-slate-900 text-slate-200">Ward 12 - Indiranagar</option>
                <option value="Ward 14 - Koramangala" className="bg-slate-900 text-slate-200">Ward 14 - Koramangala</option>
                <option value="Ward 18 - Whitefield" className="bg-slate-900 text-slate-200">Ward 18 - Whitefield</option>
              </select>
            </div>
          )}

          {/* 1-Click Install PWA App Button (Desktop & Tablet) */}
          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow"
            title="Install Swachhta Sangam App on Phone or PC"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Install App</span>
          </button>

          {/* Google Maps Quick Config Button (Desktop Only) */}
          <button
            onClick={() => setShowMapKeyModal(true)}
            className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-cyan-300 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow"
            title="Configure Google Maps API Key"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Maps</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all cursor-pointer"
              title={t('alerts')}
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-bold text-slate-200">Live Activity Feed</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{notifications.length} alerts</span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg border ${
                        n.type === 'alert'
                          ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                          : n.type === 'radar'
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Logged In User Badge & Logout */}
          {currentUser && (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-slate-800">
              <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 sm:px-2.5 sm:py-1 text-xs">
                <img
                  src={currentUser.avatar || currentUser.logo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-emerald-400/50"
                />
                <div className="text-left hidden md:block">
                  <span className="text-white font-bold block text-[11px] leading-tight max-w-[110px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono block leading-none uppercase">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              {/* Strict Logout Button (Icon on small mobile, Icon+Text on tablet/desktop) */}
              <button
                onClick={logout}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer shadow-sm"
                title="Log Out and return to Login Gateway"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('logoutBtn')}</span>
              </button>
            </div>
          )}

          {/* Reset Demo State Button (Desktop only) */}
          <button
            onClick={resetDemoData}
            className="hidden md:flex p-1.5 sm:p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-all text-xs cursor-pointer"
            title="Reset System State"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Global Google Maps API Key Modal */}
      <MapKeyModal
        isOpen={showMapKeyModal}
        onClose={() => setShowMapKeyModal(false)}
      />
    </header>
  );
};
