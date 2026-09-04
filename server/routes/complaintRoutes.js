import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getDB, saveDB } from '../db.js';
import { analyzeWasteImage } from '../services/aiService.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure Multer for authentic image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `waste-${Date.now()}-${Math.round(Math.random() * 1e4)}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const router = express.Router();

// 1. Get Complaints (Optional Ward & Status Filters)
router.get('/', (req, res) => {
  const { ward, status, workerId } = req.query;
  const db = getDB();
  let list = db.complaints || [];

  if (ward && ward !== 'All Wards') {
    list = list.filter(c => c.ward === ward);
  }
  if (status && status !== 'all') {
    list = list.filter(c => c.status === status);
  }
  if (workerId) {
    list = list.filter(c => c.assignedWorkerId === workerId);
  }

  return res.json({ success: true, count: list.length, complaints: list });
});

// 2. Report Complaint with AI Computer Vision Analysis
router.post('/report', upload.single('photo'), (req, res) => {
  const { title, description, ward, locationName, customImageUrl, coordinates, aiAnalysis, priority, slaHours } = req.body;
  const db = getDB();

  let beforeImage = customImageUrl || req.body.beforeImage || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80";
  if (req.file) {
    beforeImage = `/uploads/${req.file.filename}`;
  }

  // Run AI heuristic waste model if not explicitly provided
  const aiResult = aiAnalysis || analyzeWasteImage(req.file?.filename, title, description);
  const newId = `CMP-2026-${Date.now().toString().slice(-4)}`;

  const finalPriority = priority || aiResult.priority || "medium";
  const finalSlaHours = Number(slaHours) || Number(aiResult.slaHours) || 8;
  const finalCoordinates = coordinates && coordinates.lat ? coordinates : {
    lat: 12.9784 + (Math.random() - 0.5) * 0.015,
    lng: 77.6408 + (Math.random() - 0.5) * 0.015
  };

  const newTicket = {
    id: newId,
    title: title || "Unattended Waste Pile on Roadway",
    description: description || "Reported via citizen mobile application.",
    ward: ward || "Ward 12 - Indiranagar",
    locationName: locationName || "Near 12th Main Road, Indiranagar",
    coordinates: finalCoordinates,
    reportedAt: new Date().toISOString(),
    status: "pending",
    priority: finalPriority,
    slaHours: finalSlaHours,
    slaDeadline: new Date(Date.now() + finalSlaHours * 3600 * 1000).toISOString(),
    aiAnalysis: aiResult,
    beforeImage,
    afterImage: null,
    reportedBy: {
      name: "Aarav Sharma (Citizen)",
      phone: "+91 98450 12345",
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
  };

  db.complaints = [newTicket, ...(db.complaints || [])];
  saveDB(db);

  return res.status(201).json({
    success: true,
    message: "Complaint registered and analyzed by Neural Waste Classifier",
    complaint: newTicket
  });
});

// 3. Supervisor: Assign Worker
router.post('/:id/assign', (req, res) => {
  const { id } = req.params;
  const { workerId } = req.body;
  const db = getDB();

  const worker = db.workers?.find(w => w.id === workerId);
  if (!worker) {
    return res.status(404).json({ error: "Worker not found" });
  }

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      updatedComplaint = {
        ...c,
        status: "in_progress",
        assignedWorkerId: worker.id,
        assignedWorkerName: worker.name,
        assignedTeam: worker.team
      };
      return updatedComplaint;
    }
    return c;
  });

  if (!updatedComplaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  // Increment worker active tasks count
  db.workers = (db.workers || []).map(w => {
    if (w.id === workerId) {
      return { ...w, activeTasksCount: (w.activeTasksCount || 0) + 1 };
    }
    return w;
  });

  saveDB(db);
  return res.json({ success: true, complaint: updatedComplaint });
});

