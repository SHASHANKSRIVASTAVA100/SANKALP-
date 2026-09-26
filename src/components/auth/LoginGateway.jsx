import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User, HardHat, ShieldAlert, Building2, Phone,
  KeyRound, Globe, Truck, Layers, Award, Lock,
  ArrowRight, Landmark, BookOpen
} from 'lucide-react';

export const LoginGateway = () => {
  const { login, language, setLanguage, t, setIsUserGuideOpen } = useApp();

  const [selectedRole, setSelectedRole] = useState('citizen');
  const [citizenPhone, setCitizenPhone] = useState('9845012345');
  const [citizenOtp, setCitizenOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);
  const [workerId, setWorkerId] = useState('WRK-01');
  const [workerPin, setWorkerPin] = useState('2026');
  const [officerId, setOfficerId] = useState('SUP-08');
  const [officerPassword, setOfficerPassword] = useState('sankalp2026');
  const [companyGstin, setCompanyGstin] = useState('CPCB/EPR/2024/PL-0941');
  const [companyAuthKey, setCompanyAuthKey] = useState('EPR-SEC-9921');
  const [muniOfficeId, setMuniOfficeId] = useState('BBMP/HQ/COMM-01');
  const [muniSecurityKey, setMuniSecurityKey] = useState('MUNI-SEC-2026-X');

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'kn', label: 'ಕ' },
    { code: 'ta', label: 'த' },
    { code: 'te', label: 'తె' }
  ];

  const roleProfiles = {
    citizen:      { id: 'CIT-9821', name: 'Aarav Sharma', role: 'citizen', phone: '+91 98450 12345', ward: 'Ward 12 - Indiranagar', points: 650, badge: 'Ward Guardian' },
    worker:       { id: 'WRK-01', name: 'Ramesh Kumar', role: 'worker', designation: 'Sanitation Worker', ward: 'Ward 12 - Indiranagar', team: 'Zone 12 Alpha', rating: 4.9 },
    supervisor:   { id: 'SUP-08', name: 'Ananya Rao', role: 'supervisor', designation: 'Ward Sanitary Officer', ward: 'Ward 12 - Indiranagar', zone: 'East Bengaluru Zone' },
    epr:          { id: 'EPR-CO-01', name: 'AquaPure Beverage Industries', role: 'epr', gstin: '29AAACH7409R1ZX', cpcbReg: 'CPCB/EPR/2024/PL-0941', category: 'FMCG / Rigid Plastics (PET)', authorizedRecycler: 'GreenRecycle Hub Ltd' },
    municipality: { id: 'MUNI-HQ-01', name: 'Dr. Rajeshwari Swamy, IAS', role: 'municipality', designation: 'Municipal Commissioner', ulbOfficeId: 'BBMP/HQ/COMM-01', jurisdiction: 'Greater Metropolitan ULB', contact: '+91 80 2222 1188' }
  };

  const roles = [
    { key: 'citizen',      label: 'Citizen',       sublabel: 'Resident Portal',     icon: User },
    { key: 'worker',       label: 'Worker',         sublabel: 'Field Operations',    icon: HardHat },
    { key: 'supervisor',   label: 'Supervisor',     sublabel: 'Ward Control',        icon: ShieldAlert },
    { key: 'epr',          label: 'Company',        sublabel: 'EPR Compliance',      icon: Building2 },
    { key: 'municipality', label: 'Municipality',   sublabel: 'ULB / HQ Portal',     icon: Landmark },
  ];

  const handleSubmit = (e) => { e.preventDefault(); login(roleProfiles[selectedRole]); };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full overflow-x-hidden">

      {/* Thin India tricolor accent — 3px only */}
      <div className="h-[3px] w-full flex">
        <div className="flex-1 bg-amber-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-emerald-600" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-4 sm:px-8 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 p-1 flex items-center justify-center shrink-0">
            <img src="/logo-emblem.png" alt="Swachhta Sangam" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-base text-white leading-none">Swachhta Sangam</h1>
            <p className="text-[11px] text-slate-400 mt-0.5">AICTE PS-26195 · Swachh Bharat Mission 2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* User Guide */}
          <button
            onClick={() => setIsUserGuideOpen && setIsUserGuideOpen(true)}
            className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">User Guide</span>
          </button>

          {/* Language selector */}
          <div className="flex items-center gap-0.5 bg-slate-800 border border-slate-700 rounded px-1.5 py-1">
            <Globe className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`text-[11px] px-1.5 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                  language === l.code ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 w-full">
        <div className="w-full max-w-4xl">

          {/* Page title — no marketing text */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Select Portal</h2>
            <p className="text-xs text-slate-400 mt-1">Choose your role and enter credentials to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            {/* Role selector — left column on desktop, top on mobile */}
            <div className="md:col-span-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
              {roles.map(({ key, label, sublabel, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRole(key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded border text-left transition-colors cursor-pointer shrink-0 w-auto md:w-full ${
                    selectedRole === key
                      ? 'bg-slate-800 border-emerald-600 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                    selectedRole === key ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-none">{label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{sublabel}</div>
                  </div>
                  {selectedRole === key && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Login form — right side */}
            <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded p-6">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Active role label */}
                <div className="pb-3 border-b border-slate-800">
                  <h3 className="font-semibold text-white text-sm">
                    {roles.find(r => r.key === selectedRole)?.label} Login
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {roles.find(r => r.key === selectedRole)?.sublabel}
                  </p>
                </div>

                {/* Citizen Form */}
                {selectedRole === 'citizen' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> Mobile Number
                      </label>
                      <div className="flex items-center bg-slate-950 border border-slate-700 rounded overflow-hidden focus-within:border-emerald-600">
                        <span className="px-3 py-2.5 bg-slate-800 text-xs font-medium text-slate-300 border-r border-slate-700">+91</span>
                        <input
                          type="tel" value={citizenPhone}
                          onChange={e => setCitizenPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                          required
                        />
                        <button
                          type="button" onClick={() => setOtpSent(true)}
                          className="px-3 py-1.5 mr-2 text-[11px] font-medium rounded bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors shrink-0"
                        >
                          {otpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-slate-400" /> OTP
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: 1234</span>
                      </label>
                      <input
                        type="text" value={citizenOtp}
                        onChange={e => setCitizenOtp(e.target.value)}
                        maxLength={4} placeholder="Enter 4-digit OTP"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white tracking-widest font-mono text-center focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Worker Form */}
                {selectedRole === 'worker' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <HardHat className="w-3.5 h-3.5 text-slate-400" /> Worker Badge ID
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: WRK-01</span>
                      </label>
                      <input
                        type="text" value={workerId}
                        onChange={e => setWorkerId(e.target.value)}
                        placeholder="e.g. WRK-01"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" /> Shift PIN
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: 2026</span>
                      </label>
                      <input
                        type="password" value={workerPin}
                        onChange={e => setWorkerPin(e.target.value)}
                        maxLength={4} placeholder="4-digit PIN"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white font-mono text-center focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Supervisor Form */}
                {selectedRole === 'supervisor' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" /> Officer ID
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: SUP-08</span>
                      </label>
                      <input
                        type="text" value={officerId}
                        onChange={e => setOfficerId(e.target.value)}
                        placeholder="e.g. SUP-08"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
                      </label>
                      <input
                        type="password" value={officerPassword}
                        onChange={e => setOfficerPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>
                  </>
                )}

                {/* EPR Form */}
                {selectedRole === 'epr' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" /> CPCB Registration / GSTIN
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: CPCB/EPR/2024/PL-0941</span>
                      </label>
                      <input
                        type="text" value={companyGstin}
                        onChange={e => setCompanyGstin(e.target.value)}
                        placeholder="CPCB/EPR/YYYY/XX-XXXX"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-slate-400" /> Digital Auth Key
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: EPR-SEC-9921</span>
                      </label>
                      <input
                        type="text" value={companyAuthKey}
                        onChange={e => setCompanyAuthKey(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Municipality Form */}
                {selectedRole === 'municipality' && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <Landmark className="w-3.5 h-3.5 text-slate-400" /> ULB Office ID
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: BBMP/HQ/COMM-01</span>
                      </label>
                      <input
                        type="text" value={muniOfficeId}
                        onChange={e => setMuniOfficeId(e.target.value)}
                        placeholder="ULB/ZONE/ROLE-XX"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-slate-400" /> Security Key
                        <span className="ml-auto text-[10px] text-slate-500 font-mono">Demo: MUNI-SEC-2026-X</span>
                      </label>
                      <input
                        type="password" value={muniSecurityKey}
                        onChange={e => setMuniSecurityKey(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-600 font-mono"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-[11px] text-slate-600">
        Swachhta Sangam · AICTE PS-26195 · Swachh Bharat Mission Urban 2.0 · Smart India Hackathon 2026
      </footer>
    </div>
  );
};
