import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginGateway } from './components/auth/LoginGateway';
import { Header } from './components/common/Header';
import { CitizenDashboard } from './components/citizen/CitizenDashboard';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { SupervisorDashboard } from './components/supervisor/SupervisorDashboard';
import { EPRPortal } from './components/epr/EPRPortal';
import { MunicipalityDashboard } from './components/municipality/MunicipalityDashboard';
import { AppMobileNav } from './components/common/AppMobileNav';
import { InstallAppModal } from './components/common/InstallAppModal';
import { Smartphone } from 'lucide-react';

const AppContent = () => {
  const { currentUser, viewMode, isInstallModalOpen, setIsInstallModalOpen } = useApp();

  // If user is not authenticated, strictly show the Login Gateway
  if (!currentUser) {
    return (
      <>
        <LoginGateway />
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
        />
      </>
    );
  }

  // Strict Role-Based Access Control (RBAC):
  // Each role ONLY accesses their own dedicated dashboard. No role-switching without logging out.
  const userRole = currentUser.role;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative">
      {/* Top Header customized to current authenticated user */}
      <Header />

      {/* Dual Engine: Native Mobile on Phones, Simulator Frame on Desktop */}
      {viewMode === 'app' ? (
        <>
          {/* Real Mobile Screens (Phones & Tablets): True Native Edge-to-Edge Experience */}
          <main className="md:hidden flex-1 pb-28 px-3">
            {userRole === 'citizen' && <CitizenDashboard />}
            {userRole === 'worker' && <WorkerDashboard />}
            {userRole === 'supervisor' && <SupervisorDashboard />}
            {userRole === 'epr' && <EPRPortal />}
            {userRole === 'municipality' && <MunicipalityDashboard />}
          </main>

          {/* Desktop Displays Only: Interactive Smartphone Simulator Frame */}
          <div className="hidden md:flex flex-1 py-6 px-4 flex-col items-center justify-center bg-slate-950">
            <div className="mb-3 flex items-center gap-2 text-xs text-amber-400 font-semibold bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile App View Active • Native Smartphone Simulator</span>
            </div>

            {/* Smartphone Chassis Mockup Frame */}
            <div className="w-full max-w-[430px] bg-slate-900 border-[8px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden relative min-h-[780px] max-h-[880px] flex flex-col ring-1 ring-slate-700">
              {/* Dynamic Island & Phone Status Bar */}
              <div className="bg-slate-950 py-2.5 px-6 flex items-center justify-between border-b border-slate-800/80 shrink-0 z-30">
                <span className="text-[11px] font-bold text-white font-mono">9:41</span>
                <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-950 mr-2" />
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Scrollable Mobile App Screen */}
              <div className="flex-1 overflow-y-auto pb-20 p-2 sm:p-3 scrollbar-thin">
                {userRole === 'citizen' && <CitizenDashboard />}
                {userRole === 'worker' && <WorkerDashboard />}
                {userRole === 'supervisor' && <SupervisorDashboard />}
                {userRole === 'epr' && <EPRPortal />}
                {userRole === 'municipality' && <MunicipalityDashboard />}
              </div>

              {/* Simulated iPhone / Android Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-600 rounded-full z-40 pointer-events-none" />
            </div>
          </div>
        </>
      ) : (
        <main className="flex-1 pb-28 md:pb-12">
          {userRole === 'citizen' && <CitizenDashboard />}
          {userRole === 'worker' && <WorkerDashboard />}
          {userRole === 'supervisor' && <SupervisorDashboard />}
          {userRole === 'epr' && <EPRPortal />}
          {userRole === 'municipality' && <MunicipalityDashboard />}
        </main>
      )}

      {/* Ergonomic Mobile Bottom Navigation Bar (Visible on mobile viewports) */}
      <AppMobileNav />

      {/* Progressive Web App Install Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-xs text-slate-500 space-y-1 mb-12 md:mb-0 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src="/logo-emblem.png" alt="Swachhta Sangam" className="w-5 h-5 object-contain" />
          <p className="font-medium text-slate-400">
            Smart India Hackathon (SIH 2026) • Swachhta Sangam (स्वच्छता संगम)
          </p>
        </div>
        <p className="text-[11px] text-slate-600">
          Installable Progressive Web App (PWA) & Full-Scale Municipal Web Platform
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
