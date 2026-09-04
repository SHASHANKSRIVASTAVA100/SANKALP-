// Mock Data for Swachhta Sangam (SIH 2026) Waste Management System
// Uses 100% realistic, authentic street waste and freshly cleaned urban road photography

export const INITIAL_COMPLAINTS = [
  {
    id: "CMP-2026-108",
    title: "Overflowing Commercial Garbage Dump Near Vegetable Market",
    description: "Mixed wet and dry waste overflowing onto the main pedestrian footpath. Strong odor and attracting stray cattle.",
    ward: "Ward 12 - Indiranagar",
    locationName: "14th Main Rd, Near Vegetable Mandi, Indiranagar",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    reportedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    status: "in_progress", // 'pending' | 'assigned' | 'in_progress' | 'awaiting_verification' | 'verified' | 'rework'
    priority: "high", // 'critical' | 'high' | 'medium' | 'low'
    slaHours: 4,
    slaDeadline: new Date(Date.now() + 1.2 * 3600 * 1000).toISOString(),
    aiAnalysis: {
      detectedTypes: ["Organic Food Waste (55%)", "Single-Use Plastic (30%)", "Cardboard Packaging (15%)"],
      estimatedWeightKg: 65,
      confidence: "94.8%",
      hazardScore: "Medium",
      recommendedAction: "Dispatch Tipper Truck with 2 Sanitary Workers & Disinfectant Spray"
    },
    beforeImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    afterImage: null,
    reportedBy: {
      name: "Aakash Mehta",
      phone: "+91 98450 12345",
      isCitizenVerified: false,
      citizenRating: null
    },
    assignedWorkerId: "WRK-01",
    assignedWorkerName: "Ramesh Kumar",
    assignedTeam: "Zone 12 Alpha Crew",
    collectedWeightKg: null,
    mrfDestination: null,
    supervisorNotes: "High traffic zone. Ensure lime powder disinfection after clearance.",
    supervisorRating: null,
    sosAlert: null
  },
  {
    id: "CMP-2026-109",
    title: "Illegal Plastic & Chemical Packing Dump in Empty Plot",
    description: "Construction rubble mixed with toxic paint cans, industrial packaging, and styrofoam behind commercial complex.",
    ward: "Ward 14 - Koramangala",
    locationName: "Plot 88, 5th Block, Behind Sony World Signal, Koramangala",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    reportedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: "awaiting_verification",
    priority: "critical",
    slaHours: 2,
    slaDeadline: new Date(Date.now() - 0.5 * 3600 * 1000).toISOString(), // Overdue
    aiAnalysis: {
      detectedTypes: ["Industrial Plastic Film (40%)", "Chemical Cans (25%)", "Construction Debris (35%)"],
      estimatedWeightKg: 120,
      confidence: "96.2%",
      hazardScore: "Critical",
      recommendedAction: "Requires Heavy Protective Gear + Dedicated Hazmat Transport"
    },
    beforeImage: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    reportedBy: {
      name: "Sneha Rao",
      phone: "+91 97412 88761",
      isCitizenVerified: true,
      citizenRating: 5
    },
    assignedWorkerId: "WRK-02",
    assignedWorkerName: "Vikram Singh",
    assignedTeam: "Rapid Response Unit",
    collectedWeightKg: 135,
    mrfDestination: "Authorized Hazmat Recycler #03 - Peenya",
    supervisorNotes: "Awaiting supervisor dual-check. Citizen confirmed spot is cleared.",
    supervisorRating: null,
    sosAlert: null
  },
  {
    id: "CMP-2026-110",
    title: "Littered Roadside Pathway & Plastic Bottles",
    description: "Pedestrians left massive quantities of single-use plastic bottles, snack wrappers, and beverage cups near the curb.",
    ward: "Ward 12 - Indiranagar",
    locationName: "Defence Colony Lake Road, Indiranagar",
    coordinates: { lat: 12.9735, lng: 77.6472 },
    reportedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    status: "pending",
    priority: "medium",
    slaHours: 8,
    slaDeadline: new Date(Date.now() + 7 * 3600 * 1000).toISOString(),
    aiAnalysis: {
      detectedTypes: ["PET Water Bottles (70%)", "Multi-layered Plastic Pouches (20%)", "Paper Napkins (10%)"],
      estimatedWeightKg: 28,
      confidence: "91.5%",
      hazardScore: "Low",
      recommendedAction: "Dry Waste Segregation Sack + 1 Sanitation Hero"
    },
    beforeImage: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    afterImage: null,
    reportedBy: {
      name: "Rahul Verma",
      phone: "+91 99001 44552",
      isCitizenVerified: false,
      citizenRating: null
    },
    assignedWorkerId: null,
    assignedWorkerName: null,
    assignedTeam: null,
    collectedWeightKg: null,
    mrfDestination: null,
    supervisorNotes: null,
    supervisorRating: null,
    sosAlert: null
  },
  {
    id: "CMP-2026-105",
    title: "Clogged Stormwater Drain & Plastic Rubble",
    description: "Drain inlet blocked with plastic bags and road debris, causing water backflow onto street.",
    ward: "Ward 18 - Whitefield",
    locationName: "Main Road junction, Near ITPL Gate 2, Whitefield",
    coordinates: { lat: 12.9856, lng: 77.7289 },
    reportedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: "verified",
    priority: "high",
    slaHours: 6,
    slaDeadline: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    aiAnalysis: {
      detectedTypes: ["Polythene Carry Bags (60%)", "Silt & Organic Sludge (35%)", "Metal Beverage Cans (5%)"],
      estimatedWeightKg: 90,
      confidence: "95.1%",
      hazardScore: "High",
      recommendedAction: "Drain Clearance Hook + High Pressure Wash"
    },
    beforeImage: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    reportedBy: {
      name: "Pooja Hegde",
      phone: "+91 98802 33441",
      isCitizenVerified: true,
      citizenRating: 5
    },
    assignedWorkerId: "WRK-03",
    assignedWorkerName: "Sunita Devi",
    assignedTeam: "Drainage & Desilting Squad",
    collectedWeightKg: 98,
    mrfDestination: "Municipal MRF Unit #12",
    supervisorNotes: "Verified on-site. Flow restored smoothly. Worker awarded 5-star performance.",
    supervisorRating: 5,
    sosAlert: null
  }
];

