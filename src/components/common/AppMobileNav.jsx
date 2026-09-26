import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Camera,
  Radio,
  Award,
  Truck,
  HardHat,
  ShieldAlert,
  Building2,
  Landmark,
  Layers,
  Flame,
  FileText,
  Recycle,
  Factory,
  LogOut
} from 'lucide-react';

export const AppMobileNav = () => {
  const { currentUser, setActiveModal, playChime, logout } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  const handleAction = (action) => {
    playChime('chime');
    if (action === 'report') {
      setActiveModal('report');
    } else if (action === 'radar') {
      const radarEl = document.getElementById('vehicle-radar');
      if (radarEl) {
        radarEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    } else if (action === 'leaderboard') {
      setActiveModal('leaderboard');
    } else if (action === 'paid') {
      setActiveModal('paid');
    } else if (action === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 px-2 py-1.5 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around text-slate-400">
        {/* Citizen */}
        {role === 'citizen' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded hover:text-white transition-colors"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-slate-200">Home</span>
            </button>

            <button
              onClick={() => handleAction('radar')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded hover:text-white transition-colors"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-slate-200">Radar</span>
            </button>

            <button
              onClick={() => handleAction('report')}
              className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded bg-emerald-600 text-white font-medium cursor-pointer"
              title="Report Waste"
            >
              <Camera className="w-4 h-4" />
              <span className="text-[10px]">Report</span>
            </button>

            <button
              onClick={() => handleAction('leaderboard')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded hover:text-white transition-colors"
            >
              <Award className="w-4 h-4 text-slate-300" />
              <span className="text-[10px] text-slate-200">Rewards</span>
            </button>

            <button
              onClick={logout}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-400 hover:text-rose-400 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[10px]">Logout</span>
            </button>
          </>
        )}

        {/* Worker */}
        {role === 'worker' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-emerald-400 font-medium"
            >
              <HardHat className="w-4 h-4" />
              <span className="text-[10px]">Tasks</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span className="text-[10px]">Route</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span className="text-[10px]">Proof</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[10px]">Logout</span>
            </button>
          </>
        )}

        {/* Supervisor */}
        {role === 'supervisor' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-emerald-400 font-medium"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px]">Tickets</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span className="text-[10px]">Fleet</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Flame className="w-4 h-4" />
              <span className="text-[10px]">Hotspots</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[10px]">Logout</span>
            </button>
          </>
        )}

        {/* EPR */}
        {role === 'epr' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-emerald-400 font-medium"
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[10px]">Quota</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Recycle className="w-4 h-4" />
              <span className="text-[10px]">Recyclers</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="text-[10px]">Certs</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[10px]">Logout</span>
            </button>
          </>
        )}

        {/* Municipality */}
        {role === 'municipality' && (
          <>
            <button
              onClick={() => handleAction('top')}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-emerald-400 font-medium"
            >
              <Landmark className="w-4 h-4" />
              <span className="text-[10px]">Overview</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Factory className="w-4 h-4" />
              <span className="text-[10px]">Processors</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span className="text-[10px]">Fleet</span>
            </button>
            <button
              onClick={logout}
              className="flex flex-col items-center gap-0.5 py-1 px-2 rounded text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[10px]">Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
