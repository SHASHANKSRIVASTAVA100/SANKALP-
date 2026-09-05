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
        <SectionErrorBoundary>
          {userRole === 'citizen' && <CitizenDashboard />}
          {userRole === 'worker' && <WorkerDashboard />}
          {userRole === 'supervisor' && <SupervisorDashboard />}
          {userRole === 'epr' && <EPRPortal />}
          {userRole === 'municipality' && <MunicipalityDashboard />}
        </SectionErrorBoundary>
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
          All India Council for Technical Education (AICTE) • National Clean & Green Tech Governance Platform
        </p>
      </footer>
    </div>
  );
};

// Section Error Boundary prevents one dashboard view from taking down the entire page/header
class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Dashboard Section Error:", error, errorInfo);
  }
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/40 text-center space-y-4 shadow-xl max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-xl font-bold">
            ⚠️
          </div>
          <h3 className="text-base font-bold text-white">This view encountered a display issue</h3>
          <p className="text-xs text-slate-400">
            {this.state.error?.message || "Something went wrong while rendering this section."}
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
            >
              Try Loading Again
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('swachhta_current_user');
                window.location.reload();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Swachhta Sangam Root ErrorBoundary caught:", error, errorInfo);
  }
  handleResetApp = () => {
    try {
      localStorage.removeItem('swachhta_current_user');
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          regs.forEach(reg => reg.update());
        });
      }
    } catch (e) {}
    window.location.reload();
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl font-bold">
            ✨
          </div>
          <h1 className="text-xl font-bold text-white">Swachhta Sangam</h1>
          <p className="text-xs text-slate-400 max-w-md">
            Click below to refresh the application.
          </p>
          {this.state.error?.message && (
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-mono text-rose-400 max-w-md break-words">
              {this.state.error.message}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer"
            >
              Reload App
            </button>
            <button
              onClick={this.handleResetApp}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