export const INITIAL_WORKERS = [
  {
    id: "WRK-01",
    name: "Ramesh Kumar",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    phone: "+91 98451 90211",
    ward: "Ward 12 - Indiranagar",
    team: "Zone 12 Alpha Crew",
    role: "Senior Sanitation Hero",
    rating: 4.9,
    reviewsCount: 142,
    attendance: "punched_in", // 'punched_in' | 'punched_out' | 'on_break'
    punchInTime: "07:30 AM",
    activeTasksCount: 1,
    completedToday: 3,
    totalKgClearedToday: 185,
    earningsToday: 720
  },
  {
    id: "WRK-02",
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    phone: "+91 99012 33214",
    ward: "Ward 14 - Koramangala",
    team: "Rapid Response Unit",
    role: "Hazmat & Bulk Waste Specialist",
    rating: 4.8,
    reviewsCount: 98,
    attendance: "punched_in",
    punchInTime: "08:00 AM",
    activeTasksCount: 1,
    completedToday: 2,
    totalKgClearedToday: 240,
    earningsToday: 850
  },
  {
    id: "WRK-03",
    name: "Sunita Devi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    phone: "+91 97401 55623",
    ward: "Ward 18 - Whitefield",
    team: "Drainage & Desilting Squad",
    role: "Sanitation Lead",
    rating: 5.0,
    reviewsCount: 180,
    attendance: "punched_in",
    punchInTime: "07:15 AM",
    activeTasksCount: 0,
    completedToday: 4,
    totalKgClearedToday: 310,
    earningsToday: 950
  },
  {
    id: "WRK-04",
    name: "Mohammad Arif",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    phone: "+91 98860 11299",
    ward: "Ward 12 - Indiranagar",
    team: "Mechanical Sweeper Crew",
    role: "Vehicle Operator & Collector",
    rating: 4.7,
    reviewsCount: 64,
    attendance: "punched_out",
    punchInTime: null,
    activeTasksCount: 0,
    completedToday: 0,
    totalKgClearedToday: 0,
    earningsToday: 0
  }
];

