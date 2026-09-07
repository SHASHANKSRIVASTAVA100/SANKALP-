import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_COMPLAINTS,
  INITIAL_WORKERS,
  INITIAL_VEHICLES,
  INITIAL_HOTSPOTS,
  CITIZEN_LEADERBOARD,
  EPR_COMPANIES,
  INITIAL_RECYCLERS,
  MUNICIPAL_TECHNOLOGY_REGISTRY,
  MUNICIPAL_WASTE_STATS,
  INITIAL_MARKETPLACE_PRODUCTS,
  INITIAL_FARMER_AGRI_LEDGER,
  INITIAL_MARKETPLACE_ORDERS
} from '../data/mockData';
import { TRANSLATIONS } from '../i18n/translations';
import { apiClient } from '../services/api';
import {
  sanitizeComplaints,
  getValidPhotoUrl,
  REAL_WASTE_FALLBACK,
  REAL_CLEAN_FALLBACK
} from '../utils/photoUtils';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current Authenticated User (null means user is at Login Gateway)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('swachhta_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Active Persona / Role: strictly synced with currentUser?.role
  const [role, setRole] = useState(() => {
    if (currentUser?.role) return currentUser.role;
    return 'citizen';
  });

  // Active Multilingual Language: 'en' | 'hi' | 'kn' | 'ta' | 'te'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('swachhta_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('swachhta_language', lang);
  };

  // Translation helper
  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  // Active Ward Filter
  const [wardFilter, setWardFilter] = useState('All Wards');

  // Active Worker ID when in worker role
  const [activeWorkerId, setActiveWorkerId] = useState(() => {
    return currentUser?.role === 'worker' ? currentUser.id : 'WRK-01';
  });

  // Complaints State (v5 with authentic street waste & clean curb photography)
  const [complaints, setComplaints] = useState(() => {
    try {
      localStorage.removeItem('sih_waste_complaints');
      localStorage.removeItem('sih_waste_workers');
    } catch (e) {}

    const saved = localStorage.getItem('swachhta_sangam_complaints_v5');
    const parsed = saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    return sanitizeComplaints(parsed);
  });

  // Workers State
  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('swachhta_sangam_workers_v5');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  // Vehicles Fleet State
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('swachhta_sangam_vehicles_v5');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  // Hotspots State
  const [hotspots, setHotspots] = useState(() => {
    const saved = localStorage.getItem('swachhta_sangam_hotspots_v5');
    return saved ? JSON.parse(saved) : INITIAL_HOTSPOTS;
  });

  // Citizen Gamification State
  const [citizenPoints, setCitizenPoints] = useState(() => {
    const saved = localStorage.getItem('swachhta_citizen_points');
    return saved ? parseInt(saved, 10) : 650;
  });

  // Municipality State
  const [recyclers, setRecyclers] = useState(INITIAL_RECYCLERS);
  const [technologies, setTechnologies] = useState(MUNICIPAL_TECHNOLOGY_REGISTRY);
  const [municipalStats, setMunicipalStats] = useState(MUNICIPAL_WASTE_STATS);

  // Municipal Marketplace & 40% Farmer Agri-Circular State
  const [marketplaceProducts, setMarketplaceProducts] = useState(() => {
    const saved = localStorage.getItem('swachhta_marketplace_products_v1');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_PRODUCTS;
  });

  const [farmerAgriLedger, setFarmerAgriLedger] = useState(() => {
    const saved = localStorage.getItem('swachhta_farmer_agri_ledger_v1');
    return saved ? JSON.parse(saved) : INITIAL_FARMER_AGRI_LEDGER;
  });

  const [marketplaceOrders, setMarketplaceOrders] = useState(() => {
    const saved = localStorage.getItem('swachhta_marketplace_orders_v1');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('swachhta_marketplace_products_v1', JSON.stringify(marketplaceProducts));
  }, [marketplaceProducts]);

  useEffect(() => {
    localStorage.setItem('swachhta_farmer_agri_ledger_v1', JSON.stringify(farmerAgriLedger));
  }, [farmerAgriLedger]);

  useEffect(() => {
    localStorage.setItem('swachhta_marketplace_orders_v1', JSON.stringify(marketplaceOrders));
  }, [marketplaceOrders]);

  // Dual Engine View Mode: 'website' (Desktop Portal) | 'app' (Mobile Simulator)
  const [viewMode, setViewModeState] = useState(() => {
    return localStorage.getItem('swachhta_view_mode') || 'website';
  });

  const setViewMode = (mode) => {
    setViewModeState(mode);
    localStorage.setItem('swachhta_view_mode', mode);
  };

  // PWA Install Modal State
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState(() => [
    {
      id: "notif-1",
      title: "Garbage Truck Nearby!",
      message: "Vehicle #KA-03-GH-1102 is within 280m of your location. Expected in 3 minutes.",
      time: "Just now",
      type: "radar",
      read: false
    },
    {
      id: "notif-2",
      title: "Complaint Assigned",
      message: "Worker Ramesh Kumar assigned to CMP-2026-108.",
      time: "25m ago",
      type: "worker",
      read: true
    }
  ]);

  // Active Modal States
  const [activeModal, setActiveModal] = useState(null);

  // Sync Initial State with Live Backend Server (Local Development Only with instant timeout)
  useEffect(() => {
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal) return; // On production (e.g. Vercel), load state instantly with 0 delay

    const syncBackend = async () => {
      try {
        const [backendComplaints, backendWorkers, backendVehicles] = await Promise.all([
          apiClient.complaints.getAll().catch(() => null),
          apiClient.workers.getAll().catch(() => null),
          apiClient.fleet.getAll().catch(() => null)
        ]);
        if (backendComplaints && backendComplaints.length > 0) {
          setComplaints(sanitizeComplaints(backendComplaints));
        }
        if (backendWorkers && backendWorkers.length > 0) {
          setWorkers(backendWorkers);
        }
        if (backendVehicles && backendVehicles.length > 0) {
          setVehicles(backendVehicles);
        }
      } catch (err) {
        console.log('Using local fallback state:', err);
      }
    };
    syncBackend();
  }, []);

  // Connect to Live WebSocket RTK GPS Telematics Stream (Local Development Only)
  useEffect(() => {
    const isLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    if (!isLocal) return;

    let ws;
    try {
      const wsUrl = `ws://${window.location.hostname}:5000`;
      ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'GPS_TELEMETRY_TICK' && payload.vehicles) {
            setVehicles(payload.vehicles);
          }
        } catch (e) {}
      };
    } catch (e) {
      console.warn("WebSocket telematics fallback active");
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  // Persist State to LocalStorage (v5)
  useEffect(() => {
    localStorage.setItem('swachhta_sangam_complaints_v5', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('swachhta_sangam_workers_v5', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('swachhta_sangam_vehicles_v5', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('swachhta_sangam_hotspots_v5', JSON.stringify(hotspots));
  }, [hotspots]);

  useEffect(() => {
    localStorage.setItem('swachhta_citizen_points', citizenPoints.toString());
  }, [citizenPoints]);

  // Web Audio Chime Generator
  const playChime = (type = 'success') => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(330, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio playback not permitted yet by browser gesture:", e);
    }
  };

  // Add Notification
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: "notif-" + Date.now(),
      title,
      message,
      time: "Just now",
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    playChime(type === 'alert' ? 'alert' : 'success');
  };

  // User Login Action
  const login = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('swachhta_current_user', JSON.stringify(userObj));
    setRole(userObj.role);
    if (userObj.role === 'worker') {
      setActiveWorkerId(userObj.id || 'WRK-01');
    }
    if (userObj.ward) {
      setWardFilter(userObj.ward);
    }
    playChime('success');
    addNotification(`Welcome, ${userObj.name}!`, `Authenticated as ${userObj.role.toUpperCase()}.`, 'success');
  };

  // User Logout Action
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('swachhta_current_user');
    playChime('info');
    addNotification('Logged Out', 'You have securely signed out of Swachhta Sangam.', 'info');
  };

  // Citizen: Add Complaint with Backend API Sync
  const addComplaint = async (complaintData) => {
    const uniqueSuffix = Math.floor(200 + Math.random() * 800);
    const newId = `CMP-2026-${uniqueSuffix}`;
    const sanitizedBeforeImage = getValidPhotoUrl(complaintData.beforeImage, REAL_WASTE_FALLBACK);
    const newRecord = {
      id: newId,
      ...complaintData,
      beforeImage: sanitizedBeforeImage,
      reportedAt: new Date().toISOString(),
      status: "pending",
      assignedWorkerId: null,
      assignedWorkerName: null,
      assignedTeam: null,
      afterImage: null,
      collectedWeightKg: null,
      mrfDestination: null,
      supervisorNotes: null,
      supervisorRating: null,
      sosAlert: null
    };

    setComplaints(prev => [newRecord, ...prev]);
    addNotification("Complaint Registered", `Ticket ${newId} logged with AI analysis. Dispatched to Ward Control Room.`, "info");

    // Async sync with backend
    apiClient.complaints.report({ ...complaintData, customImageUrl: sanitizedBeforeImage });
    return newRecord;
  };

  // Supervisor: Assign Worker with Backend API Sync
  const assignWorker = (complaintId, workerId) => {
    const worker = workers.find(w => w.id === workerId);
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: "in_progress",
          assignedWorkerId: workerId,
          assignedWorkerName: worker?.name || "Sanitation Hero",
          assignedTeam: worker?.team || "Ward Squad"
        };
      }
      return c;
    }));

    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, activeTasksCount: (w.activeTasksCount || 0) + 1 };
      }
      return w;
    }));

    addNotification("Worker Dispatched", `${worker?.name} assigned to task ${complaintId}.`, "worker");
    apiClient.complaints.assign(complaintId, workerId);
  };

  // Worker: Upload Evidence with Backend API Sync
  const uploadEvidence = (complaintId, afterImage, weightKg, mrfDestination) => {
    const verifiedCleanPhoto = getValidPhotoUrl(afterImage, REAL_CLEAN_FALLBACK);

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: "awaiting_verification",
          afterImage: verifiedCleanPhoto,
          collectedWeightKg: Number(weightKg) || 45,
          mrfDestination: mrfDestination || "Municipal MRF Unit #12"
        };
      }
      return c;
    }));

    setWorkers(prev => prev.map(w => {
      if (w.id === activeWorkerId) {
        return {
          ...w,
          completedToday: (w.completedToday || 0) + 1,
          totalKgClearedToday: (w.totalKgClearedToday || 0) + (Number(weightKg) || 45),
          earningsToday: (w.earningsToday || 0) + 250,
          activeTasksCount: Math.max(0, (w.activeTasksCount || 1) - 1)
        };
      }
      return w;
    }));

    addNotification(
      "Evidence Submitted",
      `Cleaning evidence uploaded for ${complaintId}. Ready for Citizen & Supervisor verification!`,
      "success"
    );

    apiClient.complaints.uploadEvidence(complaintId, {
      afterImageUrl: verifiedCleanPhoto,
      weightKg,
      mrfDestination,
      workerId: activeWorkerId
    });
  };

  // Worker: Supervisor SOS Blocker Request with Backend API Sync
  const reportWorkerSos = (complaintId, reason, notes) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          priority: "critical",
          sosAlert: {
            reason,
            notes,
            reportedAt: new Date().toISOString()
          }
        };
      }
      return c;
    }));

    addNotification(
      "EMERGENCY BLOCKER ALERT",
      `Worker reported blocker on ${complaintId}: ${reason}. Requires Supervisor intervention!`,
      "alert"
    );

    apiClient.complaints.reportSos(complaintId, reason, notes);
  };

  // Clear SOS Alert with Backend API Sync
  const resolveSos = (complaintId) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return { ...c, sosAlert: null };
      }
      return c;
    }));
    addNotification("SOS Resolved", `Blocker for ${complaintId} marked resolved.`, "info");
    apiClient.complaints.resolveSos(complaintId);
  };

  // Citizen: Confirm Verification & Claim Green Points with Backend API Sync
  const citizenConfirm = (complaintId, rating = 5) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: "verified",
          reportedBy: {
            ...c.reportedBy,
            isCitizenVerified: true,
            citizenRating: rating
          }
        };
      }
      return c;
    }));

    setCitizenPoints(prev => prev + 50);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    addNotification("Points Earned! 🎉", "+50 Citizen Green Points awarded for verifying clean site!", "success");
    apiClient.complaints.verifyCitizen(complaintId, rating);
  };

  // Supervisor: Audit Action with Backend API Sync
  const supervisorAction = (complaintId, action, rating = 5, notes = "") => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        if (action === 'approve') {
          return {
            ...c,
            status: "verified",
            supervisorRating: rating,
            supervisorNotes: notes || "Approved on site audit."
          };
        } else if (action === 'rework') {
          return {
            ...c,
            status: "in_progress",
            supervisorNotes: notes || "Re-cleaning requested by supervisor."
          };
        } else if (action === 'ground_inspect') {
          return {
            ...c,
            supervisorNotes: notes || "Ground sanitary officer dispatched for manual inspection."
          };
        }
      }
      return c;
    }));

    if (action === 'approve') {
      confetti({ particleCount: 50, spread: 60 });
      addNotification("Complaint Closed", `Ticket ${complaintId} verified and approved. Worker rated ${rating}★.`, "success");
    } else {
      addNotification("Status Updated", `Action ${action} recorded for ticket ${complaintId}.`, "info");
    }

    apiClient.complaints.auditSupervisor(complaintId, action, rating, notes);
  };

  // Worker Attendance Toggle with Backend API Sync
  const toggleAttendance = (workerId) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const nextState = w.attendance === 'punched_in' ? 'punched_out' : 'punched_in';
        return {
          ...w,
          attendance: nextState,
          punchInTime: nextState === 'punched_in' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
        };
      }
      return w;
    }));
    playChime();
    apiClient.workers.punchAttendance(workerId);
  };

  // Hotspot Action Trigger
  const triggerHotspotAction = (hotspotId, interventionId) => {
    setHotspots(prev => prev.map(h => {
      if (h.id === hotspotId) {
        return {
          ...h,
          recommendedInterventions: h.recommendedInterventions?.map(i => {
            if (i.id === interventionId) {
              return { ...i, status: i.status === 'active' ? 'completed' : 'active' };
            }
            return i;
          })
        };
      }
      return h;
    }));
    addNotification("Municipal Action Deployed", `Intervention dispatched for hotspot ${hotspotId}.`, "success");
  };

  // Buy Marketplace Recycled Goods (Supports 40% Farmer Direct Profit Share)
  const buyMarketplaceProduct = ({ productId, quantity, buyerName, buyerType, buyerContact, paymentMode }) => {
    const product = marketplaceProducts.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found' };

    const qty = parseInt(quantity, 10) || product.minOrder || 1;
    if (product.stock < qty) {
      addNotification("Insufficient Stock", `Only ${product.stock} ${product.unit} available.`, "warning");
      return { success: false, message: 'Insufficient stock' };
    }

    const totalAmount = Math.round(product.pricePerUnit * qty);
    const farmerProfitShare40 = product.isAgriWaste 
      ? Math.round(totalAmount * ((product.farmerSharePercent || 40) / 100))
      : 0;
    const municipalShare60 = totalAmount - farmerProfitShare40;

    // Deduct stock
    setMarketplaceProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, p.stock - qty) };
      }
      return p;
    }));

    const orderId = `ORD-MKT-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: orderId,
      timestamp: "Just now",
      buyerName: buyerName || "Municipal Contractor / Citizen Buyer",
      buyerType: buyerType || "Commercial / Municipal",
      buyerContact: buyerContact || "+91 98000 12345",
      productId: product.id,
      productName: product.name,
      quantity: qty,
      unit: product.unit,
      totalAmount,
      farmerProfitShare40,
      farmerBeneficiaryCluster: product.sourceCluster || "Local Farmer Cooperative",
      municipalShare60,
      status: "Confirmed & Dispatched",
      cpcbCertificateNo: `CPCB-CIRC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentMode: paymentMode || "UPI / GeM Escrow",
      hashSha256: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
    };

    setMarketplaceOrders(prev => [newOrder, ...prev]);

    // If it's an agricultural waste product, also log direct benefit transfer payout to farmer
    if (product.isAgriWaste && farmerProfitShare40 > 0) {
      const dbtEntry = {
        id: `AGRI-DBT-${Date.now().toString().slice(-6)}`,
        farmerName: product.sourceCluster.split(',')[0] || "Farmer Cooperative Cluster",
        farmerId: `FAR-COOP-${Math.floor(1000 + Math.random() * 9000)}`,
        contactPhone: "+91 98142 XXXXX",
        aadhaarMasked: "XXXX-XXXX-9901",
        village: product.sourceCluster,
        state: "National Agri-Cluster",
        cropResidueType: product.rawSource,
        intakeWeightTons: (qty / 1000).toFixed(2),
        collectionDate: "Today",
        processedProduct: product.name,
        unitsProduced: `${qty} ${product.unit}`,
        marketGrossRevenue: totalAmount,
        farmerSharePercent: 40,
        farmerPayoutAmount: farmerProfitShare40,
        municipalProcessingShare: Math.round(totalAmount * 0.35),
        greenFundShare: municipalShare60 - Math.round(totalAmount * 0.35),
        dbtStatus: "Credited via PFMS / Aadhaar (Auto-DBT)",
        bankUtr: `UTR-DBT-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        stubbleBurnAvertedKg: qty,
        pm25PreventedKg: (qty * 0.0092).toFixed(1),
        co2OffsetTons: (qty * 0.00142).toFixed(2)
      };
      setFarmerAgriLedger(prev => [dbtEntry, ...prev]);
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (farmerProfitShare40 > 0) {
      addNotification(
        "Circular Order Placed!",
        `Order ${orderId} placed for ₹${totalAmount.toLocaleString('en-IN')}. ₹${farmerProfitShare40.toLocaleString('en-IN')} (40%) disbursed directly to Farmer DBT!`,
        "success"
      );
    } else {
      addNotification(
        "Circular Order Placed!",
        `Order ${orderId} placed for ₹${totalAmount.toLocaleString('en-IN')}. Stock updated.`,
        "success"
      );
    }

    return { success: true, order: newOrder };
  };

  // Log New Farmer Agricultural Waste Intake Batch
  const logFarmerAgriIntake = (data) => {
    const tons = parseFloat(data.intakeWeightTons) || 5.0;
    const rate = parseFloat(data.ratePerKg) || 6.8;
    const marketGrossRevenue = Math.round(tons * 1000 * rate);
    const farmerPayoutAmount = Math.round(marketGrossRevenue * 0.40);
    const municipalProcessingShare = Math.round(marketGrossRevenue * 0.35);
    const greenFundShare = marketGrossRevenue - farmerPayoutAmount - municipalProcessingShare;
    const stubbleBurnAvertedKg = Math.round(tons * 1000);
    const pm25PreventedKg = parseFloat((tons * 9.2).toFixed(1));
    const co2OffsetTons = parseFloat((tons * 1.42).toFixed(2));

    const newIntake = {
      id: `AGRI-DBT-${Date.now().toString().slice(-6)}`,
      farmerName: data.farmerName || "Farmer Beneficiary",
      farmerId: data.farmerId || `FAR-${Math.floor(1000 + Math.random() * 9000)}`,
      contactPhone: data.contactPhone || "+91 98000 00000",
      aadhaarMasked: data.aadhaar ? `XXXX-XXXX-${data.aadhaar.slice(-4)}` : "XXXX-XXXX-4512",
      village: data.village || "Rural Agro Cluster",
      state: data.state || "Punjab",
      cropResidueType: data.cropResidueType || "Paddy Straw Stubble (Parali)",
      intakeWeightTons: tons,
      collectionDate: "Today",
      processedProduct: data.processedProduct || "Bio-Coal Biomass Briquettes",
      unitsProduced: `${Math.round(tons * 980)} kg Briquettes`,
      marketGrossRevenue,
      farmerSharePercent: 40,
      farmerPayoutAmount,
      municipalProcessingShare,
      greenFundShare,
      dbtStatus: "Credited via PFMS / Aadhaar",
      bankUtr: `UTR-DBT-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      stubbleBurnAvertedKg,
      pm25PreventedKg,
      co2OffsetTons
    };

    setFarmerAgriLedger(prev => [newIntake, ...prev]);

    setMarketplaceProducts(prev => prev.map(p => {
      if (p.isAgriWaste && (p.name.toLowerCase().includes(data.cropResidueType?.toLowerCase() || '') || p.id === 'PROD-AGRI-01')) {
        return { ...p, stock: p.stock + Math.round(tons * 980) };
      }
      return p;
    }));

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    addNotification(
      "Farmer Intake Logged",
      `${tons} Tons ${data.cropResidueType} intake logged. ₹${farmerPayoutAmount.toLocaleString('en-IN')} (40%) approved for Farmer Direct Transfer!`,
      "success"
    );

    return { success: true, intake: newIntake };
  };

  // Reset to Factory Demo State
  const resetDemoData = () => {
    localStorage.clear();
    setComplaints(INITIAL_COMPLAINTS);
    setWorkers(INITIAL_WORKERS);
    setVehicles(INITIAL_VEHICLES);
    setHotspots(INITIAL_HOTSPOTS);
    setCitizenPoints(650);
    setMarketplaceProducts(INITIAL_MARKETPLACE_PRODUCTS);
    setFarmerAgriLedger(INITIAL_FARMER_AGRI_LEDGER);
    setMarketplaceOrders(INITIAL_MARKETPLACE_ORDERS);
    setWardFilter('All Wards');
    setRole('citizen');
    setCurrentUser(null);
    setLanguageState('en');
    addNotification("Demo Reset", "All data restored to clean default demo state.", "info");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        language,
        setLanguage,
        t,
        role,
        setRole,
        wardFilter,
        setWardFilter,
        activeWorkerId,
        setActiveWorkerId,
        complaints,
        workers,
        vehicles,
        hotspots,
        citizenPoints,
        notifications,
        activeModal,
        setActiveModal,
        recyclers,
        technologies,
        municipalStats,
        marketplaceProducts,
        setMarketplaceProducts,
        farmerAgriLedger,
        setFarmerAgriLedger,
        marketplaceOrders,
        setMarketplaceOrders,
        buyMarketplaceProduct,
        logFarmerAgriIntake,
        viewMode,
        setViewMode,
        isInstallModalOpen,
        setIsInstallModalOpen,
        addComplaint,
        assignWorker,
        uploadEvidence,
        reportWorkerSos,
        resolveSos,
        citizenConfirm,
        supervisorAction,
        toggleAttendance,
        triggerHotspotAction,
        addNotification,
        playChime,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
