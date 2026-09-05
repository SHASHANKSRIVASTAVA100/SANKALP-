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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative w-full max-w-full overflow-x-hidden">
      {/* Top Header customized to current authenticated user */}
      <Header />

      {/* Main Content: Edge-to-Edge Responsive Layout on Mobile and Desktop */}
      <main className="flex-1 pb-28 md:pb-12 px-2.5 sm:px-6 max-w-7xl mx-auto w-full max-w-full overflow-x-hidden">
        {userRole === 'citizen' && <CitizenDashboard />}
        {userRole === 'worker' && <WorkerDashboard />}
        {userRole === 'supervisor' && <SupervisorDashboard />}
        {userRole === 'epr' && <EPRPortal />}
        {userRole === 'municipality' && <MunicipalityDashboard />}
      </main>

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
            Swachhta Sangam (स्वच्छता संगम) • AICTE PS-26195 Clean & Green Technology
          </p>
        </div>
        <p className="text-[11px] text-slate-600">
          Ministry of Social Justice and Empowerment (MoSJE) • National Sanitation Governance Platform
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
