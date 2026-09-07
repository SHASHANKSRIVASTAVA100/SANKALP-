import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Landmark,
  Recycle,
  Factory,
  Scale,
  Truck,
  Cpu,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileCheck,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Download,
  RefreshCw,
  Flame,
  Zap,
  TreePine,
  Layers,
  Award,
  Phone,
  Clock,
  ArrowUpRight,
  Sliders,
  Sparkles,
  Check,
  Copy,
  Gauge,
  Compass,
  BatteryCharging,
  Fuel,
  Info,
  Store,
  Wheat,
  Coins
} from 'lucide-react';
import { GoogleMapContainer } from '../common/GoogleMapContainer';
import { OfficialSbmAuditModal } from './OfficialSbmAuditModal';
import { CircularMarketplaceView } from './CircularMarketplaceView';

export const MunicipalityDashboard = () => {
  const {
    currentUser,
    recyclers = [],
    technologies = [],
    municipalStats = {},
    vehicles = [],
    marketplaceProducts = [],
    farmerAgriLedger = [],
    marketplaceOrders = [],
    wardFilter,
    setWardFilter,
    t
  } = useApp();

  // Navigation Sub-tabs: 'marketplace' | 'recyclers' | 'categories' | 'diversion' | 'technology' | 'fleet'
  const [activeTab, setActiveTab] = useState('marketplace');

  // SBM-U 2.0 Compliance Audit Modal
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Recyclers Search & Filter
  const [recyclerSearch, setRecyclerSearch] = useState('');
  const [recyclerCategoryFilter, setRecyclerCategoryFilter] = useState('All');
  const [showRecyclerMap, setShowRecyclerMap] = useState(false);

  // Fleet Search & Filter
  const [fleetSearch, setFleetSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState('All');
  const [showFleetMap, setShowFleetMap] = useState(false);

  // Copied Hash Feedback
  const [copiedHash, setCopiedHash] = useState(null);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // Safe Stats Extraction
  const totalGenerated = municipalStats?.cityTotalGenerationTonsPerDay || municipalStats?.totalWasteGeneratedTons || 1750;
  const totalRecycled = municipalStats?.cityTotalRecycledTonsPerDay || municipalStats?.totalWasteRecycledTons || 1420;
  const totalCollected = municipalStats?.totalWasteCollectedTons || Math.round(totalGenerated * 0.98);
  const diversionRate = municipalStats?.landfillDiversionPercent
    ? `${municipalStats.landfillDiversionPercent}%`
    : municipalStats?.landfillDiversionRate || '81.1%';
  const cleanEnergyKwh = municipalStats?.biogasCleanEnergyKwhPerDay || municipalStats?.biogasCBGYieldKWh || 38400;
  const co2Saved = municipalStats?.co2EquivalentSavedMetricTons || municipalStats?.methaneEmissionsAvoidedMT || 845;

  // Categories Normalized List
  const rawCategories = municipalStats?.dailyCategories || municipalStats?.categories || [
    { name: "Organic Wet Food Waste", tons: 580, percent: 33.1, color: "#10b981", destination: "Indiranagar Bio-Methanation" },
    { name: "Construction & Demolition (C&D)", tons: 380, percent: 21.7, color: "#f59e0b", destination: "Channasandra Aggregate Plant" },
    { name: "Plastic Packaging (PET/HDPE/MLP)", tons: 290, percent: 16.6, color: "#06b6d4", destination: "GreenRecycle Hub Ltd" },
    { name: "Paper & Corrugated Cardboard", tons: 185, percent: 10.6, color: "#38bdf8", destination: "ITC Paperboards Mill" },
    { name: "Drain Silt & Desilted Sludge", tons: 120, percent: 6.9, color: "#64748b", destination: "Municipal Drying Beds" },
    { name: "Metal Scrap & Beverage Cans", tons: 95, percent: 5.4, color: "#a855f7", destination: "Peenya Smelting Works" },
    { name: "Glass Bottles & Cullet", tons: 65, percent: 3.7, color: "#ec4899", destination: "Hindusthan Glass Furnaces" },
    { name: "Hazardous, Batteries & E-Waste", tons: 35, percent: 2.0, color: "#ef4444", destination: "Dobbaspet Hazmat Treatment" }
  ];

  // Live Cryptographic Weighbridge Ledger Batches
  const weighbridgeBatches = municipalStats?.weighbridgeBatches || [
    {
      id: "WB-2026-0941",
      timestamp: "Today, 11:42 AM",
      truckNumber: "KA-03-GH-1102",
      category: "Wet Organic Waste",
      grossWeightTons: 14.8,
      tareWeightTons: 6.2,
      netWasteWeightTons: 8.6,
      destinationRecycler: "Indiranagar Bio-Methanation",
      hashSha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      status: "CPCB Verified"
    },
    {
      id: "WB-2026-0940",
      timestamp: "Today, 11:15 AM",
      truckNumber: "KA-01-EE-4509",
      category: "Plastic & Polymers (PET/HDPE)",
      grossWeightTons: 9.4,
      tareWeightTons: 4.1,
      netWasteWeightTons: 5.3,
      destinationRecycler: "GreenRecycle Hub Ltd",
      hashSha256: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      status: "CPCB Verified"
    },
    {
      id: "WB-2026-0939",
      timestamp: "Today, 10:48 AM",
      truckNumber: "KA-04-MB-3391",
      category: "Stormwater Drain Silt",
      grossWeightTons: 16.2,
      tareWeightTons: 7.0,
      netWasteWeightTons: 9.2,
      destinationRecycler: "Municipal Aggregate Drying",
      hashSha256: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
      status: "CPCB Verified"
    },
    {
      id: "WB-2026-0938",
      timestamp: "Today, 10:20 AM",
      truckNumber: "KA-02-JH-7714",
      category: "C&D Demolition Concrete",
      grossWeightTons: 18.5,
      tareWeightTons: 6.8,
      netWasteWeightTons: 11.7,
      destinationRecycler: "Channasandra C&D Aggregate",
      hashSha256: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
      status: "CPCB Verified"
    },
    {
      id: "WB-2026-0937",
      timestamp: "Today, 09:55 AM",
      truckNumber: "KA-53-MC-9082",
      category: "Cardboard & Kraft Packaging",
      grossWeightTons: 7.6,
      tareWeightTons: 3.4,
      netWasteWeightTons: 4.2,
      destinationRecycler: "ITC Paperboards Mill",
      hashSha256: "2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3",
      status: "CPCB Verified"
    }
  ];

  // Filter Recyclers with Robust Fallbacks
  const filteredRecyclers = recyclers.filter((r) => {
    const name = r.name || '';
    const loc = r.location || '';
    const lic = r.licenseNo || r.cpcbLicense || '';
    const category = r.category || (Array.isArray(r.categoriesHandled) ? r.categoriesHandled.join(' ') : '');

    const matchesSearch =
      name.toLowerCase().includes(recyclerSearch.toLowerCase()) ||
      loc.toLowerCase().includes(recyclerSearch.toLowerCase()) ||
      lic.toLowerCase().includes(recyclerSearch.toLowerCase());

    const matchesCategory =
      recyclerCategoryFilter === 'All' ||
      category.toLowerCase().includes(recyclerCategoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Filter Vehicles with Robust Fallbacks
  const filteredVehicles = vehicles.filter((v) => {
    const num = v.registrationNo || v.number || '';
    const driver = v.driverName || '';
    const ward = v.ward || v.assignedWard || '';
    const fuel = v.fuelType || '';

    const matchesSearch =
      num.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      driver.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      ward.toLowerCase().includes(fleetSearch.toLowerCase());

    const matchesFuel =
      fuelFilter === 'All' ||
      fuel.toLowerCase().includes(fuelFilter.toLowerCase());

    return matchesSearch && matchesFuel;
  });

  // Prepare Recycler Map Markers
  const recyclerMarkers = recyclers.map((r) => ({
    id: r.id,
    lat: r.coordinates?.lat || r.lat || 12.9716,
    lng: r.coordinates?.lng || r.lng || 77.5946,
    title: r.name || 'Recycler Hub',
    type: 'recycler',
    category: r.category || r.type || 'MRF',
    status: r.cpcbAuditStatus || r.auditStatus || 'Certified'
  }));

  // Prepare Fleet Map Markers
  const fleetMarkers = vehicles.map((v) => ({
    id: v.id,
    lat: v.currentLocation?.lat || v.lat || 12.9716,
    lng: v.currentLocation?.lng || v.lng || 77.5946,
    title: `${v.registrationNo || v.number} - ${v.driverName}`,
    type: 'vehicle',
    speed: v.speedKmH ?? v.speed ?? 15,
    fuelType: v.fuelType || 'CNG'
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Commissioner Executive Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border-2 border-purple-500/50 flex items-center justify-center text-purple-300 shadow-xl shrink-0">
              <Landmark className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  City Municipal Headquarters
                </span>
                <span className="bg-slate-800 text-slate-300 text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-slate-700">
                  City Corporation Code: {currentUser?.ulbOfficeId || 'BBMP/HQ/COMM-01'}
                </span>
                <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Sensors & GPS Connected
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Municipality Office • City Waste & Clean City Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Central executive cockpit for Municipal Commissioner{' '}
                <strong className="text-purple-300">{currentUser?.name || 'Dr. Rajeshwari Swamy, IAS'}</strong>.
                Monitoring daily doorstep garbage pickup, 8 waste streams, partner recycling factories, clean green energy, and 12 live GPS garbage trucks.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowAuditModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/50 active:scale-95 ring-1 ring-emerald-400/50"
              title="Export Official SBM-U 2.0 Compliance Audit Certificate"
            >
              <FileCheck className="w-4 h-4 text-slate-950" />
              <span>Download SBM-U 2.0 Inspection Report (PDF)</span>
            </button>
            <div className="px-3.5 py-2 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Today • AICTE Portal</span>
            </div>
          </div>
        </div>

        {/* City Operations at a Glance (Easy-to-Understand 3-Pillar Summary) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">1. Doorstep Pickup</span>
              <strong className="text-white text-sm block">98.0% City Coverage</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">1,715 Tons of garbage picked up every morning from homes & shops.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">2. Smart Digital Scales</span>
              <strong className="text-white text-sm block">Automated Weighbridges</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Trucks are digitally weighed at city checkpoints so zero waste is dumped illegally.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">3. Kept Out of Landfills</span>
              <strong className="text-white text-sm block">81.1% Recycled & Reused</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Turned into 38,400 kWh of clean biogas energy and recycled plastic pellets!</p>
            </div>
          </div>
        </div>

        {/* Top Operational KPI Bar (Plain-Language Labels) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Daily Waste Produced
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-white font-mono">
                {totalGenerated}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Tons/Day</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              98.0% Collected from Homes
            </span>
          </div>

          <div className="bg-slate-900/80 border border-purple-900/40 rounded-xl p-3">
            <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider block">
              Recycled & Reused
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-purple-400 font-mono">
                {diversionRate}
              </span>
              <span className="text-[11px] text-purple-300 font-medium">Goal 75%</span>
            </div>
            <span className="text-[10px] text-purple-300 font-mono mt-0.5 block">
              {totalRecycled} Tons/Day Saved
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Clean Electricity Made
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-amber-400 font-mono">
                {(cleanEnergyKwh / 1000).toFixed(1)}k
              </span>
              <span className="text-[11px] text-slate-400 font-medium">kWh/Day</span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono mt-0.5 block flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> Powers 3,200 Streetlights
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Clean Air Impact (CO₂)
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-emerald-400 font-mono">
                {co2Saved}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Tons/Day</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono mt-0.5 block flex items-center gap-1">
              <TreePine className="w-2.5 h-2.5" /> Equal to 16,400 Trees
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Partner Recycling Plants
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-indigo-400 font-mono">
                {recyclers.length}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Factories</span>
            </div>
            <span className="text-[10px] text-indigo-300 font-mono mt-0.5 block">
              1,930 Tons/Day Capacity
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Garbage Trucks On Duty
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-cyan-400 font-mono">
                100%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">{vehicles.length} Trucks</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono mt-0.5 block">
              0 Violations • Clean Fleets
            </span>
          </div>
        </div>
      </div>

      {/* 6 Navigation Tabs (Human-Friendly Labels) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'marketplace'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Store className="w-4 h-4 text-emerald-400" />
          <span>Recycled Marketplace & Farmer Agri-Share</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
            activeTab === 'marketplace' ? 'bg-emerald-800 text-amber-300' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
          }`}>
            🌾 40% Farmer Share
          </span>
        </button>

        <button
          onClick={() => setActiveTab('recyclers')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'recyclers'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Recycling Factories & Centers</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            activeTab === 'recyclers' ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {recyclers.length} Plants
          </span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>8 Waste Types & Where They Go</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            activeTab === 'categories' ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            8 Streams
          </span>
        </button>

        <button
          onClick={() => setActiveTab('diversion')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'diversion'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Recycle className="w-4 h-4" />
          <span>Landfill Savings & Truck Scales</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            activeTab === 'diversion' ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {diversionRate} Saved
          </span>
        </button>

        <button
          onClick={() => setActiveTab('technology')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'technology'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>City Eco-Machines & Technology</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            activeTab === 'technology' ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {technologies.length} Tech Units
          </span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeTab === 'fleet'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Garbage Trucks & Live GPS</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
            activeTab === 'fleet' ? 'bg-purple-800 text-white' : 'bg-slate-800 text-slate-400'
          }`}>
            {vehicles.length} Trucks
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: RECYCLED GOODS MARKETPLACE & 40% FARMER AGRI-CIRCULAR EXCHANGE       */}
      {/* ========================================================================= */}
      {activeTab === 'marketplace' && (
        <CircularMarketplaceView />
      )}

      {/* ========================================================================= */}
      {/* TAB 1: CERTIFIED RECYCLING FACTORIES & MATERIAL PROCESSING CENTERS        */}
      {/* ========================================================================= */}
      {activeTab === 'recyclers' && (
        <div className="space-y-6">
          {/* Friendly Section Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-purple-400" />
                Certified Recycling Factories & Material Processing Centers
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Licensed partner factories that receive segregated city waste and transform it into clean electricity, compost, or secondary raw materials.
              </p>
            </div>
            <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold px-3 py-1.5 rounded-xl self-start md:self-auto">
              Total Processing Capacity: 1,930 Tons/Day
            </span>
          </div>

          {/* Header Controls & Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={recyclerSearch}
                  onChange={(e) => setRecyclerSearch(e.target.value)}
                  placeholder="Search factory name, license, area..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <select
                  value={recyclerCategoryFilter}
                  onChange={(e) => setRecyclerCategoryFilter(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Waste Categories</option>
                  <option value="Plastic" className="bg-slate-900">Plastics & Polymers</option>
                  <option value="Organic" className="bg-slate-900">Wet Organic & Bio-Waste</option>
                  <option value="E-Waste" className="bg-slate-900">E-Waste & Lithium</option>
                  <option value="Demolition" className="bg-slate-900">C&D Construction Waste</option>
                  <option value="Cardboard" className="bg-slate-900">Cardboard & Paper</option>
                  <option value="Glass" className="bg-slate-900">Glass & Cullet</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRecyclerMap(!showRecyclerMap)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showRecyclerMap
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{showRecyclerMap ? 'Hide GIS Map' : 'Show GIS Map View'}</span>
              </button>
            </div>
          </div>

          {/* Recyclers GIS Google Map View */}
          {showRecyclerMap && (
            <div className="rounded-2xl overflow-hidden border border-purple-500/40 shadow-xl">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">
                    Municipal Recycler & MRF Processing Nodes ({recyclers.length} Certified Facilities)
                  </span>
                </div>
                <span className="text-[11px] text-purple-300 font-mono">
                  CPCB Geofenced Processing Zones
                </span>
              </div>
              <GoogleMapContainer
                height="380px"
                markers={recyclerMarkers}
                zoom={11}
                title="Municipal Recycler GIS Map"
              />
            </div>
          )}

          {/* Recycler Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecyclers.map((r) => {
              const cap = r.dailyCapacityTons || r.processingCapacityTonsPerDay || 100;
              const intake = r.currentIntakeTons || r.currentDailyIntakeTons || 80;
              const utilization = r.utilizationPercent || ((intake / cap) * 100).toFixed(1);
              const license = r.licenseNo || r.cpcbLicense || 'CPCB/2026/REG';
              const facilityType = r.facilityType || r.type || 'Recycling & Processing Plant';
              const head = r.facilityHead || r.contactPerson || 'Plant Director';
              const phone = r.contactPhone || r.phone || '+91 80 2845 9920';
              const categoryStr = r.category || (Array.isArray(r.categoriesHandled) ? r.categoriesHandled.join(', ') : 'Dry Recyclables');
              const status = r.cpcbAuditStatus || r.auditStatus || 'CPCB Grade-A Compliant';

              return (
                <div
                  key={r.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:bg-slate-900"
                >
                  <div>
                    {/* Top Row: ID & Audit Status */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase font-mono">
                        {r.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {r.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{facilityType}</p>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3">
                      <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{r.location}</span>
                    </div>

                    {/* License Details */}
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Govt. License (CPCB):</span>
                        <span className="font-mono text-purple-300 font-semibold text-[11px]">
                          {license}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Total Recycled To Date:</span>
                        <span className="font-mono text-slate-300 text-[11px]">
                          {r.cumulativeRecycledTons ? `${r.cumulativeRecycledTons.toLocaleString()} Tons` : '14,850 Tons'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Waste It Handles:</span>
                        <span className="font-mono text-emerald-400 font-bold text-[11px] truncate max-w-[150px]">
                          {categoryStr}
                        </span>
                      </div>
                    </div>

                    {/* Capacity vs Daily Intake Meter */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-300">Daily Processing Workload</span>
                        <span className="font-mono text-purple-400">
                          {intake} of {cap} Tons/Day ({utilization}% full)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(parseFloat(utilization), 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Active Municipal Contracts */}
                    {r.activeContracts && (
                      <div className="mt-4">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
                          Active Municipal MOUs
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {r.activeContracts.map((c, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-md border border-slate-700/60"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plant Director Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate max-w-[140px]">{head}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">{phone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 8 WASTE TYPES & WHERE THEY GO                                      */}
      {/* ========================================================================= */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          {/* Top Categories Overview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  City Waste Breakdown (8 Types & Where They Go)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Every morning, city garbage is segregated into 8 streams so it can be turned into clean energy, compost, and raw materials instead of rotting in landfills.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Doorstep Pickup:</span>
                <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold px-3 py-1 rounded-xl">
                  {totalCollected} / {totalGenerated} Tons/Day (98.0% Coverage)
                </span>
              </div>
            </div>

            {/* 8 Categories Grid with Real-World Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rawCategories.map((cat, idx) => {
                const tons = cat.tons || cat.collectedTons || 100;
                const pct = cat.percent || cat.percentage || 12;
                const dest = cat.destination || cat.targetRecycler || 'Authorized Recycling MRF';
                const color = cat.color || '#10b981';

                const categoryBenefits = {
                  "Organic Wet Food Waste": "Turned into Compressed Biogas (CBG) for city buses and organic compost",
                  "Construction & Demolition (C&D)": "Crushed into manufactured eco-sand and aggregate for roads",
                  "Plastic Packaging (PET/HDPE/MLP)": "Melted into recycled polymer pellets for new packaging",
                  "Paper & Corrugated Cardboard": "Hydropulped into strong recycled kraft packaging boxes",
                  "Drain Silt & Desilted Sludge": "Sun-dried and used for non-structural municipal ground fill",
                  "Metal Scrap & Beverage Cans": "Smelted into recycled aluminum and steel ingots",
                  "Glass Bottles & Cullet": "Melted in furnaces to produce new beverage glass containers",
                  "Hazardous, Batteries & E-Waste": "Safely neutralized; precious metals reclaimed without ground toxins"
                };

                const benefit = categoryBenefits[cat.name] || "Processed into certified circular economy materials";

                return (
                  <div
                    key={idx}
                    className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[11px] font-mono font-bold text-white ml-auto">
                          {pct}% of City Trash
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-100">{cat.name}</h4>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Daily Amount:</span>
                          <span className="font-mono font-bold text-white">{tons} Tons/Day</span>
                        </div>

                        {/* Mini Recovery Bar */}
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: color,
                              width: `${Math.min(pct * 2.5, 100)}%`
                            }}
                          />
                        </div>
                      </div>

                      {/* What It Becomes (Clear Plain English) */}
                      <div className="mt-3 p-2 bg-slate-900/80 rounded-lg border border-slate-800/80">
                        <span className="text-[10px] text-purple-300 font-bold block">
                          What this becomes:
                        </span>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                          {benefit}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-900 text-[11px] text-slate-400">
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Destination Factory:
                      </span>
                      <span className="font-medium text-emerald-400 truncate block mt-0.5">
                        {dest}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ward-Wise Collection & Cleanliness Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Zonal Ward Cleanliness & Waste Segregation Table
            </h3>
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="min-w-[680px] w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Ward Name</th>
                    <th className="px-4 py-3">Residents Living Here</th>
                    <th className="px-4 py-3">Daily Garbage</th>
                    <th className="px-4 py-3">Segregation Score</th>
                    <th className="px-4 py-3">Main Waste Collected</th>
                    <th className="px-4 py-3">Ward Health Officer</th>
                    <th className="px-4 py-3 text-right">Cleanliness Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-white">Ward 12 - Indiranagar</td>
                    <td className="px-4 py-3 text-slate-400">84,500</td>
                    <td className="px-4 py-3 font-semibold text-white">48.2 TPD</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">96.4% (Grade A+)</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Wet Organic & PET Bottles</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Inspector Ananya Rao</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        EXCELLENT
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-white">Ward 15 - Koramangala</td>
                    <td className="px-4 py-3 text-slate-400">112,000</td>
                    <td className="px-4 py-3 font-semibold text-white">62.8 TPD</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">94.1% (Grade A)</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Food Waste & E-Commerce Cartons</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Officer Sunil Reddy</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        COMPLIANT
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-white">Ward 08 - Malleshwaram</td>
                    <td className="px-4 py-3 text-slate-400">95,400</td>
                    <td className="px-4 py-3 font-semibold text-white">51.0 TPD</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">91.8% (Grade A)</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Vegetable Mandi Bio-Waste</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Officer K. Venkatesh</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        COMPLIANT
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-white">Ward 22 - Whitefield</td>
                    <td className="px-4 py-3 text-slate-400">135,000</td>
                    <td className="px-4 py-3 font-semibold text-white">76.5 TPD</td>
                    <td className="px-4 py-3 text-amber-400 font-bold">88.5% (Grade B+)</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Packaging & Tech E-Waste</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Officer Preeti Nair</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        MONITORED
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 font-bold text-white">Ward 04 - Jayanagar</td>
                    <td className="px-4 py-3 text-slate-400">78,000</td>
                    <td className="px-4 py-3 font-semibold text-white">41.6 TPD</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">95.9% (Grade A+)</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Horticultural Leaves & Glass</td>
                    <td className="px-4 py-3 text-slate-300 font-sans">Officer Manjunath B.</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        EXCELLENT
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LANDFILL SAVINGS & TRUCK WEIGHBRIDGE                               */}
      {/* ========================================================================= */}
      {activeTab === 'diversion' && (
        <div className="space-y-6">
          {/* Circular Loop Flow Cards */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-purple-400" />
                  Keeping Waste Out of Landfills (City Mass Balance)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tracking how 1,750 tons of daily trash is picked up, weighed, and converted into clean electricity and recycled goods.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                  Swachh Bharat National Benchmark
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Exceeding National Goal by +6.1%
                </span>
              </div>
            </div>

            {/* Mass Balance Steps (Plain English) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-md">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block mb-1">
                  1. Produced by Citizens
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  {totalGenerated} <span className="text-xs text-slate-400 font-normal">Tons/Day</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Total daily civic & commercial refuse produced across 198 municipal wards.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-md">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block mb-1">
                  2. Picked Up by Trucks
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  {totalCollected} <span className="text-xs text-slate-400 font-normal">Tons/Day</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Mechanized fleet doorstep pickup: <strong className="text-emerald-400">98.0% coverage</strong>.
                </p>
              </div>

              <div className="bg-purple-950/40 border border-purple-500/50 rounded-xl p-4 relative overflow-hidden shadow-md">
                <div className="absolute top-2 right-2 bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                  {diversionRate} SAVED
                </div>
                <span className="text-[10px] text-purple-300 font-mono font-bold uppercase block mb-1">
                  3. Recycled & Reused
                </span>
                <div className="text-2xl font-black text-purple-400 font-mono">
                  {totalRecycled} <span className="text-xs text-purple-300 font-normal">Tons/Day</span>
                </div>
                <p className="text-xs text-purple-200/80 mt-2">
                  Kept away from smelly landfills; sent directly to certified recycling factories.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-md">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block mb-1">
                  4. Safe Inert Residue
                </span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {totalCollected - totalRecycled}{' '}
                  <span className="text-xs text-slate-400 font-normal">Tons/Day</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Only non-recyclable inert stones/silt sent to safe engineered landfills.
                </p>
              </div>
            </div>

            {/* Circular Output Dividends */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Clean Electricity Made
                  </span>
                  <span className="font-mono font-bold text-sm text-white">{(cleanEnergyKwh / 1000).toFixed(1)}k kWh / Day</span>
                  <span className="text-[10px] text-slate-500 block">Powers 3,200 streetlights</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Recycled Plastic Pellets
                  </span>
                  <span className="font-mono font-bold text-sm text-white">295 Tons / Day</span>
                  <span className="text-[10px] text-slate-500 block">Supplied for new product packaging</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <TreePine className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Trees Saved From Chopping
                  </span>
                  <span className="font-mono font-bold text-sm text-white">3,315 Trees / Day</span>
                  <span className="text-[10px] text-slate-500 block">By recycling 185 tons of paper</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Eco-Concrete for Roads
                  </span>
                  <span className="font-mono font-bold text-sm text-white">95 Tons / Day</span>
                  <span className="text-[10px] text-slate-500 block">Recycled building demolition rubble</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Weighbridge Audit Ledger */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  Live Digital Weighbridge Scale Records (Truck Weights & Verification)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated electronic scales record exact truck weights at city gates, guaranteeing that zero garbage is lost or dumped illegally.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono self-start sm:self-auto">
                Showing Last 5 Verified Truck Batches
              </span>
            </div>

            {/* Weighbridge Explainer Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300 mb-4">
              <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">What is an Electronic Weighbridge?</strong>
                A digital truck scale at municipal plant gates. Each garbage truck is weighed twice: once when arriving full (Full Truck) and once after unloading (Empty Truck). The difference is the exact net waste delivered, ensuring complete transparency and zero cheating.
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="min-w-[680px] w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Batch ID</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Truck No</th>
                    <th className="px-4 py-3">Waste Category</th>
                    <th className="px-4 py-3">Weights (Full / Empty = Actual Waste)</th>
                    <th className="px-4 py-3">Destination Factory</th>
                    <th className="px-4 py-3">Anti-Tamper Code</th>
                    <th className="px-4 py-3 text-right">Inspection Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {weighbridgeBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-bold text-purple-300">{batch.id}</td>
                      <td className="px-4 py-3 text-slate-400">{batch.timestamp}</td>
                      <td className="px-4 py-3 font-semibold text-white">{batch.truckNumber}</td>
                      <td className="px-4 py-3 text-slate-300 font-sans">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {batch.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-slate-400">{batch.grossWeightTons}t / {batch.tareWeightTons}t = </span>
                        <strong className="text-emerald-400">{batch.netWasteWeightTons}t</strong>
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-sans truncate max-w-[160px]">
                        {batch.destinationRecycler}
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span>{(batch.hashSha256 || 'SHA256').substring(0, 10)}...</span>
                          <button
                            onClick={() => handleCopyHash(batch.hashSha256 || 'SHA256')}
                            className="text-purple-400 hover:text-white cursor-pointer"
                            title="Copy full cryptographic hash"
                          >
                            {copiedHash === batch.hashSha256 ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {batch.status}
                        </span>
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
      {/* TAB 4: REGISTERED LARGE WASTE COLLECTOR TECHNOLOGY                        */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* TAB 4: CITY ECO-MACHINES & HIGH-TECH CLEAN EQUIPMENT                      */}
      {/* ========================================================================= */}
      {activeTab === 'technology' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                City Eco-Machines & High-Tech Clean Equipment
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Central registry of modern automated machines deployed across the city to quickly sort recycling, unblock stormwater drains, and compress city waste.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold px-3 py-1 rounded-xl">
                {technologies.length} Machines Operating
              </span>
            </div>
          </div>

          {/* Technology Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => {
              const speed = tech.processingSpeed || tech.throughput || '15 Tons / Hour';
              const accuracy = tech.accuracyPercent ? `${tech.accuracyPercent}%` : tech.accuracy || '98.5%';
              const depot = tech.operationalDepot || tech.deploymentLocation || 'Central Municipal Hub';
              const units = tech.unitsDeployed || 4;
              const features = tech.features || ['Automated Sorting', 'CPCB Cloud Telemetry'];
              const status = tech.status || 'Operational';

              // Plain-English 1-line explainer for each equipment
              const plainExplainer = {
                'TECH-01': 'Uses laser cameras & air jets to separate bottles by plastic type in milliseconds.',
                'TECH-02': 'Heavy vacuum tanker that extracts deep drain sludge & flushes underground culverts to prevent street flooding.',
                'TECH-03': 'Industrial hydraulic press that crushes dry plastic & cardboard into compact blocks for transport.',
                'TECH-04': 'Public solar dustbins that automatically crush trash inside, holding 5x more waste without overflowing.',
                'TECH-05': 'Crushes brick & concrete debris into certified manufactured sand (M-Sand) for new roads and homes.',
                'TECH-06': 'Satellite GPS trackers & radio tags on trucks that beam live speed and route progress to city control.'
              }[tech.id] || 'High-tech municipal equipment helping city teams process recyclable materials cleaner and faster.';

              return (
                <div
                  key={tech.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
                >
                  <div>
                    {/* Header Banner */}
                    <div className="bg-slate-950 p-5 border-b border-slate-800 relative">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="bg-slate-900 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded font-mono">
                          {tech.id}
                        </span>
                        <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {status}
                        </span>
                      </div>
                      <span className="text-[10px] text-purple-300 uppercase font-semibold font-mono tracking-wider">
                        {tech.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-purple-300 transition-colors">
                        {tech.name}
                      </h3>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-4">
                      {/* Simple Words Explainer Box */}
                      <div className="bg-purple-950/40 border border-purple-800/60 rounded-xl p-3 text-[11px] text-purple-200 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-purple-300 font-semibold block text-[10px] uppercase tracking-wider">
                            In Plain Words: What It Does
                          </strong>
                          <p className="mt-0.5 text-slate-300 leading-relaxed font-sans">
                            {plainExplainer}
                          </p>
                        </div>
                      </div>

                      {/* Telemetry Stats Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-sans">
                            Speed / Capacity
                          </span>
                          <span className="font-bold text-white text-xs">{speed}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase font-sans">
                            Sorting Accuracy
                          </span>
                          <span className="font-bold text-emerald-400 text-xs">{accuracy}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-900">
                          <span className="text-[10px] text-slate-500 block uppercase font-sans">
                            Units in Operation
                          </span>
                          <span className="font-bold text-indigo-300 text-xs">
                            {units} Working in City
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-900">
                          <span className="text-[10px] text-slate-500 block uppercase font-sans">
                            Eco-Power Rating
                          </span>
                          <span className="font-bold text-amber-300 text-xs truncate block">
                            {tech.energyRating || 'Green Star'}
                          </span>
                        </div>
                      </div>

                      {/* Deployment Location */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">Station: <strong>{depot}</strong></span>
                      </div>

                      {/* Features Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {features.map((f, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-800/80 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700/60"
                          >
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Maker: <strong>{tech.manufacturer}</strong></span>
                      <span className="font-mono text-[10px] text-slate-500">Next Checkup: {tech.nextServiceDue || 'Q2 2026'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MUNICIPAL VEHICLE RECORDS & FLEET LEDGER                             */}
      {/* ========================================================================= */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          {/* Header Controls & Filter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-400" />
                Garbage Collection Trucks & Real-Time GPS Tracking
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Official registry of municipal garbage trucks, tippers, and electric sweepers. Track live vehicle speed, assigned drivers, and pollution certifications.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold px-3 py-1 rounded-xl flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                100% Green Fleets (EV & CNG)
              </span>
              <span className="bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold px-3 py-1 rounded-xl">
                {vehicles.length} Trucks Monitored
              </span>
            </div>
          </div>

          {/* Quick Fleet Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Garbage Fleet</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold text-white font-mono">{vehicles.length}</span>
                <span className="text-xs text-slate-400">Trucks</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">100% Operational Today</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Green Clean Energy</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {vehicles.filter(v => v.fuelType?.includes('Electric') || v.fuelType?.includes('CNG')).length}
                </span>
                <span className="text-xs text-emerald-300">EV & CNG Vehicles</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Zero Smoke & Low Carbon</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Daily Route Coverage</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold text-cyan-400 font-mono">98.4%</span>
                <span className="text-xs text-cyan-300">City Wards</span>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">Door-to-Door Every Morning</span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pollution Check (PUC)</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-bold text-purple-400 font-mono">100% Pass</span>
                <span className="text-xs text-purple-300">Govt Verified</span>
              </div>
              <span className="text-[10px] text-purple-300 font-mono">0 Emission Violations</span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={fleetSearch}
                  onChange={(e) => setFleetSearch(e.target.value)}
                  placeholder="Search vehicle number, driver, ward..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1 text-xs">
                <Fuel className="w-3.5 h-3.5 text-purple-400" />
                <select
                  value={fuelFilter}
                  onChange={(e) => setFuelFilter(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Fuel Types</option>
                  <option value="Electric" className="bg-slate-900">100% Electric (EV)</option>
                  <option value="CNG" className="bg-slate-900">Compressed Natural Gas (CNG)</option>
                  <option value="Diesel" className="bg-slate-900">Clean Commercial Diesel</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFleetMap(!showFleetMap)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showFleetMap
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{showFleetMap ? 'Hide Live Map' : 'Track All Trucks on Live GPS Map'}</span>
              </button>
            </div>
          </div>

          {/* Fleet Live GPS Map View */}
          {showFleetMap && (
            <div className="rounded-2xl overflow-hidden border border-purple-500/40 shadow-xl">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">
                    Municipal Fleet Real-Time GPS Tracking ({vehicles.length} Monitored Units)
                  </span>
                </div>
                <span className="text-[11px] text-purple-300 font-mono">
                  Live Satellite GPS Signal
                </span>
              </div>
              <GoogleMapContainer
                height="380px"
                markers={fleetMarkers}
                zoom={12}
                title="Municipal Fleet Live GPS Tracker"
              />
            </div>
          )}

          {/* Vehicle Records Ledger Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Garbage Trucks & Inspection Pass Status
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {filteredVehicles.length} Trucks Listed
              </span>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="min-w-[760px] w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Truck Plate No.</th>
                    <th className="px-4 py-3">Vehicle Model & Duty</th>
                    <th className="px-4 py-3">Eco-Fuel</th>
                    <th className="px-4 py-3">Depot & Area Ward</th>
                    <th className="px-4 py-3">Driver & Mobile No.</th>
                    <th className="px-4 py-3">Total Km Driven</th>
                    <th className="px-4 py-3">Pollution Pass (PUC)</th>
                    <th className="px-4 py-3">Road Fitness Pass</th>
                    <th className="px-4 py-3 text-right">Live GPS & Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {filteredVehicles.map((v) => {
                    const plate = v.registrationNo || v.number || 'KA-03-GH-0000';
                    const ward = v.ward || v.assignedWard || 'Ward 12 Indiranagar';
                    const odo = v.odometerKm ? `${v.odometerKm.toLocaleString()} km` : '42,180 km';
                    const puc = v.pucValidTill || 'Valid (Dec 2026)';
                    const fitness = v.fitnessValidTill || v.fitnessCertValidTill || 'Valid (Oct 2027)';
                    const speed = v.speedKmH ?? v.speed ?? 18;

                    return (
                      <tr key={v.id} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                          <span className="bg-slate-950 border border-slate-700 px-2 py-0.5 rounded font-mono text-[11px] text-amber-300">
                            {plate}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-200 font-sans">{v.type}</td>
                        <td className="px-4 py-3 font-sans">
                          {v.fuelType?.includes('Electric') ? (
                            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit">
                              <BatteryCharging className="w-3 h-3 text-emerald-400" />
                              100% Electric
                            </span>
                          ) : v.fuelType?.includes('CNG') ? (
                            <span className="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit">
                              <Fuel className="w-3 h-3 text-blue-400" />
                              CNG Clean
                            </span>
                          ) : (
                            <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 w-fit">
                              <Fuel className="w-3 h-3 text-slate-400" />
                              Clean Diesel
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-sans">
                          <span className="block text-white font-medium">{v.depot || 'East Zone Depot'}</span>
                          <span className="text-[10px] text-slate-500">{ward}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 font-sans">
                          <span className="block font-medium text-white">{v.driverName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{v.driverPhone}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 font-mono">
                          {odo}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-emerald-400 font-bold text-[11px]">
                              {puc}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-slate-300 font-mono text-[11px]">
                            {fitness}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5 font-sans">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-semibold text-[11px]">
                              {v.status || 'Active'} • {speed} km/h
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SBM-Urban 2.0 Compliance Audit Certificate Modal */}
      <OfficialSbmAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        municipalStats={municipalStats}
      />
    </div>
  );
};
