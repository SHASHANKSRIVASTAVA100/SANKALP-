import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  BellRing,
  Camera,
  Layers,
  ArrowRight,
  ShieldCheck,
  Monitor
} from 'lucide-react';

export const InstallAppModal = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState('android'); // 'android' | 'ios' | 'desktop'

  useEffect(() => {
    // Detect platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Lock body scroll on open to prevent background screen from rolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If deferredPrompt is unavailable, show platform guide
      alert(
        platform === 'ios'
          ? "On iOS Safari: Tap the Share button below, then select 'Add to Home Screen'."
          : "On Chrome/Edge: Look for the Install icon (⊕) on the right side of your address bar."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overscroll-contain overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-4 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100 my-auto max-h-[92vh] overflow-y-auto">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-emerald-500/40 p-1.5 flex items-center justify-center shadow-lg shadow-emerald-600/20 shrink-0">
            <img src="/logo-emblem.png" alt="Swachhta Sangam App Logo" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                Official PWA App
              </span>
              <span className="text-[11px] text-slate-400 font-mono">AICTE PS-26195</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              Install Swachhta Sangam App
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          Install the official municipal Progressive Web App directly to your Android, iOS, or PC home screen. Get instant access without downloading from app stores!
        </p>

        {/* App Features Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Offline Capable</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Loads instantly even on 2G</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Truck Proximity Sirens</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Sound alerts 300m away</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">AI Camera Snap</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Instant waste classification</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Safe & Lightweight</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">&lt; 1MB storage footprint</span>
            </div>
          </div>
        </div>

        {/* Platform Specific Step-by-Step Instructions */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {platform === 'ios'
                ? 'Apple iOS (Safari) Instructions'
                : platform === 'android'
                ? 'Android (Google Chrome) Instructions'
                : 'Desktop (Chrome / Edge) Instructions'}
            </span>
            <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">
              Auto-Detected
            </span>
          </div>

          {platform === 'ios' ? (
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
              <li>Tap the <Share2 className="w-3.5 h-3.5 inline text-emerald-400 mx-1" /> <strong>Share</strong> button at the bottom of Safari.</li>
              <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>"Add"</strong> in the top right corner. The app icon will appear on your iPhone!</li>
            </ol>
          ) : platform === 'android' ? (
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
              <li>Click the <strong>"Install App Now"</strong> button below.</li>
              <li>Confirm the Chrome prompt to add <strong>Swachhta Sangam</strong>.</li>
              <li>Launch from your app drawer with fullscreen native experience!</li>
            </ol>
          ) : (
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
              <li>Click <strong>"Install App Now"</strong> below or click the <strong>Install</strong> button in your browser address bar.</li>
              <li>A standalone window with desktop shortcuts will open immediately!</li>
            </ol>
          )}
        </div>

        {/* Action Button */}
        {isInstalled ? (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>App Already Installed & Ready on Your Device!</span>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Install App Now (1-Click PWA)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
