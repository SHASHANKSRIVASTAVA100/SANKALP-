import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wheat,
  Sprout,
  Coins,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  User,
  Phone,
  MapPin,
  Layers,
  FileCheck,
  X,
  RefreshCw,
  AlertCircle,
  Info,
  ChevronRight,
  Receipt,
  QrCode,
  Download,
  Leaf,
  Factory,
  Scale,
  Calendar,
  Award
} from 'lucide-react';

export const FarmerRegistrationView = () => {
  const {
    farmerAgriLedger = [],
    logFarmerAgriIntake
  } = useApp();

  // Active Sub-Tab: 'register' | 'directory' | 'certificate'
  const [subTab, setSubTab] = useState('register');

  // Search & Filter for Directory
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');

  // Registration Form State
  const [farmerForm, setFarmerForm] = useState({
    farmerName: '',
    contactPhone: '',
    aadhaar: '',
    village: '',
    district: '',
    state: 'Punjab',
    landholdingAcres: '5.0',
    cropResidueType: 'Paddy Straw Stubble (Parali)',
    intakeWeightTons: '12.5',
    ratePerKg: 6.8,
    bankAccountNo: '',
    ifscCode: 'SBIN0001420',
    preferredPickupDate: '2026-03-15',
    farmgateLocationNotes: 'Near Cooperative Cold Storage, GT Road'
  });

  // Success Confirmation Modal
  const [registeredSuccessData, setRegisteredSuccessData] = useState(null);
  const [selectedCertificateFarmer, setSelectedCertificateFarmer] = useState(null);

  // High-Level Aggregate Metrics
  const metrics = useMemo(() => {
    const totalFarmers = farmerAgriLedger.length + 412;
    const totalTonsDiverted = farmerAgriLedger.reduce((sum, f) => sum + (parseFloat(f.intakeWeightTons) || 0), 0) + 1340;
    const totalFarmerSharePaid = farmerAgriLedger.reduce((sum, f) => sum + (f.farmerPayoutAmount || 0), 0) + 942000;
    const totalPm25AvoidedKg = (totalTonsDiverted * 9.2).toFixed(1);
    const totalCo2OffsetTons = (totalTonsDiverted * 1.42).toFixed(1);

    return {
      totalFarmers,
      totalTonsDiverted: totalTonsDiverted.toFixed(1),
      totalFarmerSharePaid,
      totalPm25AvoidedKg,
      totalCo2OffsetTons
    };
  }, [farmerAgriLedger]);

  // Filtered Directory
  const filteredFarmers = useMemo(() => {
    return farmerAgriLedger.filter((item) => {
      const matchesState = stateFilter === 'All' || item.state === stateFilter;
      const matchesCrop = cropFilter === 'All' || item.cropResidueType.toLowerCase().includes(cropFilter.toLowerCase());
      const matchesSearch =
        item.farmerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.village?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bankUtr?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesCrop && matchesSearch;
    });
  }, [farmerAgriLedger, stateFilter, cropFilter, searchQuery]);

  // Handle Form Submit
  const handleRegisterFarmer = (e) => {
    e.preventDefault();
    const tons = parseFloat(farmerForm.intakeWeightTons) || 10;
    const rate = parseFloat(farmerForm.ratePerKg) || 6.8;
    const grossRevenue = Math.round(tons * 1000 * rate);
    const farmerShare40 = Math.round(grossRevenue * 0.40);

    const result = logFarmerAgriIntake({
      farmerName: farmerForm.farmerName,
      farmerId: `FAR-${farmerForm.state.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      contactPhone: farmerForm.contactPhone,
      aadhaar: farmerForm.aadhaar,
      village: `${farmerForm.village}, ${farmerForm.district || 'District Cluster'}`,
      state: farmerForm.state,
      cropResidueType: farmerForm.cropResidueType,
      intakeWeightTons: tons,
      ratePerKg: rate,
      processedProduct: farmerForm.cropResidueType.includes('Paddy')
        ? 'Bio-Coal Biomass Briquettes'
        : farmerForm.cropResidueType.includes('Sugarcane')
        ? 'Organic Bio-Char & Compost'
        : 'Industrial Bio-Fuel Pellets'
    });

    if (result.success) {
      setRegisteredSuccessData({
        ...result.intake,
        farmerShare40,
        landholdingAcres: farmerForm.landholdingAcres,
        bankAccountNo: farmerForm.bankAccountNo ? `XXXX-XXXX-${farmerForm.bankAccountNo.slice(-4)}` : 'Aadhaar Bridge Linked',
        preferredPickupDate: farmerForm.preferredPickupDate
      });

      // Reset form
      setFarmerForm({
        farmerName: '',
        contactPhone: '',
        aadhaar: '',
        village: '',
        district: '',
        state: 'Punjab',
        landholdingAcres: '5.0',
        cropResidueType: 'Paddy Straw Stubble (Parali)',
        intakeWeightTons: '12.5',
        ratePerKg: 6.8,
        bankAccountNo: '',
        ifscCode: 'SBIN0001420',
        preferredPickupDate: '2026-03-15',
        farmgateLocationNotes: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Wheat className="w-3.5 h-3.5 text-amber-400" />
                Farmer Stubble-to-Wealth Gateway
              </span>
              <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                Guaranteed 40% Net Profit Share Direct Benefit Transfer (DBT)
              </span>
              <span className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                Zero Stubble Burning Mission
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Farmer Registration & Crop Stubble Procurement Portal
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Register your farm to get <strong className="text-emerald-300">100% free doorstep electric baler collection</strong> for paddy straw, sugarcane bagasse, and crop stubble. SANKALP processes your agricultural waste into green industrial fuel and credits <strong className="text-amber-300">40% of all gross sales directly to your bank account via Aadhaar / PFMS</strong>, boosting farmer income while eliminating air smog!
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setSubTab('register')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-700/30 transition-all cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Register New Farmer</span>
            </button>
            <button
              onClick={() => setSubTab('directory')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>View Verified DBT Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Step Architecture Flow */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            How SANKALP's 40% Farmer Profit Sharing Model Works
          </h3>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Zero Cost to Farmer • 48h Field Clearance • Direct Bank Account Payout
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 border border-amber-500/20 rounded-xl p-4 relative group hover:border-amber-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-sm mb-3">
              1
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-amber-400" />
              Farmer Registers Farm
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Farmer submits crop stubble estimate and farmgate location. Municipal electric balers are scheduled for free doorstep collection.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-emerald-500/20 rounded-xl p-4 relative group hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black text-sm mb-3">
              2
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Doorstep Baler Pickup
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Residue is baled and weighed at digital weighbridges with automated CPCB cryptographic traceability receipts.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-cyan-500/20 rounded-xl p-4 relative group hover:border-cyan-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-sm mb-3">
              3
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-cyan-400" />
              Torrefaction & Sale
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Stubble is converted into Bio-Coal Briquettes (4,350 kcal/kg) and sold to thermal power boilers under mandatory green co-firing quotas.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-amber-500/40 bg-gradient-to-b from-amber-950/30 to-transparent rounded-xl p-4 relative group hover:border-amber-400/60 transition-all shadow-md">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-black text-sm mb-3">
              4
            </div>
            <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              40% Direct Bank Transfer (DBT)
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">40% of sales revenue</strong> is transferred directly to the farmer's bank account via PFMS / Aadhaar. Farmers earn ₹25k - ₹60k per season!
            </p>
          </div>
        </div>
      </div>

      {/* High-Level Impact Counter Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Registered Farmers
          </span>
          <div className="text-xl font-black text-white font-mono mt-1">
            {metrics.totalFarmers} Farmers
          </div>
          <span className="text-[10px] text-amber-400 mt-0.5 block">
            Across 5 Agricultural States
          </span>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 bg-gradient-to-b from-amber-950/10 to-transparent">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
            <Coins className="w-3 h-3" />
            Farmer 40% DBT Paid
          </span>
          <div className="text-xl font-black text-amber-400 font-mono mt-1">
            ₹{(metrics.totalFarmerSharePaid / 100000).toFixed(2)}L
          </div>
          <span className="text-[10px] text-amber-300/80 mt-0.5 block">
            100% Aadhaar / PFMS Verified
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Stubble Diverted
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {metrics.totalTonsDiverted} Tons
          </div>
          <span className="text-[10px] text-emerald-300 mt-0.5 block">
            0 Fields Burned in Clusters
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            PM2.5 Smog Avoided
          </span>
          <div className="text-xl font-black text-cyan-400 font-mono mt-1">
            {metrics.totalPm25AvoidedKg} kg
          </div>
          <span className="text-[10px] text-cyan-300 mt-0.5 block">
            Severe Air Quality Shield
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            CO₂ Emissions Saved
          </span>
          <div className="text-xl font-black text-purple-400 font-mono mt-1">
            {metrics.totalCo2OffsetTons} Tons
          </div>
          <span className="text-[10px] text-purple-300 mt-0.5 block">
            Carbon Credits Accrued
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('register')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'register'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>🚜 Farmer Registration & Baler Booking</span>
        </button>

        <button
          onClick={() => setSubTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'directory'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Wheat className="w-4 h-4 text-emerald-300" />
          <span>🌾 Registered Farmers & 40% DBT Payout Ledger</span>
          <span className="text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300 font-mono">
            {farmerAgriLedger.length} Batches
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: FARMER REGISTRATION FORM                                      */}
      {/* ========================================================================= */}
      {subTab === 'register' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registration Form (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Farmer Onboarding Form
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Register Your Farm for Zero-Cost Stubble Pickup & 40% DBT Share
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Municipal electric balers will be dispatched directly to your farmgate. No burning required.
              </p>
            </div>

            <form onSubmit={handleRegisterFarmer} className="space-y-4">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Farmer Full Name *</label>
                  <input
                    type="text"
                    value={farmerForm.farmerName}
                    onChange={(e) => setFarmerForm({ ...farmerForm, farmerName: e.target.value })}
                    placeholder="e.g. Jaswinder Singh Sandhu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Mobile Phone (Aadhaar linked) *</label>
                  <input
                    type="tel"
                    value={farmerForm.contactPhone}
                    onChange={(e) => setFarmerForm({ ...farmerForm, contactPhone: e.target.value })}
                    placeholder="+91 98142 XXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Identification & Farm Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Aadhaar (Last 4 digits) *</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={farmerForm.aadhaar}
                    onChange={(e) => setFarmerForm({ ...farmerForm, aadhaar: e.target.value })}
                    placeholder="8921"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Landholding (Acres) *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={farmerForm.landholdingAcres}
                    onChange={(e) => setFarmerForm({ ...farmerForm, landholdingAcres: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">State *</label>
                  <select
                    value={farmerForm.state}
                    onChange={(e) => setFarmerForm({ ...farmerForm, state: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </div>
              </div>

              {/* Village & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Village / Gram Panchayat *</label>
                  <input
                    type="text"
                    value={farmerForm.village}
                    onChange={(e) => setFarmerForm({ ...farmerForm, village: e.target.value })}
                    placeholder="e.g. Samana Kalan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">District *</label>
                  <input
                    type="text"
                    value={farmerForm.district}
                    onChange={(e) => setFarmerForm({ ...farmerForm, district: e.target.value })}
                    placeholder="e.g. Patiala"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Crop Residue Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Crop Residue Stream *</label>
                  <select
                    value={farmerForm.cropResidueType}
                    onChange={(e) => setFarmerForm({ ...farmerForm, cropResidueType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Paddy Straw Stubble (Parali)">Paddy Straw Stubble (Parali)</option>
                    <option value="Sugarcane Bagasse & Field Tops">Sugarcane Bagasse & Field Tops</option>
                    <option value="Wheat Straw Residue">Wheat Straw Residue</option>
                    <option value="Mustard Stalks & Husk">Mustard Stalks & Husk</option>
                    <option value="Cotton Stalk Residue">Cotton Stalk Residue</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Estimated Residue (Metric Tons) *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    value={farmerForm.intakeWeightTons}
                    onChange={(e) => setFarmerForm({ ...farmerForm, intakeWeightTons: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Bank Details for Direct Benefit Transfer (DBT) */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  Bank Account for 40% Direct Benefit Transfer (DBT)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Bank Account Number</label>
                    <input
                      type="text"
                      value={farmerForm.bankAccountNo}
                      onChange={(e) => setFarmerForm({ ...farmerForm, bankAccountNo: e.target.value })}
                      placeholder="e.g. 50100449102456"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">IFSC Code</label>
                    <input
                      type="text"
                      value={farmerForm.ifscCode}
                      onChange={(e) => setFarmerForm({ ...farmerForm, ifscCode: e.target.value })}
                      placeholder="SBIN0001420"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Preferred Baler Pickup Date:</span>
                  <input
                    type="date"
                    value={farmerForm.preferredPickupDate}
                    onChange={(e) => setFarmerForm({ ...farmerForm, preferredPickupDate: e.target.value })}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-700/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Registration & Book Doorstep Baler</span>
              </button>
            </form>
          </div>

          {/* Live Dynamic Benefit Calculator Preview (1 col) */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Coins className="w-4 h-4" />
                <span>Live Earnings Preview</span>
              </div>

              {(() => {
                const tons = parseFloat(farmerForm.intakeWeightTons) || 12.5;
                const rate = parseFloat(farmerForm.ratePerKg) || 6.8;
                const gross = Math.round(tons * 1000 * rate);
                const farmerShare = Math.round(gross * 0.40);
                const municipalShare = gross - farmerShare;
                const pm25Saved = (tons * 9.2).toFixed(1);
                const co2Saved = (tons * 1.42).toFixed(1);

                return (
                  <div className="space-y-3 text-xs">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-slate-400">
                        <span>Residue Tonnage:</span>
                        <span className="font-mono text-white font-bold">{tons} Metric Tons</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Commercial Rate:</span>
                        <span className="font-mono text-white">₹{rate}/kg (₹{rate * 1000}/Ton)</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Market Gross Revenue:</span>
                        <span className="font-mono text-slate-200 font-bold">₹{gross.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/50 rounded-2xl p-4 text-center">
                      <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                        Your Guaranteed 40% DBT Payout
                      </span>
                      <div className="text-3xl font-black text-amber-300 font-mono my-1">
                        ₹{farmerShare.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-emerald-400 block font-medium">
                        Credited straight to your bank account via PFMS
                      </span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Municipal Baler & Ops (35%):</span>
                        <span className="font-mono text-slate-300">₹{Math.round(gross * 0.35).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>City Clean Infrastructure Fund (25%):</span>
                        <span className="font-mono text-slate-300">₹{Math.round(gross * 0.25).toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Clean Air Impact */}
                    <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 space-y-1 text-[11px]">
                      <span className="text-emerald-400 font-bold block">Environmental Shield:</span>
                      <div className="flex justify-between text-slate-300">
                        <span>PM2.5 Smog Prevented:</span>
                        <span className="font-mono font-bold text-cyan-400">-{pm25Saved} kg</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Carbon Offset (CO₂e):</span>
                        <span className="font-mono font-bold text-emerald-400">-{co2Saved} Tons</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Helpline / Assistance Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Farmer Kisan Mitra Helpline
              </span>
              <p className="text-[11px] text-slate-400">
                Toll-free coordination desk for baler machine scheduling and DBT transfer assistance.
              </p>
              <div className="text-xs font-mono font-bold text-amber-400">
                1800-180-SWACHH (Toll-Free 24x7)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: REGISTERED FARMERS DIRECTORY & DBT LEDGER                     */}
      {/* ========================================================================= */}
      {subTab === 'directory' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-400" />
                Verified Registered Farmers & 40% DBT Payout Ledger
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time government registry of farmgate collections, industrial conversion, and bank account transfers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search farmer, village, UTR..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All States</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
              </select>

              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Residues</option>
                <option value="Paddy">Paddy Stubble (Parali)</option>
                <option value="Sugarcane">Sugarcane Bagasse</option>
                <option value="Wheat">Wheat Straw</option>
                <option value="Mustard">Mustard Stalks</option>
              </select>
            </div>
          </div>

          {/* Directory Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Farmer Details</th>
                    <th className="p-4">Crop Residue & Weight</th>
                    <th className="p-4">Processing Conversion</th>
                    <th className="p-4">Gross Revenue</th>
                    <th className="p-4">
                      <span className="text-amber-400 font-bold">Farmer 40% Share (DBT)</span>
                    </th>
                    <th className="p-4">DBT Transfer Status</th>
                    <th className="p-4">Clean Air Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredFarmers.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          {item.farmerName}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.village}, {item.state}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          Aadhaar: {item.aadhaarMasked} • ID: {item.farmerId}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold text-[11px] block w-fit mb-1">
                          {item.cropResidueType}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {item.intakeWeightTons} Metric Tons
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Pickup: {item.collectionDate}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-slate-200">
                          {item.processedProduct}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          Yield: {item.unitsProduced}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="text-xs font-mono font-bold text-slate-200">
                          ₹{item.marketGrossRevenue.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Baler Ops: ₹{item.municipalProcessingShare?.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/40 rounded-lg p-2 w-fit">
                          <span className="text-sm font-black text-amber-300 font-mono block">
                            ₹{item.farmerPayoutAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">
                            40% Direct Benefit Transfer
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit mb-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.dbtStatus}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block" title={item.bankUtr}>
                          {item.bankUtr}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => setSelectedCertificateFarmer(item)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Certificate</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: REGISTRATION SUCCESS CARD                                        */}
      {/* ========================================================================= */}
      {registeredSuccessData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setRegisteredSuccessData(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 mx-auto">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Registration & Baler Booking Confirmed
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Farmer Green Pass #{registeredSuccessData.farmerId}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Farmer: <strong className="text-white">{registeredSuccessData.farmerName}</strong> ({registeredSuccessData.village})
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Crop Residue:</span>
                  <span className="font-semibold text-white">{registeredSuccessData.cropResidueType}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Quantity Baled:</span>
                  <span className="font-mono text-white font-bold">{registeredSuccessData.intakeWeightTons} Tons</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Scheduled Baler Pickup:</span>
                  <span className="text-amber-400 font-medium">{registeredSuccessData.preferredPickupDate || 'Within 48 Hours'}</span>
                </div>
                <div className="flex justify-between text-slate-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/40">
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" />
                    Approved 40% Farmer DBT:
                  </span>
                  <span className="font-mono text-base font-black text-amber-400">
                    ₹{registeredSuccessData.farmerPayoutAmount?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Settlement Bank:</span>
                  <span className="font-mono text-slate-300">{registeredSuccessData.bankAccountNo}</span>
                </div>
              </div>

              <button
                onClick={() => setRegisteredSuccessData(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: OFFICIAL FARMER CLEAN AIR CERTIFICATE                            */}
      {/* ========================================================================= */}
      {selectedCertificateFarmer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedCertificateFarmer(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-2 border-dashed border-emerald-500/40 rounded-2xl p-6 bg-gradient-to-b from-slate-950 to-emerald-950/20 text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-8 h-8 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Government of India • Ministry of Agriculture & MoHUA SBM-U 2.0
                </span>
              </div>

              <h3 className="text-xl font-black text-white">
                SWACHHTA SANGAM CLEAN AIR CITATION
              </h3>

              <p className="text-xs text-slate-300">
                This certificate of honor is presented to
              </p>

              <div className="text-2xl font-black text-amber-400 font-serif border-b border-amber-500/40 pb-2 w-fit mx-auto">
                {selectedCertificateFarmer.farmerName}
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                For exemplary environmental leadership by actively preventing agricultural stubble burning across{' '}
                <strong className="text-emerald-300">{selectedCertificateFarmer.intakeWeightTons} Metric Tons</strong> of{' '}
                {selectedCertificateFarmer.cropResidueType} in {selectedCertificateFarmer.village}, {selectedCertificateFarmer.state}, enabling clean industrial bio-coal production and receiving{' '}
                <strong className="text-amber-400">₹{selectedCertificateFarmer.farmerPayoutAmount?.toLocaleString('en-IN')}</strong> in Direct Benefit Transfer (40% net revenue share).
              </p>

              <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Smog Avoided</span>
                  <span className="font-mono font-bold text-cyan-400">-{selectedCertificateFarmer.pm25PreventedKg} kg PM2.5</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Carbon Saved</span>
                  <span className="font-mono font-bold text-emerald-400">-{selectedCertificateFarmer.co2OffsetTons} T CO₂e</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bank UTR</span>
                  <span className="font-mono text-slate-300 truncate block" title={selectedCertificateFarmer.bankUtr}>
                    {selectedCertificateFarmer.bankUtr?.slice(-8)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Certificate No: SANKALP-AGRI-2026-{selectedCertificateFarmer.id?.slice(-4)}</span>
                <span>Authorized Digital Signature</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSelectedCertificateFarmer(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