export const INITIAL_VEHICLES = [
  {
    id: "VH-102",
    registrationNo: "KA-03-GH-1102",
    type: "Compactor Garbage Truck (5 Ton)",
    depot: "Depot #04 (Indiranagar)",
    fuelType: "Compressed Natural Gas (CNG)",
    driverName: "Santosh Gowda",
    driverPhone: "+91 94480 77121",
    ward: "Ward 12 - Indiranagar",
    currentLocation: { lat: 12.9772, lng: 77.6415 },
    currentStreet: "Near 12th Main Road, 80 Feet Road Junction",
    speedKmH: 18,
    status: "collecting", // 'collecting' | 'in_transit' | 'idle' | 'breakdown'
    routeProgress: 68, // percentage
    routeDeviation: false,
    distanceFromUserMeters: 280,
    estimatedArrivalMinutes: 3,
    lastUpdate: "Just now",
    capacityPercent: 74,
    stopsRemaining: 5,
    odometerKm: 42810,
    fitnessValidTill: "Nov 2026",
    pucValidTill: "Aug 2026",
    fuelLevelPercent: 82
  },
  {
    id: "VH-105",
    registrationNo: "KA-01-EE-4509",
    type: "Hydraulic Tipper Truck (2.5 Ton)",
    depot: "Depot #08 (Koramangala)",
    fuelType: "BS-VI Clean Diesel",
    driverName: "Dinesh Murthy",
    driverPhone: "+91 98861 88345",
    ward: "Ward 14 - Koramangala",
    currentLocation: { lat: 12.9340, lng: 77.6220 },
    currentStreet: "80 Feet Road, 4th Block",
    speedKmH: 22,
    status: "in_transit",
    routeProgress: 85,
    routeDeviation: false,
    distanceFromUserMeters: 1400,
    estimatedArrivalMinutes: 14,
    lastUpdate: "2 mins ago",
    capacityPercent: 88,
    stopsRemaining: 2,
    odometerKm: 31200,
    fitnessValidTill: "Jan 2027",
    pucValidTill: "Sep 2026",
    fuelLevelPercent: 65
  },
  {
    id: "VH-108",
    registrationNo: "KA-53-MC-9082",
    type: "Electric E-Rickshaw Tipper",
    depot: "Depot #11 (Whitefield)",
    fuelType: "Electric (Lithium-LFP)",
    driverName: "Karthik N",
    driverPhone: "+91 99450 66211",
    ward: "Ward 18 - Whitefield",
    currentLocation: { lat: 12.9830, lng: 77.7250 },
    currentStreet: "Inner Circle Road, Whitefield",
    speedKmH: 0,
    status: "idle",
    routeProgress: 35,
    routeDeviation: true,
    distanceFromUserMeters: 3200,
    estimatedArrivalMinutes: 30,
    lastUpdate: "5 mins ago",
    capacityPercent: 42,
    stopsRemaining: 12,
    odometerKm: 14600,
    fitnessValidTill: "Mar 2028",
    pucValidTill: "Exempt (EV)",
    fuelLevelPercent: 78
  },
  {
    id: "VH-112",
    registrationNo: "KA-04-MB-3391",
    type: "High-Pressure Super Sucker Desilter",
    depot: "Central Stormwater Fleet Depot",
    fuelType: "Compressed Natural Gas (CNG)",
    driverName: "Muniswamy Reddy",
    driverPhone: "+91 98440 33812",
    ward: "East Zone Drainage Squad",
    currentLocation: { lat: 12.9750, lng: 77.6450 },
    currentStreet: "Domlur Culvert Drainage Main",
    speedKmH: 12,
    status: "collecting",
    routeProgress: 52,
    routeDeviation: false,
    distanceFromUserMeters: 850,
    estimatedArrivalMinutes: 8,
    lastUpdate: "1 min ago",
    capacityPercent: 62,
    stopsRemaining: 4,
    odometerKm: 58900,
    fitnessValidTill: "Dec 2026",
    pucValidTill: "Jul 2026",
    fuelLevelPercent: 90
  },
  {
    id: "VH-116",
    registrationNo: "KA-02-JH-7714",
    type: "Front-End Heavy Rubble Loader",
    depot: "Channasandra C&D Terminal",
    fuelType: "Heavy Commercial Diesel",
    driverName: "Gururaj K",
    driverPhone: "+91 97410 55190",
    ward: "City-Wide C&D Taskforce",
    currentLocation: { lat: 12.9380, lng: 77.6320 },
    currentStreet: "Koramangala Outer Ring Hub",
    speedKmH: 25,
    status: "in_transit",
    routeProgress: 91,
    routeDeviation: false,
    distanceFromUserMeters: 1950,
    estimatedArrivalMinutes: 18,
    lastUpdate: "3 mins ago",
    capacityPercent: 95,
    stopsRemaining: 1,
    odometerKm: 76200,
    fitnessValidTill: "Oct 2026",
    pucValidTill: "Jun 2026",
    fuelLevelPercent: 54
  }
];

