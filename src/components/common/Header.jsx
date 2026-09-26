import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  HardHat,
  ShieldAlert,
  Building2,
  Bell,
  MapPin,
  RotateCcw,
  LogOut,
  Globe,
  ChevronDown,
  Landmark,
  Download,
  BookOpen,
  CheckCircle2
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
    resetDemoData,
    setIsInstallModalOpen,
    setIsUserGuideOpen
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

  const roleLabels = {
    citizen: { name: 'Citizen Portal', icon: User },
    worker: { name: 'Worker Operations', icon: HardHat },
    supervisor: { name: 'Ward Control', icon: ShieldAlert },
    epr: { name: 'EPR Compliance', icon: Building2 },
    municipality: { name: 'ULB Municipal HQ', icon: Landmark }
  };

  const activeRoleInfo = roleLabels[role] || roleLabels.citizen;
  const RoleIcon = activeRoleInfo.icon;

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-slate-100">
      {/* Top Status Notification Banner */}
      {(role === 'citizen' || role === 'worker') && (
        <div className="bg-slate-850 border-b border-slate-800 px-3 py-1 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate text-[11px]">
              Collection Route: <strong className="text-white">#KA-03-GH-1102</strong> approaching Indiranagar sector.
            </span>
          </div>
          <span className="text-slate-500 text-[11px] font-mono hidden sm:inline">
            PS-26195 · Clean & Green Tech
          </span>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 w-full">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
            <img src="/logo-emblem.png" alt="Swachhta Sangam Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white tracking-tight leading-none">
                Swachhta <span className="text-emerald-500">Sangam</span>
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-medium px-1.5 py-0.5 rounded border border-slate-700">
                SBM 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">National Waste Management Platform</p>
          </div>
        </div>

        {/* Center: Clean Role Indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded text-xs">
          <RoleIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-200">{activeRoleInfo.name}</span>
          {role === 'citizen' && (
            <>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-emerald-400 font-semibold">{citizenPoints} pts</span>
            </>
          )}
          {role === 'worker' && (
            <>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-emerald-400">Shift Active</span>
            </>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Guide Button */}
          <button
            onClick={() => setIsUserGuideOpen(true)}
            className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
            title="Open User Guide"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline font-medium">User Guide</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-200 transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">{currentLangObj.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-32 bg-slate-900 border border-slate-700 rounded shadow-xl p-1 z-50 text-xs">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between cursor-pointer ${
                      language === l.code
                        ? 'bg-slate-700 text-white font-semibold'
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

          {/* Ward Selector */}
          {(role === 'citizen' || role === 'supervisor' || role === 'municipality') && (
            <div className="relative hidden lg:flex items-center bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
              <select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="All Wards" className="bg-slate-900 text-slate-200">All Wards</option>
                <option value="Ward 12 - Indiranagar" className="bg-slate-900 text-slate-200">Ward 12 - Indiranagar</option>
                <option value="Ward 14 - Koramangala" className="bg-slate-900 text-slate-200">Ward 14 - Koramangala</option>
                <option value="Ward 18 - Whitefield" className="bg-slate-900 text-slate-200">Ward 18 - Whitefield</option>
              </select>
            </div>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
              title={t('alerts')}
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-semibold text-slate-200">Notifications</span>
                  <span className="text-[10px] text-slate-400 font-mono">{notifications.length} alerts</span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1.5">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      <div className="flex items-center justify-between font-medium">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Info (Initials badge, no Unsplash stock photo) */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="text-left hidden md:block">
                  <span className="text-white font-medium block text-[11px] leading-tight max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemoData}
            className="hidden md:flex p-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Reset System State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <MapKeyModal
        isOpen={showMapKeyModal}
        onClose={() => setShowMapKeyModal(false)}
      />
    </header>
  );
};
