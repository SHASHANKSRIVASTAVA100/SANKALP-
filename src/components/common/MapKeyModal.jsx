import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, ExternalLink, X, Check, RefreshCw, MapPin } from 'lucide-react';

export const MapKeyModal = ({ isOpen, onClose, onKeySaved, currentKey }) => {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [saved, setSaved] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    const cleanKey = apiKey.trim();
    if (cleanKey) {
      localStorage.setItem('swachhta_gmaps_api_key', cleanKey);
    } else {
      localStorage.removeItem('swachhta_gmaps_api_key');
    }
    setSaved(true);
    if (onKeySaved) onKeySaved(cleanKey);
    setTimeout(() => {
      setSaved(false);
      onClose();
      // Reload page to apply key cleanly to Google Maps script loader
      window.location.reload();
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem('swachhta_gmaps_api_key');
    setApiKey('');
    if (onKeySaved) onKeySaved('');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overscroll-contain overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Google Maps API Configuration
              </h3>
              <p className="text-xs text-slate-400">Enable Google Maps Satellite & Traffic Tiles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informational Banner */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive Multi-Tier Map Engine Active</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Swachhta Sangam automatically works with full interactive GIS pan/zoom, custom truck markers, route tracking, and proximity circles. Entering a Google Cloud API Key unlocks authentic Google Satellite imagery, live Bangalore traffic, and Street View!
          </p>
        </div>

        {/* Key Input Form */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google Maps JavaScript API Key:
            </label>
            <input
              type="text"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <a
              href="https://console.cloud.google.com/google/maps-apis/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Get key from Google Cloud Console</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-400 hover:text-rose-300 cursor-pointer"
              >
                Clear Key
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Save & Reload</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
