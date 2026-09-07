import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  ShoppingBag,
  Truck,
  Award,
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
  Receipt,
  Download,
  Factory,
  Scale,
  Recycle,
  Building2
} from 'lucide-react';

export const CircularMarketplaceView = () => {
  const {
    marketplaceProducts = [],
    marketplaceOrders = [],
    reusableWasteLots = [],
    buyMarketplaceProduct,
    procureReusableWasteLot
  } = useApp();

  // Active Sub-Tab: 'finished' | 'reusableWaste' | 'orders'
  const [subTab, setSubTab] = useState('finished');

  // Category Filter & Search for Finished Goods
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Reusable Waste State & Filter
  const [wasteCategoryFilter, setWasteCategoryFilter] = useState('All');
  const [wasteSearchQuery, setWasteSearchQuery] = useState('');
  const [procureWasteModalLot, setProcureWasteModalLot] = useState(null);
  const [procureWasteTons, setProcureWasteTons] = useState(1);
  const [wasteVehicleNo, setWasteVehicleNo] = useState('KA-03-TR-9901');
  const [wasteIntendedProcess, setWasteIntendedProcess] = useState('');
  const [wasteManifestReceipt, setWasteManifestReceipt] = useState(null);

  // Buy Finished Product Modal State
  const [buyModalProduct, setBuyModalProduct] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerType, setBuyerType] = useState('Commercial Contractor');
  const [buyerContact, setBuyerContact] = useState('');
  const [paymentMode, setPaymentMode] = useState('GeM / TreDS Escrow');
  const [purchaseSuccessReceipt, setPurchaseSuccessReceipt] = useState(null);

  // Metrics
  const metrics = useMemo(() => {
    const totalRevenue = marketplaceOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 172000;
    const totalWasteAvailableTons = reusableWasteLots.reduce((sum, l) => sum + (parseFloat(l.availableQuantityTons) || 0), 0);
    const totalOrdersCompleted = marketplaceOrders.length + 18;

    return {
      totalRevenue,
      totalWasteAvailableTons: totalWasteAvailableTons.toFixed(1),
      totalOrdersCompleted,
      totalFinishedProducts: marketplaceProducts.length,
      totalWasteLots: reusableWasteLots.length
    };
  }, [marketplaceOrders, reusableWasteLots, marketplaceProducts]);

  // Categories list
  const finishedCategories = [
    'All',
    'Agri-Waste Circular',
    'Plastic & Polymers',
    'C&D Recycled Materials',
    'Glass & Minerals',
    'Upcycled Consumer Goods'
  ];

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

  // Filtered Finished Products
  const filteredProducts = useMemo(() => {
    return marketplaceProducts.filter((product) => {
      const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.rawSource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.applications?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [marketplaceProducts, selectedCategory, searchQuery]);

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

  // Buy Finished Product
  const handleOpenBuyModal = (product) => {
    setBuyModalProduct(product);
    setBuyQuantity(product.minOrder || 1);
    setBuyerName('National Infrastructure / Corporate Buyer');
    setBuyerContact('+91 98110 44219');
    setPurchaseSuccessReceipt(null);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!buyModalProduct) return;

    const result = buyMarketplaceProduct({
      productId: buyModalProduct.id,
      quantity: buyQuantity,
      buyerName: buyerName || 'Enterprise Buyer',
      buyerType,
      buyerContact,
      paymentMode
    });

    if (result.success) {
      setPurchaseSuccessReceipt(result.order);
    }
  };

  // Procure Waste Lot
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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Store className="w-3.5 h-3.5 text-emerald-400" />
                Municipal Circular Marketplace & Secondary Resource Exchange
              </span>
              <span className="bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                Certified Reusable Materials & Recycled Goods
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Circular Economy Marketplace & Reusable Waste Desk
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official municipal trading platform connecting certified recyclers, government agencies, infrastructure contractors, and citizens. Procure <strong>finished eco-products</strong> (bio-coal briquettes, pavers, compost, tableware) or <strong>bulk reusable waste lots</strong> (baled PET, OCC cardboard, glass, scrap metals) directly from municipal Material Recovery Facilities.
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setSubTab('finished')}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Finished Goods</span>
            </button>
            <button
              onClick={() => setSubTab('reusableWaste')}
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-700/30 transition-all cursor-pointer"
            >
              <Recycle className="w-4 h-4" />
              <span>Procure Raw Waste Lots</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Marketplace Revenue
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            ₹{(metrics.totalRevenue / 100000).toFixed(2)}L
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {metrics.totalOrdersCompleted} Verified Dispatches
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Finished Goods
          </span>
          <div className="text-xl font-black text-white font-mono mt-1">
            {metrics.totalFinishedProducts} Products
          </div>
          <span className="text-[10px] text-emerald-400 mt-0.5 block">
            100% Circular Certified
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Reusable Waste Available
          </span>
          <div className="text-xl font-black text-cyan-400 font-mono mt-1">
            {metrics.totalWasteAvailableTons} Tons
          </div>
          <span className="text-[10px] text-cyan-300 mt-0.5 block">
            Across 8 Municipal MRFs
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Waste Lots Listed
          </span>
          <div className="text-xl font-black text-purple-400 font-mono mt-1">
            {metrics.totalWasteLots} Bulk Lots
          </div>
          <span className="text-[10px] text-purple-300 mt-0.5 block">
            Weighbridge Gate Pass Ready
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            CPCB Compliance
          </span>
          <div className="text-xl font-black text-amber-400 font-mono mt-1">
            Form-6 Manifest
          </div>
          <span className="text-[10px] text-amber-300 mt-0.5 block">
            Digital Cryptographic Audit
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSubTab('finished')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            subTab === 'finished'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Finished Recycled Goods</span>
          <span className="text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 text-emerald-300 font-mono">
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
          <span>Reusable Waste Procurement (MRF Secondary Consignments)</span>
          <span className="text-[10px] bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/40 text-cyan-300 font-mono">
            {reusableWasteLots.length} Bulk Lots
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
          <span>Procurement Invoices & CPCB Gate Passes</span>
          <span className="text-[10px] bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/40 text-indigo-300 font-mono">
            {marketplaceOrders.length} Orders
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: FINISHED RECYCLED GOODS                                       */}
      {/* ========================================================================= */}
      {subTab === 'finished' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {finishedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 flex flex-col justify-between transition-all hover:shadow-2xl hover:scale-[1.01] relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Factory className="w-3 h-3 text-emerald-400" />
                      {product.category}
                    </span>

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
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-4">
                    <span className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono">
                      🌱 {product.co2SavedPerUnit}
                    </span>
                  </div>
                </div>

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
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: REUSABLE RAW WASTE PROCUREMENT (MRF SECONDARY CONSIGNMENTS)   */}
      {/* ========================================================================= */}
      {subTab === 'reusableWaste' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Recycle className="w-5 h-5 text-cyan-400" />
                Raw Reusable Waste Procurement Lots (Material Recovery Facilities)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bulk segregated secondary materials ready for factory remanufacturing, paperboard pulping, and metal smelting.
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
      {/* SUB-TAB 3: ORDERS & CPCB GATE PASSES                                      */}
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
              onClick={() => setSubTab('finished')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
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

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Total Value</span>
                    <span className="text-sm font-black text-white font-mono">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Qty Procured</span>
                    <span className="text-sm font-bold text-slate-300 font-mono">
                      {order.quantity} {order.unit}
                    </span>
                  </div>
                </div>

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
      {/* MODAL 1: BUY FINISHED PRODUCT                                            */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Procuring Organization</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Infrastructure Contractor / Citizen"
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

                {(() => {
                  const subtotal = Math.round(buyModalProduct.pricePerUnit * buyQuantity);

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
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Procurement Order</span>
                </button>
              </form>
            ) : (
              <div className="space-y-5 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <FileCheck className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Procurement Confirmed
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Invoice #{purchaseSuccessReceipt.id}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    CPCB Certificate: <strong className="text-slate-200 font-mono">{purchaseSuccessReceipt.cpcbCertificateNo}</strong>
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
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-mono font-bold text-white">₹{purchaseSuccessReceipt.totalAmount?.toLocaleString('en-IN')}</span>
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
      {/* MODAL 2: PROCURE REUSABLE WASTE LOT                                      */}
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

                {(() => {
                  const ratePerTon = procureWasteModalLot.pricePerTon || Math.round((procureWasteModalLot.reservePricePerKg || 25) * 1000);
                  const total = Math.round(ratePerTon * procureWasteTons);

                  return (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Reserve Rate:</span>
                        <span className="font-mono">₹{ratePerTon.toLocaleString('en-IN')} / Metric Ton</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                        <span>Total Consignment Amount:</span>
                        <span className="font-mono text-base text-cyan-400">₹{total.toLocaleString('en-IN')}</span>
                      </div>
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