export const INITIAL_HOTSPOTS = [
  {
    id: "HOT-01",
    title: "14th Main Vegetable Mandi Dump",
    ward: "Ward 12 - Indiranagar",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    frequencyScore: "Critical (8 complaints/week)",
    primaryWaste: "Organic Vegetable Rots & Polythene Bags",
    rootCause: "Shortage of community wet-waste bins within 350m radius + late night vendor dumping",
    currentStatus: "Action Required",
    recommendedInterventions: [
      { id: "INT-1", label: "Install 2x 1100L Bio-Degradable Smart Dustbins", cost: "₹32,000", status: "pending" },
      { id: "INT-2", label: "Deploy Solar-Powered CCTV Surveillance Pole", cost: "₹18,500", status: "planned" },
      { id: "INT-3", label: "Schedule Night 10 PM Secondary Pickup Run", cost: "₹1,200/mo", status: "active" }
    ]
  },
  {
    id: "HOT-02",
    title: "Koramangala 5th Block Corner Plot",
    ward: "Ward 14 - Koramangala",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    frequencyScore: "High (5 complaints/week)",
    primaryWaste: "Restaurant Commercial Waste & Single-Use Food Containers",
    rootCause: "Eateries avoiding commercial waste fees by dumping at midnight",
    currentStatus: "Enforcement Active",
    recommendedInterventions: [
      { id: "INT-4", label: "Enforce Commercial Spot-Fines via Ward Marshal", cost: "₹0", status: "active" },
      { id: "INT-5", label: "Mandate QR-coded EPR bags for food outlets", cost: "₹5,000", status: "pending" }
    ]
  }
];

export const CITIZEN_LEADERBOARD = [
  { rank: 1, name: "Dr. Ananya Sharma", ward: "Ward 12", points: 1280, complaintsVerified: 24, badge: "Eco Ambassador" },
  { rank: 2, name: "Kiran Mazumdar", ward: "Ward 14", points: 940, complaintsVerified: 19, badge: "Zero Waste Hero" },
  { rank: 3, name: "Tanmay Deshmukh", ward: "Ward 12", points: 810, complaintsVerified: 15, badge: "Litter Slayer" },
  { rank: 4, name: "Aakash Mehta (You)", ward: "Ward 12", points: 650, complaintsVerified: 11, badge: "Ward Guardian" },
  { rank: 5, name: "Neha Parikh", ward: "Ward 18", points: 520, complaintsVerified: 9, badge: "Green Scout" }
];

export const EPR_COMPANIES = [
  {
    id: "EPR-CO-01",
    companyName: "AquaPure Beverage Industries",
    category: "FMCG / Rigid Plastics (PET)",
    targetTons: 150,
    collectedTons: 118.4,
    recycledTons: 112.1,
    compliancePercent: 78.9,
    status: "On Track",
    currentCreditValue: "₹4,72,000",
    authorizedRecycler: "GreenRecycle Hub Ltd (State Reg: PCB/REC-884)",
    activeContracts: 4,
    lastCertificateId: "EPR-CERT-2026-9921",
    digitalTrail: [
      { step: 1, title: "EPR Quota Registered", time: "Jan 15, 2026", details: "150 Tons PET under Central Plastic Waste Rules" },
      { step: 2, title: "Platform Network Matching", time: "Jan 18, 2026", details: "Allotted 12 Ward Sanitation Hubs & 45 Certified Workers" },
      { step: 3, title: "Segregation & Weighbridge", time: "Feb 10, 2026", details: "Batch #PET-0994 weighed at Indiranagar MRF: 24.8 Tons" },
      { step: 4, title: "Authorized Pelletizing", time: "Feb 28, 2026", details: "Processed into food-grade rPET flakes at Peenya Plant" },
      { step: 5, title: "Cryptographic Certificate Issued", time: "Mar 02, 2026", details: "Digitally signed with tamper-proof SHA-256 hash" }
    ]
  },
  {
    id: "EPR-CO-02",
    companyName: "Zenith Electronics & Consumer Devices",
    category: "E-Waste / Hazardous Batteries",
    targetTons: 40,
    collectedTons: 36.2,
    recycledTons: 35.8,
    compliancePercent: 90.5,
    status: "Compliant",
    currentCreditValue: "₹7,20,000",
    authorizedRecycler: "EcoE-Waste Refiners India (State Reg: PCB/EW-201)",
    activeContracts: 2,
    lastCertificateId: "EPR-CERT-2026-8812",
    digitalTrail: [
      { step: 1, title: "E-Waste Mandate Filed", time: "Jan 05, 2026", details: "40 Tons Lithium & PCB waste obligation" },
      { step: 2, title: "Takeback Drive & Worker Gig", time: "Jan 22, 2026", details: "Workers incentivized at ₹15/kg for collected e-waste" },
      { step: 3, title: "Material Recovery Testing", time: "Feb 15, 2026", details: "Pre-shredded & precious metal reclamation audit" },
      { step: 4, title: "Safe Smelting & Disposal", time: "Feb 25, 2026", details: "Zero-landfill residue certification verified" },
      { step: 5, title: "Government Portal Sync", time: "Mar 01, 2026", details: "CPCB EPR portal auto-reported with API verification" }
    ]
  }
];