// 4. Worker: Upload Evidence & Submit for Verification
router.post('/:id/evidence', upload.single('afterPhoto'), (req, res) => {
  const { id } = req.params;
  const { afterImageUrl, weightKg, mrfDestination, workerId } = req.body;
  const db = getDB();

  let afterImage = afterImageUrl || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80";
  if (req.file) {
    afterImage = `/uploads/${req.file.filename}`;
  }

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      updatedComplaint = {
        ...c,
        status: "awaiting_verification",
        afterImage,
        collectedWeightKg: Number(weightKg) || 45,
        mrfDestination: mrfDestination || "Municipal MRF Unit #12 - Indiranagar"
      };
      return updatedComplaint;
    }
    return c;
  });

  if (!updatedComplaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  // Update worker metrics
  if (workerId) {
    db.workers = (db.workers || []).map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          completedToday: (w.completedToday || 0) + 1,
          totalKgClearedToday: (w.totalKgClearedToday || 0) + (Number(weightKg) || 45),
          earningsToday: (w.earningsToday || 0) + 250,
          activeTasksCount: Math.max(0, (w.activeTasksCount || 1) - 1)
        };
      }
      return w;
    });
  }

  saveDB(db);
  return res.json({ success: true, complaint: updatedComplaint });
});

// 5. Citizen: Dual Verification & Green Points Reward
router.post('/:id/verify-citizen', (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const db = getDB();

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      updatedComplaint = {
        ...c,
        status: "verified",
        reportedBy: {
          ...c.reportedBy,
          isCitizenVerified: true,
          citizenRating: Number(rating) || 5
        }
      };
      return updatedComplaint;
    }
    return c;
  });

  if (!updatedComplaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  // Award +50 Green Points to Citizen Balance
  db.citizenPoints = (db.citizenPoints || 650) + 50;
  saveDB(db);

  return res.json({
    success: true,
    message: "+50 Green Points credited to your Civic Wallet!",
    pointsAwarded: 50,
    newBalance: db.citizenPoints,
    complaint: updatedComplaint
  });
});

// 6. Supervisor: Audit Action (Approve, Rework, Ground Inspect)
router.post('/:id/audit-supervisor', (req, res) => {
  const { id } = req.params;
  const { action, rating, notes } = req.body; // action: 'approve' | 'rework' | 'ground_inspect'
  const db = getDB();

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      if (action === 'approve') {
        updatedComplaint = {
          ...c,
          status: "verified",
          supervisorRating: Number(rating) || 5,
          supervisorNotes: notes || "Audited and approved by Ward Sanitary Officer."
        };
      } else if (action === 'rework') {
        updatedComplaint = {
          ...c,
          status: "in_progress",
          supervisorNotes: notes || "Re-cleaning requested by supervisor audit."
        };
      } else {
        updatedComplaint = {
          ...c,
          supervisorNotes: notes || "Ground sanitary inspector dispatched for manual audit."
        };
      }
      return updatedComplaint;
    }
    return c;
  });

  if (!updatedComplaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  saveDB(db);
  return res.json({ success: true, complaint: updatedComplaint });
});

// 7. Worker: Trigger SOS Blocker Alert
router.post('/:id/sos', (req, res) => {
  const { id } = req.params;
  const { reason, notes } = req.body;
  const db = getDB();

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      updatedComplaint = {
        ...c,
        priority: "critical",
        sosAlert: {
          reason: reason || "Machinery or Safety Blocker",
          notes: notes || "",
          reportedAt: new Date().toISOString()
        }
      };
      return updatedComplaint;
    }
    return c;
  });

  if (!updatedComplaint) {
    return res.status(404).json({ error: "Complaint not found" });
  }

  saveDB(db);
  return res.json({ success: true, complaint: updatedComplaint });
});

// 8. Resolve SOS Blocker
router.post('/:id/resolve-sos', (req, res) => {
  const { id } = req.params;
  const db = getDB();

  let updatedComplaint = null;
  db.complaints = (db.complaints || []).map(c => {
    if (c.id === id) {
      updatedComplaint = { ...c, sosAlert: null };
      return updatedComplaint;
    }
    return c;
  });

  saveDB(db);
  return res.json({ success: true, complaint: updatedComplaint });
});

export default router;
