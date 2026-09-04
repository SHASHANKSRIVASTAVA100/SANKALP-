import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Camera,
  Radio,
  Award,
  CalendarCheck,
  Truck,
  HardHat,
  ShieldAlert,
  Building2,
  Landmark,
  Layers,
  Flame,
  FileText,
  Recycle,
  Factory
} from 'lucide-react';

export const AppMobileNav = () => {
  const { currentUser, setActiveModal, playChime } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  const handleAction = (action) => {
    playChime('chime');
    if (action === 'report') {
      setActiveModal('report');
    } else if (action === 'radar') {
      const radarEl = document.getElementById('vehicle-radar-section');
      if (radarEl) {
        radarEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } else if (action === 'leaderboard') {
      setActiveModal('leaderboard');
    } else if (action === 'paid') {
      setActiveModal('paid_services');
    } else if (action === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around text-slate-400">
        {/* Citizen Mobile Navigation */}
        {role === 'citizen' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:text-emerald-400 transition-colors active:scale-95"
            >
              <Home className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-200">Home</span>
            </button>

            <button
              onClick={() => handleAction('radar')}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:text-emerald-400 transition-colors active:scale-95"
            >
              <Radio className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-200">GPS Radar</span>
            </button>

            {/* Prominent Center AI Camera Action */}
            <button
              onClick={() => handleAction('report')}
              className="relative -top-4 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-xl shadow-emerald-600/40 border-2 border-slate-900 active:scale-90 transition-transform cursor-pointer"
              title="Report Garbage Dump with AI Detection"
            >
              <Camera className="w-6 h-6" />
            </button>

            <button
              onClick={() => handleAction('leaderboard')}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:text-emerald-400 transition-colors active:scale-95"
            >
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-200">Rewards</span>
            </button>

            <button
              onClick={() => handleAction('paid')}
              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:text-emerald-400 transition-colors active:scale-95"
            >
              <CalendarCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-200">Paid Pick</span>
            </button>
          </>
        )}

        {/* Worker Mobile Navigation */}
        {role === 'worker' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-amber-400 font-bold"
            >
              <HardHat className="w-5 h-5" />
              <span className="text-[10px]">Tasks</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-amber-400 transition-colors"
            >
              <Truck className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-bold text-slate-200">Route Nav</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-amber-400 transition-colors"
            >
              <Layers className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-bold text-slate-200">Proof</span>
            </button>
          </>
        )}

        {/* Supervisor Mobile Navigation */}
        {role === 'supervisor' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-cyan-400 font-bold"
            >
              <ShieldAlert className="w-5 h-5" />
              <span className="text-[10px]">Grievances</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-cyan-400 transition-colors"
            >
              <Truck className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-bold text-slate-200">Fleet GPS</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-cyan-400 transition-colors"
            >
              <Flame className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-bold text-slate-200">Hotspots</span>
            </button>
          </>
        )}

        {/* EPR Mobile Navigation */}
        {role === 'epr' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-indigo-400 font-bold"
            >
              <Building2 className="w-5 h-5" />
              <span className="text-[10px]">Quota</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-indigo-400 transition-colors"
            >
              <Recycle className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-200">Recyclers</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-indigo-400 transition-colors"
            >
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-200">Certificates</span>
            </button>
          </>
        )}

        {/* Municipality Mobile Navigation */}
        {role === 'municipality' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-purple-400 font-bold"
            >
              <Landmark className="w-5 h-5" />
              <span className="text-[10px]">Overview</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-purple-400 transition-colors"
            >
              <Factory className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] font-bold text-slate-200">Processors</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl hover:text-purple-400 transition-colors"
            >
              <Truck className="w-5 h-5 text-purple-400" />
              <span className="text-[10px] font-bold text-slate-200">Fleet</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