export const SAMPLE_GARBAGE_IMAGES = [
  {
    id: "sample-1",
    title: "Plastic & Beverage Waste",
    type: "Single-Use Plastic Heap",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    detected: {
      tags: ["PET Plastic Bottles (68%)", "Plastic Wrap (22%)", "Paper Packaging (10%)"],
      weight: 35,
      hazard: "Medium",
      priority: "high",
      sla: 4,
      action: "Recyclable Dry Waste Unit"
    }
  },
  {
    id: "sample-2",
    title: "Overflowing Street Dumpster",
    type: "Mixed Urban Waste",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    detected: {
      tags: ["Organic Wet Food (55%)", "Cardboard (25%)", "Polythene (20%)"],
      weight: 75,
      hazard: "Medium-High",
      priority: "critical",
      sla: 2,
      action: "Compactor Truck Dispatch"
    }
  },
  {
    id: "sample-3",
    title: "Chemical & Debris Rubble",
    type: "Hazardous & Construction",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80",
    detected: {
      tags: ["Paint Cans & Solvents (45%)", "Cement Rubble (35%)", "Tar Residue (20%)"],
      weight: 140,
      hazard: "Critical Biohazard",
      priority: "critical",
      sla: 2,
      action: "Hazmat Team with Sealed Containment"
    }
  },
  {
    id: "sample-4",
    title: "Roadside Littering",
    type: "Dry Litter",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    detected: {
      tags: ["Paper Cups (40%)", "Food Wrappers (40%)", "Aluminium Cans (20%)"],
      weight: 18,
      hazard: "Low",
      priority: "medium",
      sla: 8,
      action: "Sanitation Hero Manual Sweep"
    }
  }
];

export const PAID_SERVICES_CATALOG = [
  {
    id: "PAID-01",
    title: "Post-Function / Event Waste Clearance",
    category: "Event On-Demand",
    description: "Full site cleanup after marriage, birthday party, festival, or corporate gathering. Complete wet & dry segregation included.",
    basePrice: 1499,
    priceUnit: "upto 100 Guests (₹499 per addl. 50 guests)",
    turnaround: "Within 2 Hours of Event Finish",
    features: ["4 Heavy Duty Waste Bins provided", "2 Dedicated Sanitation Heroes", "MRF Recycler Transport", "Site Sanitize Spray"]
  },
  {
    id: "PAID-02",
    title: "Daily Commercial Waste Collection",
    category: "Shop & Factory Monthly",
    description: "Scheduled daily morning or evening pickup directly from retail shops, restaurants, small manufacturing units, and workshops.",
    basePrice: 799,
    priceUnit: "per month / small shop",
    turnaround: "Daily 8:30 AM or 9:30 PM",
    features: ["Daily Doorstep Segregated Pickup", "Commercial Waste Certificate", "Zero-Fine Municipal Exemption", "Priority Support Line"]
  },
  {
    id: "PAID-03",
    title: "Factory Scrap & Bulk Recyclables Pickup",
    category: "Industrial / Warehouse",
    description: "Heavy logistics for corrugated cartons, wooden pallets, plastic drums, and sheet off-cuts.",
    basePrice: 2499,
    priceUnit: "per truck trip (up to 1.5 Tons)",
    turnaround: "Scheduled on booking",
    features: ["Digital Weighbridge Slip", "Authorized Recycler Consignment Note", "EPR Compliance Credits", "Labor for Loading Included"]
  }
];

