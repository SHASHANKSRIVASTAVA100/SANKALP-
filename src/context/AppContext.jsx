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
  MUNICIPAL_WASTE_STATS
} from '../data/mockData';
import { TRANSLATIONS } from '../i18n/translations';
import { apiClient } from '../services/api';

const AppContext = createContext();

export const DEMO_PROFILES = {
  citizen: {
    id: "CIT-9821",
    name: "Aarav Sharma",
    role: "citizen",
    phone: "+91 98450 12345",
    ward: "Ward 12 - Indiranagar",
    points: 650,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    badge: "Ward Guardian"
  },
  worker: {
    id: "WRK-01",
    name: "Ramesh Kumar",
    role: "worker",
    designation: "Senior Sanitation Hero",
    ward: "Ward 12 - Indiranagar",
    team: "Zone 12 Alpha Crew",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  supervisor: {
    id: "SUP-08",
    name: "Inspector Ananya Rao",
    role: "supervisor",
    designation: "Ward Sanitary Officer",
    ward: "Ward 12 - Indiranagar",
    zone: "East Bengaluru Zone",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  epr: {
    id: "EPR-CO-01",
    name: "AquaPure Beverage Industries",
    role: "epr",
    gstin: "29AAACH7409R1ZX",
    cpcbReg: "CPCB/EPR/2024/PL-0941",
    category: "FMCG / Rigid Plastics (PET)",
    authorizedRecycler: "GreenRecycle Hub Ltd",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80"
  },
  municipality: {
    id: "MUNI-HQ-01",
    name: "Dr. Rajeshwari Swamy, IAS",
    role: "municipality",
    designation: "Municipal Commissioner & Director of Urban Solid Waste Management",
    ulbOfficeId: "BBMP/HQ/COMM-01",
    jurisdiction: "Greater Metropolitan Urban Local Body (ULB)",
    contact: "+91 80 2222 1188",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  }
};

export const AppProvider = ({ children }) => {
  // Current Authenticated User (null means user is at Login Gateway)
  const [currentUser, setCurrentUser] = useState(() => {
    // Check URL parameters for PWA shortcuts (e.g. ?role=citizen or ?role=worker)
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const roleParam = urlParams.get('role');
        if (roleParam && DEMO_PROFILES[roleParam]) {
          localStorage.setItem('swachhta_current_user', JSON.stringify(DEMO_PROFILES[roleParam]));
          return DEMO_PROFILES[roleParam];
        }
      } catch (e) {}
    }
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
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
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

  // Sync Initial State with Live Backend Server
  useEffect(() => {
    const syncBackend = async () => {
      try {
        const backendComplaints = await apiClient.complaints.getAll();
        if (backendComplaints && backendComplaints.length > 0) {
          setComplaints(backendComplaints);
        }
        const backendWorkers = await apiClient.workers.getAll();
        if (backendWorkers && backendWorkers.length > 0) {
          setWorkers(backendWorkers);
        }
        const backendVehicles = await apiClient.fleet.getAll();
        if (backendVehicles && backendVehicles.length > 0) {
          setVehicles(backendVehicles);
        }
      } catch (err) {
        console.log('Using local fallback state:', err);
      }
    };
    syncBackend();
  }, []);

  // Connect to Live WebSocket RTK GPS Telematics Stream
  useEffect(() => {
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
    const newRecord = {
      id: newId,
      ...complaintData,
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
    apiClient.complaints.report({ ...complaintData, customImageUrl: complaintData.beforeImage });
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
    const verifiedCleanPhoto = afterImage || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80";

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

  // Reset to Factory Demo State
  const resetDemoData = () => {
    localStorage.clear();
    setComplaints(INITIAL_COMPLAINTS);
    setWorkers(INITIAL_WORKERS);
    setVehicles(INITIAL_VEHICLES);
    setHotspots(INITIAL_HOTSPOTS);
    setCitizenPoints(650);
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
