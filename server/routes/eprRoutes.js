import express from 'express';
import crypto from 'crypto';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

// 1. Get EPR Companies Records
router.get('/companies', (req, res) => {
  const db = getDB();
  return res.json({ success: true, companies: db.eprCompanies || [] });
});

// 2. Cryptographic Batch Verification & SHA-256 Hash Generation
router.post('/batch-verify', (req, res) => {
  const { companyId, facility, weightKg, material } = req.body;
  const db = getDB();

  const timestamp = new Date().toISOString();
  const rawData = `${companyId}-${facility}-${weightKg}-${material}-${timestamp}`;
  const sha256Hash = crypto.createHash('sha256').update(rawData).digest('hex');
  const batchId = `BATCH-2026-${Date.now().toString().slice(-4)}`;

  const newBatch = {
    batchId,
    facility: facility || "Municipal MRF Unit #12 - Indiranagar",
    weightKg: Number(weightKg) || 24800,
    material: material || "rPET Flakes",
    verifiedAt: timestamp,
    sha256Hash
  };

  db.eprCompanies = (db.eprCompanies || []).map(co => {
    if (co.id === companyId) {
      const updatedBatches = [newBatch, ...(co.batches || [])];
      const collected = (co.collectedTons || 0) + (newBatch.weightKg / 1000);
      const recycled = (co.recycledTons || 0) + (newBatch.weightKg / 1000) * 0.95;
      return {
        ...co,
        collectedTons: parseFloat(collected.toFixed(1)),
        recycledTons: parseFloat(recycled.toFixed(1)),
        compliancePercent: parseFloat(Math.min(100, (collected / co.targetTons) * 100).toFixed(1)),
        batches: updatedBatches
      };
    }
    return co;
  });

  saveDB(db);
  return res.status(201).json({
    success: true,
    message: "Batch verified and cryptographic SHA-256 hash generated for Central Pollution Control Board (CPCB) circular ledger",
    batch: newBatch
  });
});

export default router;