export const INITIAL_RECYCLERS = [
  {
    id: "REC-01",
    name: "GreenRecycle Hub Ltd",
    licenseNo: "KSPCB/EPR/2023/PL-884",
    category: "Plastic & Polymers (PET / HDPE)",
    facilityType: "Material Recovery Facility & Flake Pelletizer",
    location: "Peenya Industrial Area, Phase 2, Bengaluru",
    coordinates: { lat: 13.0285, lng: 77.5180 },
    dailyCapacityTons: 120,
    currentIntakeTons: 94.5,
    utilizationPercent: 78.8,
    cumulativeRecycledTons: 14850,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Jan 2026)",
    facilityHead: "Dr. V. K. Nambiar",
    contactPhone: "+91 80 2839 4410",
    activeContracts: ["BBMP East Zone", "AquaPure Beverage", "ITC Limited"],
    consignmentHash: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  },
  {
    id: "REC-02",
    name: "Indiranagar Bio-Methanation & Composting Plant",
    licenseNo: "BBMP/SWM/BIO-2022/012",
    category: "Organic Wet Waste & Biomass",
    facilityType: "Anaerobic Digester & Compressed Biogas (CBG)",
    location: "Near 100ft Road, Indiranagar, Bengaluru",
    coordinates: { lat: 12.9730, lng: 77.6410 },
    dailyCapacityTons: 250,
    currentIntakeTons: 218.0,
    utilizationPercent: 87.2,
    cumulativeRecycledTons: 32400,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Feb 2026)",
    facilityHead: "Er. S. Chandrasekhar",
    contactPhone: "+91 80 2520 1199",
    activeContracts: ["Ward 12 Indiranagar", "Ward 14 Koramangala", "K.R. Market Mandi"],
    consignmentHash: "SHA256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
  },
  {
    id: "REC-03",
    name: "E-Waste Dismantlers & Heavy Metal Refining Unit",
    licenseNo: "CPCB/E-WASTE/2024/CAT-1/09",
    category: "Hazardous, Batteries & Electronic Waste",
    facilityType: "Pre-Shredding & Hydrometallurgical Refining",
    location: "Dobbaspet Industrial Estate, Bengaluru Rural",
    coordinates: { lat: 13.2350, lng: 77.2450 },
    dailyCapacityTons: 40,
    currentIntakeTons: 32.4,
    utilizationPercent: 81.0,
    cumulativeRecycledTons: 4120,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Mar 2026)",
    facilityHead: "Meenakshi Sundaram",
    contactPhone: "+91 80 6745 2200",
    activeContracts: ["Zenith Electronics", "BBMP E-Waste Drop Hubs", "Titan Ltd"],
    consignmentHash: "SHA256:ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d"
  },
  {
    id: "REC-04",
    name: "Channasandra C&D Waste Aggregate Plant",
    licenseNo: "KSPCB/CDW/2021/004",
    category: "Construction & Demolition Debris",
    facilityType: "Mechanical Crushing & Manufactured Sand Unit",
    location: "Channasandra, Whitefield Outer Ring, Bengaluru",
    coordinates: { lat: 13.0010, lng: 77.7520 },
    dailyCapacityTons: 500,
    currentIntakeTons: 420.0,
    utilizationPercent: 84.0,
    cumulativeRecycledTons: 68500,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Dec 2025)",
    facilityHead: "Raghavendra Hegde",
    contactPhone: "+91 80 2845 8890",
    activeContracts: ["BBMP Infra Directorate", "BMRCL Metro Works", "L&T Construction"],
    consignmentHash: "SHA256:a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
  },
  {
    id: "REC-05",
    name: "ITC Paperboards & Fiber Recovery Mill",
    licenseNo: "KSPCB/PULP/2023/REC-102",
    category: "Cardboard, Cartons & Clean Paper",
    facilityType: "Hydropulping & Recycled Kraft Paper Mill",
    location: "Bommasandra Industrial Area, Bengaluru",
    coordinates: { lat: 12.8150, lng: 77.6820 },
    dailyCapacityTons: 180,
    currentIntakeTons: 145.2,
    utilizationPercent: 80.7,
    cumulativeRecycledTons: 28900,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Feb 2026)",
    facilityHead: "Sunil Shenoy",
    contactPhone: "+91 80 2783 6100",
    activeContracts: ["Amazon India Logistics", "Flipkart Hubs", "Ward 12 & 18 MRF"],
    consignmentHash: "SHA256:2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3"
  },
  {
    id: "REC-06",
    name: "Hindusthan National Glass Recyclers",
    licenseNo: "KSPCB/GLASS/2022/077",
    category: "Glass Shards & Container Cullet",
    facilityType: "Color Optical Cullet Sorting & Furnace Smelting",
    location: "Bidadi Industrial Area, Ramanagara Border",
    coordinates: { lat: 12.8020, lng: 77.3850 },
    dailyCapacityTons: 90,
    currentIntakeTons: 68.0,
    utilizationPercent: 75.6,
    cumulativeRecycledTons: 11400,
    status: "Active & Certified",
    cpcbAuditStatus: "Passed (Audit Date: Jan 2026)",
    facilityHead: "P. R. Deshpande",
    contactPhone: "+91 80 2728 3400",
    activeContracts: ["United Breweries", "Coca-Cola Bottling", "BBMP Ward MRFs"],
    consignmentHash: "SHA256:01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b"
  }
];

