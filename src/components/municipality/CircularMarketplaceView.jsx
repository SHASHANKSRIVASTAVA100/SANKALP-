import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  ShoppingBag,
  Wheat,
  Sprout,
  Coins,
  Flame,
  Truck,
  Award,
  CheckCircle2,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Building2,
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
  Share2,
  Download,
  Leaf,
  Factory,
  Scale,
  Recycle
} from 'lucide-react';

export const CircularMarketplaceView = () => {
  const {
    marketplaceProducts = [],
    farmerAgriLedger = [],
    marketplaceOrders = [],
    reusableWasteLots = [],
    buyMarketplaceProduct,
    logFarmerAgriIntake,
    procureReusableWasteLot
  } = useApp();

  // Active Sub-Tab: 'catalog' | 'reusableWaste' | 'farmerLedger' | 'orders'
  const [subTab, setSubTab] = useState('catalog');

  // Reusable Waste State & Filter
  const [wasteCategoryFilter, setWasteCategoryFilter] = useState('All');
  const [wasteSearchQuery, setWasteSearchQuery] = useState('');
  const [procureWasteModalLot, setProcureWasteModalLot] = useState(null);
  const [procureWasteTons, setProcureWasteTons] = useState(1);
  const [wasteVehicleNo, setWasteVehicleNo] = useState('KA-03-TR-9901');
  const [wasteIntendedProcess, setWasteIntendedProcess] = useState('');
  const [wasteManifestReceipt, setWasteManifestReceipt] = useState(null);

  // Category Filter & Search for Marketplace
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Farmer Ledger Search & Filter
  const [farmerSearchQuery, setFarmerSearchQuery] = useState('');
  const [farmerStateFilter, setFarmerStateFilter] = useState('All');

  // Modal States
  const [buyModalProduct, setBuyModalProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerType, setBuyerType] = useState('Commercial Contractor');
  const [buyerContact, setBuyerContact] = useState('');
  const [paymentMode, setPaymentMode] = useState('GeM / TreDS Escrow');
  const [purchaseSuccessReceipt, setPurchaseSuccessReceipt] = useState(null);

  // Farmer Intake Modal State
  const [isFarmerIntakeOpen, setIsFarmerIntakeOpen] = useState(false);
  const [farmerForm, setFarmerForm] = useState({
    farmerName: '',
    contactPhone: '',
    aadhaar: '',
    village: '',
    state: 'Punjab',
    cropResidueType: 'Paddy Straw Stubble (Parali)',
    intakeWeightTons: 10,
    ratePerKg: 6.8,
    processedProduct: 'Bio-Coal Biomass Briquettes'
  });

  // Calculate High-Level Metrics
  const metrics = useMemo(() => {
    const totalRevenue = marketplaceOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 172000;
    const totalFarmerSharePaid = farmerAgriLedger.reduce((sum, f) => sum + (f.farmerPayoutAmount || 0), 0);
    const totalStubbleDivertedTons = farmerAgriLedger.reduce((sum, f) => sum + (parseFloat(f.intakeWeightTons) || 0), 0);
    const totalPm25PreventedKg = farmerAgriLedger.reduce((sum, f) => sum + (parseFloat(f.pm25PreventedKg) || 0), 0);
    const totalCo2OffsetTons = farmerAgriLedger.reduce((sum, f) => sum + (parseFloat(f.co2OffsetTons) || 0), 0);
    const totalFarmersBenefitted = farmerAgriLedger.length + 412; // Cluster cooperatives

    return {
      totalRevenue,
      totalFarmerSharePaid,
      totalStubbleDivertedTons: totalStubbleDivertedTons.toFixed(1),
      totalPm25PreventedKg: totalPm25PreventedKg.toFixed(1),
      totalCo2OffsetTons: totalCo2OffsetTons.toFixed(1),
      totalFarmersBenefitted
    };
  }, [marketplaceOrders, farmerAgriLedger]);

  // Categories list
  const categories = [
    'All',
    'Agri-Waste Circular',
    'Plastic & Polymers',
    'C&D Recycled Materials',
    'Glass & Minerals',
    'Upcycled Consumer Goods'
  ];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter((product) => {
      const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.rawSource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.applications?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sourceCluster?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [marketplaceProducts, selectedCategory, searchQuery]);

  // Filtered Farmer Ledger
  const filteredFarmers = useMemo(() => {
    return farmerAgriLedger.filter((item) => {
      const matchesState = farmerStateFilter === 'All' || item.state === farmerStateFilter;
      const matchesSearch =
        item.farmerName?.toLowerCase().includes(farmerSearchQuery.toLowerCase()) ||
        item.village?.toLowerCase().includes(farmerSearchQuery.toLowerCase()) ||
        item.cropResidueType?.toLowerCase().includes(farmerSearchQuery.toLowerCase()) ||
        item.bankUtr?.toLowerCase().includes(farmerSearchQuery.toLowerCase());
      return matchesState && matchesSearch;
    });
  }, [farmerAgriLedger, farmerStateFilter, farmerSearchQuery]);

  const wasteCategories = [
    'All',
    'Plastic Scrap',
    'Paper & Fiber Scrap',
    'Glass Salvage',
    'Metal Scrap',
    'C&D Debris',
    'Biomass & Wood',
    'E-Waste Salvage',
    'Textile Scrap'
  ];

  // Filtered Reusable Waste Lots
  const filteredWasteLots = useMemo(() => {
    return reusableWasteLots.filter((lot) => {
      const matchesCat = wasteCategoryFilter === 'All' || lot.materialCategory === wasteCategoryFilter;
      const matchesSearch =
        lot.lotName.toLowerCase().includes(wasteSearchQuery.toLowerCase()) ||
        lot.mrfFacility.toLowerCase().includes(wasteSearchQuery.toLowerCase()) ||
        lot.reusableApplications.toLowerCase().includes(wasteSearchQuery.toLowerCase()) ||
        lot.qualityGrade.toLowerCase().includes(wasteSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [reusableWasteLots, wasteCategoryFilter, wasteSearchQuery]);

  const handleOpenProcureWasteModal = (lot) => {
    setProcureWasteModalLot(lot);
    setProcureWasteTons(lot.minProcureTons || 1);
    setBuyerName('Bangalore Eco-Fiber & Smelting Works Ltd');
    setBuyerContact('+91 98450 11982');
    setWasteVehicleNo('KA-03-TR-9901');
    setWasteIntendedProcess(lot.reusableApplications);
    setWasteManifestReceipt(null);
  };

  const handleConfirmWasteProcurement = (e) => {
    e.preventDefault();
    if (!procureWasteModalLot) return;

    const res = procureReusableWasteLot({
      lotId: procureWasteModalLot.id,
      quantityTons: procureWasteTons,
      buyerName,
      buyerType: 'Authorized Industrial Circular Recycler',
      buyerContact,
      vehicleNumber: wasteVehicleNo,
      intendedReuseProcess: wasteIntendedProcess
    });

    if (res.success) {
      setWasteManifestReceipt(res.order);
    }
  };

  // Handle Buy Product Click
  const handleOpenBuyModal = (product) => {
    setBuyModalProduct(product);
    setBuyQuantity(product.minOrder || 1);
    setBuyerName('National Thermal / Infra Consortium');
    setBuyerContact('+91 98110 44219');
    setPurchaseSuccessReceipt(null);
  };

  // Submit Order
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!buyModalProduct) return;

    const result = buyMarketplaceProduct({
      productId: buyModalProduct.id,
      quantity: buyQuantity,
      buyerName: buyerName || 'Govt / Private Enterprise Buyer',
      buyerType,
      buyerContact,
      paymentMode
    });

    if (result.success) {
      setPurchaseSuccessReceipt(result.order);
    }
  };

  // Submit Farmer Intake
  const handleFarmerIntakeSubmit = (e) => {
    e.preventDefault();
    logFarmerAgriIntake(farmerForm);
    setIsFarmerIntakeOpen(false);
    setFarmerForm({
      farmerName: '',
      contactPhone: '',
      aadhaar: '',
      village: '',
      state: 'Punjab',
      cropResidueType: 'Paddy Straw Stubble (Parali)',
      intakeWeightTons: 10,
      ratePerKg: 6.8,
      processedProduct: 'Bio-Coal Biomass Briquettes'
    });
  };

  return (
    <div className="space-y-6">
      {/* Revolutionary Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Wheat className="w-3.5 h-3.5 text-emerald-400" />
                Agri-Circular & Secondary Resource Exchange
              </span>
              <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                Guaranteed 40% Direct Farmer Profit Share (DBT)
              </span>
              <span className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                CPCB & MoHUA SBM-U 2.0 Aligned
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Municipal Circular Marketplace & Farmer Stubble-to-Wealth Portal</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Transforming agricultural residues (paddy stubble, sugarcane bagasse, crop husk) and city recycled streams (plastics, C&D aggregates, glass) into high-value commercial commodities. 
              <strong className="text-emerald-300"> 40% of all gross sales from agri-waste products are credited directly to the farmer's bank account via Aadhaar-linked DBT</strong>, permanently ending stubble burning while fueling industrial green energy!
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setIsFarmerIntakeOpen(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
            >
              <Wheat className="w-4 h-4" />
              <span>+ Log Farm Stubble Intake</span>
            </button>
            <button
              onClick={() => setSubTab('farmerLedger')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>View Farmer DBT Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Step Farmer Profit Share Architecture Flow */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            How SANKALP's 40% Farmer Agri-Circular Model Works
          </h3>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Zero Stubble Burning • Rural Economic Empowerment • Green Energy Co-firing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 border border-emerald-500/20 rounded-xl p-4 relative group hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-black text-sm mb-3">
              1
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Doorstep Farmgate Balers
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Municipal electric baling trucks collect crop stubble & bagasse from farmers' fields at zero cost to the farmer within 48h of harvest.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-cyan-500/20 rounded-xl p-4 relative group hover:border-cyan-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-sm mb-3">
              2
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-cyan-400" />
              High-Value Processing
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Residue is converted into torrefied Bio-Coal Briquettes (4,350 kcal/kg), Bio-Char Vermicompost, and 100% biodegradable bagasse tableware.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-indigo-500/20 rounded-xl p-4 relative group hover:border-indigo-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-black text-sm mb-3">
              3
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-indigo-400" />
              Industrial Marketplace Sale
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Products are sold to Thermal Power Plants (mandatory 5-10% coal co-firing), cement kilns, corporate buyers, and organic horticulturists.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-transparent rounded-xl p-4 relative group hover:border-amber-400/60 transition-all shadow-md">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-black text-sm mb-3">
              4
            </div>
            <h4 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              40% Direct Farmer DBT
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">40% of sales revenue</strong> is transferred directly to the farmer's bank account via Aadhaar/PFMS. 35% covers baling/plant ops, 25% funds city green infra!
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Counter Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Marketplace Sales
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            ₹{(metrics.totalRevenue / 100000).toFixed(2)}L
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {marketplaceOrders.length + 18} Verified B2B Orders
          </span>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 bg-gradient-to-b from-amber-950/10 to-transparent">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
            <Coins className="w-3 h-3" />
            Farmer 40% DBT Paid
          </span>
          <div className="text-xl font-black text-amber-400 font-mono mt-1">
            ₹{(metrics.totalFarmerSharePaid / 1000).toFixed(1)}k
          </div>
          <span className="text-[10px] text-amber-300/80 mt-0.5 block">
            Direct to 418 Farmers
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Stubble Diverted
          </span>
          <div className="text-xl font-black text-white font-mono mt-1">
            {metrics.totalStubbleDivertedTons} T
          </div>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">
            0 Fields Burned in Cluster
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">
            PM2.5 Smog Avoided
          </span>
          <div className="text-xl font-black text-cyan-400 font-mono mt-1">
            {metrics.totalPm25PreventedKg} kg
          </div>
          <span className="text-[10px] text-cyan-300 mt-0.5 block">
            Severe Air Quality Shield
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            CO₂ Carbon Offset
          </span>
          <div className="text-xl font-black text-indigo-400 font-mono mt-1">
            {metrics.totalCo2OffsetTons} T
          </div>
          <span className="text-[10px] text-indigo-300 mt-0.5 block">
            ISO 14064 Verified
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Catalog Products
          </span>
          <div className="text-xl font-black text-purple-400 font-mono mt-1">
            {marketplaceProducts.length} Goods
          </div>
          <span className="text-[10px] text-purple-300 mt-0.5 block">
            100% CPCB Certified
          </span>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'catalog'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Finished Recycled Goods</span>
          <span className="text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300">
            {marketplaceProducts.length} Products
          </span>
        </button>

        <button
          onClick={() => setSubTab('reusableWaste')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'reusableWaste'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Recycle className="w-4 h-4 text-cyan-300" />
          <span>Reusable Waste Procurement (MRF Lots)</span>
          <span className="text-[10px] bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/40 text-cyan-300 font-mono">
            {reusableWasteLots.length} Bulk Lots
          </span>
        </button>

        <button
          onClick={() => setSubTab('farmerLedger')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'farmerLedger'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Wheat className="w-4 h-4 text-amber-300" />
          <span>Farmer 40% DBT Payout Ledger</span>
          <span className="text-[10px] bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-300">
            {farmerAgriLedger.length} Batches
          </span>
        </button>

        <button
          onClick={() => setSubTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'orders'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Procurement Invoices & CPCB Certificates</span>
          <span className="text-[10px] bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/40 text-indigo-300">
            {marketplaceOrders.length} Orders
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: PRODUCT CATALOG & DIRECT PROCUREMENT                           */}
      {/* ========================================================================= */}
      {subTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filters and Search Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'Agri-Waste Circular' ? '🌾 Agri-Waste (40% Farmer Share)' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, bio-coal, pavers..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const farmerShareAmount = product.isAgriWaste
                ? (product.pricePerUnit * ((product.farmerSharePercent || 40) / 100)).toFixed(2)
                : 0;

              return (
                <div
                  key={product.id}
                  className={`bg-slate-900 border rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden ${
                    product.isAgriWaste
                      ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {product.isAgriWaste ? (
                        <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Wheat className="w-3 h-3 text-emerald-400" />
                          🌾 40% Direct Farmer Benefit
                        </span>
                      ) : (
                        <span className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Factory className="w-3 h-3 text-cyan-400" />
                          {product.category}
                        </span>
                      )}

                      <span className="bg-slate-950 border border-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                        Stock: {product.stock.toLocaleString('en-IN')} {product.unit}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white leading-snug mb-1.5 hover:text-emerald-300 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {product.applications}
                    </p>

                    {/* Technical & Sourcing Specs */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5 mb-4 text-[11px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">Source Feedstock:</span>
                        <span className="font-medium text-slate-200">{product.rawSource}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-500">Processing:</span>
                        <span className="font-medium text-slate-300 truncate max-w-[180px]" title={product.processingMethod}>
                          {product.processingMethod}
                        </span>
                      </div>
                      {product.sourceCluster && (
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-500">Cluster:</span>
                          <span className="font-medium text-emerald-400 truncate max-w-[180px]" title={product.sourceCluster}>
                            {product.sourceCluster}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 40% Farmer Share Highlight Box */}
                    {product.isAgriWaste && (
                      <div className="bg-gradient-to-r from-amber-950/40 via-emerald-950/40 to-slate-950 border border-amber-500/30 rounded-xl p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                            <Coins className="w-3.5 h-3.5 text-amber-400" />
                            Farmer 40% Direct Benefit:
                          </span>
                          <span className="text-xs font-black text-amber-400 font-mono">
                            ₹{farmerShareAmount} / {product.unit}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1">
                          Credited to rural farmer bank accounts via PFMS / Aadhaar on purchase confirmation.
                        </p>
                      </div>
                    )}

                    {/* Eco Impact Metrics */}
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-4">
                      <span className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono">
                        🌱 {product.co2SavedPerUnit}
                      </span>
                      {product.pm25PreventedPerUnit !== 'N/A' && (
                        <span className="bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded font-mono">
                          💨 {product.pm25PreventedPerUnit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Unit Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-white font-mono">
                          ₹{product.pricePerUnit}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">/{product.unit}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">Min: {product.minOrder} {product.unit}</span>
                    </div>

                    <button
                      onClick={() => handleOpenBuyModal(product)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Procure Bulk</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB: REUSABLE WASTE PROCUREMENT (MRF SECONDARY CONSIGNMENTS)          */}
      {/* ========================================================================= */}
      {subTab === 'reusableWaste' && (
        <div className="space-y-6">
          {/* Header Description & Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Recycle className="w-5 h-5 text-cyan-400" />
                Raw Reusable Waste Procurement Desk (MRF Secondary Consignments)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bulk segregated waste lots ready for direct reuse, industrial remanufacturing, and authorized smelting/pulping.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={wasteSearchQuery}
                  onChange={(e) => setWasteSearchQuery(e.target.value)}
                  placeholder="Search waste lots, MRF, paper, PET..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={wasteCategoryFilter}
                onChange={(e) => setWasteCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                {wasteCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Waste Lots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWasteLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-2xl relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Recycle className="w-3 h-3" />
                      {lot.materialCategory}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Lot ID: {lot.id}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-white leading-snug mb-1">
                    {lot.lotName}
                  </h4>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{lot.mrfFacility}</span>
                  </div>

                  {/* Quality & Traceability */}
                  <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5 mb-3 text-[11px]">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500">Quality Spec:</span>
                      <span className="font-medium text-slate-200 truncate max-w-[170px]" title={lot.qualityGrade}>
                        {lot.qualityGrade}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500">Intended Reuse:</span>
                      <span className="font-medium text-cyan-300 truncate max-w-[170px]" title={lot.reusableApplications}>
                        {lot.reusableApplications}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500">Weighbridge:</span>
                      <span className="font-medium text-emerald-400 truncate max-w-[170px]" title={lot.weighbridgeDepot}>
                        {lot.weighbridgeDepot}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono truncate mb-4" title={lot.traceabilityHash}>
                    Hash: {lot.traceabilityHash}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Reserve Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-white font-mono">
                        ₹{lot.reservePricePerKg ? `${lot.reservePricePerKg}/kg` : `₹${lot.pricePerTon}/Ton`}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono block">
                      Available: {lot.availableQuantityTons} Tons
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenProcureWasteModal(lot)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition-all cursor-pointer shrink-0"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Book Lot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: FARMER 40% DIRECT BENEFIT TRANSFER (DBT) LEDGER               */}
      {/* ========================================================================= */}
      {subTab === 'farmerLedger' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-400" />
                Live Agricultural Stubble Intake & Farmer DBT Disbursement Ledger
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Audited transaction record of farm residue collected, industrial processing, and 40% net revenue payout to farmers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={farmerSearchQuery}
                  onChange={(e) => setFarmerSearchQuery(e.target.value)}
                  placeholder="Search farmer, village, UTR..."
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={farmerStateFilter}
                onChange={(e) => setFarmerStateFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
              >
                <option value="All">All States</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
              </select>

              <button
                onClick={() => setIsFarmerIntakeOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <Wheat className="w-3.5 h-3.5" />
                <span>+ Log Intake</span>
              </button>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Farmer Details</th>
                    <th className="p-4">Crop Residue & Weight</th>
                    <th className="p-4">Recycled Product Output</th>
                    <th className="p-4">Gross Revenue</th>
                    <th className="p-4">
                      <span className="text-amber-400 font-bold">Farmer 40% Share (DBT)</span>
                    </th>
                    <th className="p-4">DBT Status & Bank UTR</th>
                    <th className="p-4">Clean Air Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredFarmers.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-emerald-400" />
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
                          Intake: {item.collectionDate}
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
                          Ops: ₹{item.municipalProcessingShare?.toLocaleString('en-IN')}
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
                        <div className="space-y-0.5 text-[11px]">
                          <div className="text-emerald-400 font-mono">
                            🌱 -{item.co2OffsetTons}T CO₂e
                          </div>
                          <div className="text-cyan-400 font-mono">
                            💨 -{item.pm25PreventedKg}kg PM2.5
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Zero Stubble Fire
                          </div>
                        </div>
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
      {/* SUB-TAB 3: DISPATCH & ORDER HISTORY                                       */}
      {/* ========================================================================= */}
      {subTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-indigo-400" />
                Verified Municipal Circular Procurement Orders
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Audited tax invoices and CPCB circular certificates for secondary materials sold to public and private buyers.
              </p>
            </div>
            <button
              onClick={() => setSubTab('catalog')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>+ New Procurement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketplaceOrders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">
                      {order.productName}
                    </h4>
                    <span className="text-xs text-slate-400">
                      Buyer: <strong className="text-slate-200">{order.buyerName}</strong> ({order.buyerType})
                    </span>
                  </div>

                  <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    {order.status}
                  </span>
                </div>

                {/* Amount and Breakdown */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Total Value</span>
                    <span className="text-sm font-black text-white font-mono">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold block">Farmer 40%</span>
                    <span className="text-sm font-black text-amber-300 font-mono">
                      ₹{order.farmerProfitShare40?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Qty Procured</span>
                    <span className="text-sm font-bold text-slate-300 font-mono">
                      {order.quantity} {order.unit}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>Certificate: <strong className="text-slate-300 font-mono">{order.cpcbCertificateNo}</strong></span>
                  <span>Payment: <strong className="text-slate-300">{order.paymentMode}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: BUY / PROCURE RECYCLED GOODS                                    */}
      {/* ========================================================================= */}
      {buyModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setBuyModalProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!purchaseSuccessReceipt ? (
              <form onSubmit={handleConfirmOrder} className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Circular Economy Procurement Desk
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {buyModalProduct.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      Available Stock: {buyModalProduct.stock} {buyModalProduct.unit}
                    </span>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Order Quantity ({buyModalProduct.unit})</span>
                    <span className="text-slate-400 font-normal">Min: {buyModalProduct.minOrder} {buyModalProduct.unit}</span>
                  </label>
                  <input
                    type="number"
                    min={buyModalProduct.minOrder || 1}
                    max={buyModalProduct.stock}
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Buyer Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Procuring Organization</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. NTPC / Infra Contractor / Citizen"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Contact / Email</label>
                    <input
                      type="text"
                      value={buyerContact}
                      onChange={(e) => setBuyerContact(e.target.value)}
                      placeholder="Phone or Email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Payment Gateway Mode */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Settlement Channel</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="GeM / TreDS Escrow">GeM Portal / TreDS Escrow (Govt/PSU)</option>
                    <option value="Corporate NetBanking">Corporate NetBanking / RTGS</option>
                    <option value="UPI Direct">UPI Direct / Citizen Digital Pay</option>
                    <option value="Municipal Treasury Transfer">Municipal Urban Local Body Treasury</option>
                  </select>
                </div>

                {/* Dynamic Price & Profit Share Breakdown Box */}
                {(() => {
                  const subtotal = Math.round(buyModalProduct.pricePerUnit * buyQuantity);
                  const farmer40 = buyModalProduct.isAgriWaste
                    ? Math.round(subtotal * ((buyModalProduct.farmerSharePercent || 40) / 100))
                    : 0;
                  const municipalShare = subtotal - farmer40;

                  return (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                        <span>Unit Rate:</span>
                        <span className="font-mono font-bold">₹{buyModalProduct.pricePerUnit} / {buyModalProduct.unit}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm font-bold text-white">
                        <span>Total Invoice Amount:</span>
                        <span className="font-mono text-base text-emerald-400">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>

                      {buyModalProduct.isAgriWaste && (
                        <div className="bg-gradient-to-r from-amber-950/50 to-emerald-950/50 border border-amber-500/40 rounded-xl p-3 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                            <span className="flex items-center gap-1">
                              <Coins className="w-3.5 h-3.5 text-amber-400" />
                              Guaranteed 40% Farmer Direct Share:
                            </span>
                            <span className="font-mono text-sm text-amber-400">₹{farmer40.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-relaxed">
                            Will be disbursed directly to {buyModalProduct.sourceCluster} via PFMS / Aadhaar payment bridge upon order confirmation.
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Municipal Processing & Logistics (60%):</span>
                        <span className="font-mono">₹{municipalShare.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorize Procurement & Disburse Farmer Share</span>
                </button>
              </form>
            ) : (
              /* Success Receipt View */
              <div className="space-y-5 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <FileCheck className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Procurement Verified & Dispatched
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Invoice #{purchaseSuccessReceipt.id}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    CPCB Circular Certificate: <strong className="text-slate-200 font-mono">{purchaseSuccessReceipt.cpcbCertificateNo}</strong>
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Product:</span>
                    <span className="font-semibold text-white">{purchaseSuccessReceipt.productName}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Quantity:</span>
                    <span className="font-mono">{purchaseSuccessReceipt.quantity} {purchaseSuccessReceipt.unit}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Gross Total:</span>
                    <span className="font-mono font-bold text-white">₹{purchaseSuccessReceipt.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  {purchaseSuccessReceipt.farmerProfitShare40 > 0 && (
                    <div className="flex justify-between text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30">
                      <span className="font-bold flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" />
                        Farmer 40% DBT Paid:
                      </span>
                      <span className="font-mono font-black">₹{purchaseSuccessReceipt.farmerProfitShare40?.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>Beneficiary:</span>
                    <span className="text-slate-300">{purchaseSuccessReceipt.farmerBeneficiaryCluster}</span>
                  </div>
                </div>

                <button
                  onClick={() => setBuyModalProduct(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: LOG NEW FARMER AGRI-WASTE INTAKE                                */}
      {/* ========================================================================= */}
      {isFarmerIntakeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsFarmerIntakeOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Farm Stubble Intake & Direct Benefit Transfer
                </span>
                <h3 className="text-lg font-black text-white leading-tight">
                  Log New Farm Stubble / Residue Truckload
                </h3>
                <p className="text-xs text-slate-400">
                  Register farmgate baler intake and issue 40% guaranteed profit share.
                </p>
              </div>
            </div>

            <form onSubmit={handleFarmerIntakeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Farmer Full Name</label>
                  <input
                    type="text"
                    value={farmerForm.farmerName}
                    onChange={(e) => setFarmerForm({ ...farmerForm, farmerName: e.target.value })}
                    placeholder="e.g. Jaswinder Singh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Contact Phone</label>
                  <input
                    type="text"
                    value={farmerForm.contactPhone}
                    onChange={(e) => setFarmerForm({ ...farmerForm, contactPhone: e.target.value })}
                    placeholder="+91 98000 XXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Aadhaar (Last 4 digits)</label>
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
                  <label className="text-xs font-semibold text-slate-300">Village / Tehsil</label>
                  <input
                    type="text"
                    value={farmerForm.village}
                    onChange={(e) => setFarmerForm({ ...farmerForm, village: e.target.value })}
                    placeholder="e.g. Samana, Patiala"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">State</label>
                  <select
                    value={farmerForm.state}
                    onChange={(e) => setFarmerForm({ ...farmerForm, state: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Crop Residue Type</label>
                  <select
                    value={farmerForm.cropResidueType}
                    onChange={(e) => setFarmerForm({ ...farmerForm, cropResidueType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Paddy Straw Stubble (Parali)">Paddy Straw Stubble (Parali)</option>
                    <option value="Sugarcane Bagasse & Field Tops">Sugarcane Bagasse & Field Tops</option>
                    <option value="Wheat Straw Biomass">Wheat Straw Biomass</option>
                    <option value="Mustard Stalks & Husk">Mustard Stalks & Husk</option>
                    <option value="Cotton Stalk Residue">Cotton Stalk Residue</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Weight (Metric Tons)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={farmerForm.intakeWeightTons}
                    onChange={(e) => setFarmerForm({ ...farmerForm, intakeWeightTons: parseFloat(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Dynamic Live Benefit Transfer Preview */}
              {(() => {
                const tons = parseFloat(farmerForm.intakeWeightTons) || 10;
                const rate = parseFloat(farmerForm.ratePerKg) || 6.8;
                const gross = Math.round(tons * 1000 * rate);
                const farmerShare = Math.round(gross * 0.40);
                const pm25Prevented = (tons * 9.2).toFixed(1);

                return (
                  <div className="bg-gradient-to-r from-amber-950/40 to-emerald-950/40 border border-amber-500/40 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Total Gross Value (at ₹{rate}/kg):</span>
                      <span className="font-mono font-bold text-white">₹{gross.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-bold text-amber-300">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-400" />
                        Farmer 40% Direct Bank Transfer:
                      </span>
                      <span className="font-mono text-base text-amber-400 font-black">
                        ₹{farmerShare.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-[11px] text-emerald-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <span>Air Pollution Avoided:</span>
                      <span className="font-mono font-bold">-{pm25Prevented} kg PM2.5 (0 burning)</span>
                    </div>
                  </div>
                );
              })()}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-700/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize Intake & Disburse 40% Farmer DBT</span>
              </button>
            </form>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL 3: PROCURE REUSABLE WASTE LOT & ISSUE CPCB GATE PASS               */}
      {/* ========================================================================= */}
      {procureWasteModalLot && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setProcureWasteModalLot(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {!wasteManifestReceipt ? (
              <form onSubmit={handleConfirmWasteProcurement} className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                    <Recycle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                      Municipal MRF Secondary Consignment Desk
                    </span>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {procureWasteModalLot.lotName}
                    </h3>
                    <span className="text-xs text-slate-400">
                      Depot: {procureWasteModalLot.mrfFacility} • Scale: {procureWasteModalLot.weighbridgeDepot}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Procurement Consignment Tonnage</span>
                    <span className="text-slate-400 font-normal">
                      Available: {procureWasteModalLot.availableQuantityTons} Tons (Min: {procureWasteModalLot.minProcureTons} T)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min={procureWasteModalLot.minProcureTons || 1}
                    max={procureWasteModalLot.availableQuantityTons}
                    value={procureWasteTons}
                    onChange={(e) => setProcureWasteTons(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Authorized Recycler / Mill</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Eco-Fiber Mills Ltd"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Transport Vehicle Number</label>
                    <input
                      type="text"
                      value={wasteVehicleNo}
                      onChange={(e) => setWasteVehicleNo(e.target.value)}
                      placeholder="KA-04-TR-1234"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Intended Circular Reuse Process</label>
                  <input
                    type="text"
                    value={wasteIntendedProcess}
                    onChange={(e) => setWasteIntendedProcess(e.target.value)}
                    placeholder="e.g. Bottle-to-bottle pelletizing, Kraft paperboard pulp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                {/* Price Calculation Box */}
                {(() => {
                  const ratePerTon = procureWasteModalLot.pricePerTon || Math.round((procureWasteModalLot.reservePricePerKg || 25) * 1000);
                  const total = Math.round(ratePerTon * procureWasteTons);

                  return (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Reserve Rate:</span>
                        <span className="font-mono">₹{ratePerTon.toLocaleString('en-IN')} / Metric Ton</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Weighbridge Loading Fee:</span>
                        <span className="font-mono text-emerald-400">Included (Free Municipal Weighing)</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                        <span>Total Consignment Amount:</span>
                        <span className="font-mono text-base text-cyan-400">₹{total.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pt-1">
                        CPCB Form-6 Waste Consignment Manifest & Weighbridge Gate Pass will be generated instantly.
                      </p>
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-700/30 transition-all cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Book Consignment & Issue Weighbridge Pass</span>
                </button>
              </form>
            ) : (
              /* Success Manifest Receipt */
              <div className="space-y-5 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 mx-auto">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Weighbridge Gate Pass & CPCB Manifest Issued
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Manifest #{wasteManifestReceipt.id}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    CPCB Certificate: {wasteManifestReceipt.cpcbCertificateNo}
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Material Lot:</span>
                    <span className="font-semibold text-white truncate max-w-[240px]">{wasteManifestReceipt.productName}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Consignment:</span>
                    <span className="font-mono">{wasteManifestReceipt.quantity} Tons</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Truck Assigned:</span>
                    <span className="font-mono text-cyan-400">{wasteManifestReceipt.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Total Invoice:</span>
                    <span className="font-mono font-bold text-white">₹{wasteManifestReceipt.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Weighbridge Scale:</span>
                    <span className="text-slate-300">{wasteManifestReceipt.weighbridgeDepot}</span>
                  </div>
                </div>

                <button
                  onClick={() => setProcureWasteModalLot(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
