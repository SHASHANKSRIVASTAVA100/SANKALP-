import express from 'express';
import { getDB } from '../db.js';

const router = express.Router();

// 1. Citizen: Send OTP
router.post('/citizen/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  // Simulated OTP generation (SMS gateway simulation)
  return res.json({
    success: true,
    message: 'OTP sent successfully via SMS gateway',
    demoOtp: '1234',
    phone
  });
});

// 2. Citizen: Verify OTP & Authenticate
router.post('/citizen/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (otp !== '1234' && otp !== '0000') {
    return res.status(401).json({ error: 'Invalid OTP code. Please enter 1234.' });
  }

  const db = getDB();
  const citizen = db.users?.citizen || {
    id: "CIT-9821",
    name: "Aarav Sharma",
    role: "citizen",
    phone: phone || "+91 98450 12345",
    ward: "Ward 12 - Indiranagar",
    points: 650,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    badge: "Ward Guardian"
  };

  return res.json({
    success: true,
    token: `jwt-citizen-${Date.now()}`,
    user: citizen
  });
});

// 3. Worker Login
router.post('/worker/login', (req, res) => {
  const { workerId, pin } = req.body;
  if (!workerId) {
    return res.status(400).json({ error: 'Worker Sanitation ID is required' });
  }
  if (pin && pin !== '2026' && pin !== '1234') {
    return res.status(401).json({ error: 'Invalid Shift PIN. Default demo PIN is 2026.' });
  }

  const db = getDB();
  const worker = db.workers?.find(w => w.id === workerId) || db.users?.worker;

  return res.json({
    success: true,
    token: `jwt-worker-${Date.now()}`,
    user: {
      ...worker,
      role: 'worker'
    }
  });
});

// 4. Supervisor Login
router.post('/supervisor/login', (req, res) => {
  const { officerId, password } = req.body;
  if (!officerId) {
    return res.status(400).json({ error: 'Sanitary Officer ID is required' });
  }

  const db = getDB();
  const supervisor = db.users?.supervisor || {
    id: officerId,
    name: "Inspector Ananya Rao",
    role: "supervisor",
    designation: "Ward Sanitary Officer",
    ward: "Ward 12 - Indiranagar",
    zone: "East Bengaluru Zone",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  };

  return res.json({
    success: true,
    token: `jwt-supervisor-${Date.now()}`,
    user: supervisor
  });
});

// 5. Company (EPR) Login
router.post('/company/login', (req, res) => {
  const { gstin, authKey } = req.body;
  if (!gstin) {
    return res.status(400).json({ error: 'Corporate GSTIN / CPCB ID is required' });
  }

  const db = getDB();
  const company = db.users?.epr || {
    id: "EPR-CO-01",
    name: "AquaPure Beverage Industries",
    role: "epr",
    gstin: gstin || "29AAACH7409R1ZX",
    cpcbReg: "CPCB/EPR/2024/PL-0941",
    category: "FMCG / Rigid Plastics (PET)",
    authorizedRecycler: "GreenRecycle Hub Ltd",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=150&q=80"
  };

  return res.json({
    success: true,
    token: `jwt-epr-${Date.now()}`,
    user: company
  });
});

export default router;
