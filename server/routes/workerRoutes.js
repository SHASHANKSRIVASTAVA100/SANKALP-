import express from 'express';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

// 1. Get Workers
router.get('/', (req, res) => {
  const db = getDB();
  return res.json({ success: true, workers: db.workers || [] });
});

// 2. Worker Attendance Toggle (Punch In / Punch Out)
router.post('/:id/punch', (req, res) => {
  const { id } = req.params;
  const db = getDB();

  let updatedWorker = null;
  db.workers = (db.workers || []).map(w => {
    if (w.id === id) {
      const nextState = w.attendance === 'punched_in' ? 'punched_out' : 'punched_in';
      updatedWorker = {
        ...w,
        attendance: nextState,
        punchInTime: nextState === 'punched_in' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      };
      return updatedWorker;
    }
    return w;
  });

  if (!updatedWorker) {
    return res.status(404).json({ error: "Worker not found" });
  }

  saveDB(db);
  return res.json({
    success: true,
    message: `Attendance marked: ${updatedWorker.attendance.toUpperCase()}`,
    worker: updatedWorker
  });
});

// 3. Paid Gigs Listing
router.get('/gigs/available', (req, res) => {
  const gigs = [
    {
      id: "GIG-101",
      title: "Royal Grand Banquet - Post-Birthday Cleanup",
      location: "80 Feet Road, Indiranagar (450m from you)",
      payout: 450,
      wasteType: "Dry Disposable Paper & Food Waste (Approx. 60 kg)",
      timeSlot: "Today, 03:00 PM",
      status: "available"
    },
    {
      id: "GIG-102",
      title: "Cafe Coffee Day Commercial Bulk Pickup",
      location: "100 Feet Road, Near Metro (800m)",
      payout: 320,
      wasteType: "Coffee Grounds & Paper Cartons (Approx. 40 kg)",
      timeSlot: "Today, 05:30 PM",
      status: "available"
    }
  ];
  return res.json({ success: true, gigs });
});

export default router;