export const MUNICIPAL_TECHNOLOGY_REGISTRY = [
  {
    id: "TECH-01",
    name: "Automated Optical Polymer Sorter (AI-NIR)",
    category: "Sensor-Based Material Segregation",
    manufacturer: "Tomra Systems / Pelicon Robotics",
    unitsDeployed: 4,
    processingSpeed: "12.5 Tons / Hour",
    accuracyPercent: 98.4,
    status: "Operational",
    energyRating: "4-Star Green Industrial",
    lastMaintenance: "Feb 28, 2026",
    nextServiceDue: "May 28, 2026",
    operationalDepot: "Peenya Central MRF Facility",
    features: [
      "Near-Infrared (NIR) High-Speed Spectral Cameras",
      "Pneumatic Air-Jet Ejection for PET vs HDPE vs PP",
      "Real-time Polymer Purity IoT Telemetry"
    ]
  },
  {
    id: "TECH-02",
    name: "High-Pressure Super Sucker & Hydro-Jetting Rig",
    category: "Stormwater Drainage & Silt Extraction",
    manufacturer: "TPS Infrastructure / Scania India",
    unitsDeployed: 6,
    processingSpeed: "3,200 Liters / Minute Sludge Draw",
    accuracyPercent: 99.1,
    status: "Operational",
    energyRating: "BS-VI CNG Propulsion",
    lastMaintenance: "Mar 01, 2026",
    nextServiceDue: "Apr 01, 2026",
    operationalDepot: "East Zone Central Silt Station (Indiranagar)",
    features: [
      "12,000 Liter Vacuum Sludge Holding Tank",
      "250 Bar High-Pressure Desilting Water Jet",
      "Submersible Deep Culvert Cutter Hook"
    ]
  },
  {
    id: "TECH-03",
    name: "Industrial Twin-Shaft Hydraulic Shredder & Baler",
    category: "Dry Waste Volume Compression",
    manufacturer: "Advance Hydrau-Tech / Forrec",
    unitsDeployed: 8,
    processingSpeed: "8 Tons / Hour Compaction",
    accuracyPercent: 99.8,
    status: "Operational",
    energyRating: "High-Efficiency Regenerative Electric",
    lastMaintenance: "Feb 15, 2026",
    nextServiceDue: "May 15, 2026",
    operationalDepot: "Koramangala 4th Block Intermediate Hub",
    features: [
      "40-Ton Baling Hydraulic Ram",
      "Hardened Tungsten Carbide Counter-Rotary Blades",
      "Automatic Wire Tying for Baled Cardboard & Plastic"
    ]
  },
  {
    id: "TECH-04",
    name: "Solar-Powered IoT Smart Compactor Bins",
    category: "Decentralized Street Compaction",
    manufacturer: "Ecube Labs / Bigbelly CleanCity",
    unitsDeployed: 48,
    processingSpeed: "5x Volume Reduction Ratio",
    accuracyPercent: 96.5,
    status: "Operational (48/48 Connected)",
    energyRating: "100% Off-Grid Monocrystalline Solar",
    lastMaintenance: "Feb 20, 2026",
    nextServiceDue: "Jun 20, 2026",
    operationalDepot: "100ft Road, Indiranagar & 80ft Road, Koramangala",
    features: [
      "Ultrasonic Fill-Level Laser Sensors (4G LTE Sync)",
      "Automatic Foot-Pedal Sanitary Hatch",
      "Self-Actuating Electric Compactor Ram"
    ]
  },
  {
    id: "TECH-05",
    name: "C&D Mobile Rubble Crushing & Screening Plant",
    category: "Aggregates Recovery & Recycling",
    manufacturer: "Terex MPS / Keestrack Mobile",
    unitsDeployed: 2,
    processingSpeed: "150 Tons / Hour Raw Rubble",
    accuracyPercent: 97.2,
    status: "Operational",
    energyRating: "Dual-Power Hybrid (Electric/Diesel)",
    lastMaintenance: "Jan 30, 2026",
    nextServiceDue: "Apr 30, 2026",
    operationalDepot: "Channasandra C&D Terminal",
    features: [
      "Overband Electro-Magnetic Rebar Separator",
      "3-Deck Vibrating Screen (Produces M-Sand, 10mm, 20mm Aggregates)",
      "High-Pressure Mist Dust Suppression Cannon"
    ]
  },
  {
    id: "TECH-06",
    name: "RTK-GPS Telematics & RFID Bin Micro-Transponders",
    category: "Fleet Tracking & Proof-of-Service IoT",
    manufacturer: "Teltonika Telematics / Trimble Fleet",
    unitsDeployed: 120,
    processingSpeed: "Sub-meter Real-time Location Push (every 3s)",
    accuracyPercent: 99.9,
    status: "Operational (118/120 Active)",
    energyRating: "Ultra-Low Power Automotive IoT",
    lastMaintenance: "Mar 02, 2026",
    nextServiceDue: "Sep 02, 2026",
    operationalDepot: "City-Wide Fleet Command Control Room",
    features: [
      "Multi-Constellation GNSS (GPS + NavIC + GLONASS)",
      "Geo-fence Proximity Warning with CanBus Telematics",
      "Doorstep RFID Chime Auto-Broadcast Interface"
    ]
  }
];

export const MUNICIPAL_WASTE_STATS = {
  cityTotalGenerationTonsPerDay: 1750,
  cityTotalRecycledTonsPerDay: 1420,
  landfillDiversionPercent: 81.1,
  biogasCleanEnergyKwhPerDay: 38400,
  co2EquivalentSavedMetricTons: 845,
  dailyCategories: [
    { name: "Organic Wet Food Waste", tons: 580, percent: 33.1, color: "#10b981", destination: "Bio-Methanation Plants" },
    { name: "Construction & Demolition Debris", tons: 380, percent: 21.7, color: "#f59e0b", destination: "Channasandra Aggregate Plant" },
    { name: "Plastic Packaging (PET/HDPE/MLP)", tons: 290, percent: 16.6, color: "#06b6d4", destination: "Authorized Flake Pelletizers" },
    { name: "Paper & Corrugated Cardboard", tons: 185, percent: 10.6, color: "#38bdf8", destination: "ITC Paperboards Mill" },
    { name: "Drain Silt & Desilted Sludge", tons: 120, percent: 6.9, color: "#64748b", destination: "Municipal Drying Beds" },
    { name: "Metal Scrap & Beverage Cans", tons: 95, percent: 5.4, color: "#a855f7", destination: "Smelting Foundries" },
    { name: "Glass Bottles & Cullet", tons: 65, percent: 3.7, color: "#ec4899", destination: "Hindusthan Glass Furnaces" },
    { name: "Hazardous, Batteries & E-Waste", tons: 35, percent: 2.0, color: "#ef4444", destination: "Dobbaspet Hazmat Treatment" }
  ],
  wardPerformance: [
    { ward: "Ward 12 - Indiranagar", collectedTons: 145, recycledTons: 122, diversionRate: "84.1%", status: "Exemplary" },
    { ward: "Ward 14 - Koramangala", collectedTons: 180, recycledTons: 148, diversionRate: "82.2%", status: "High Compliance" },
    { ward: "Ward 18 - Whitefield", collectedTons: 210, recycledTons: 165, diversionRate: "78.5%", status: "On Track" },
    { ward: "Ward 08 - Malleshwaram", collectedTons: 130, recycledTons: 109, diversionRate: "83.8%", status: "Exemplary" }
  ]
};

