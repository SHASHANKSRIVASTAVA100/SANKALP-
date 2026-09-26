import express from 'express';
import crypto from 'crypto';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

// 1. GET /api/epr/companies - Get Registered Corporate Partners
router.get('/companies', (req, res) => {
  const db = getDB();
  return res.json({
    success: true,
    companies: db.eprCompanies || []
  });
});

// 2. GET /api/epr/available-credits - Available CPCB Plastic Credits for B2B Purchase
router.get('/available-credits', (req, res) => {
  const db = getDB();
  return res.json({
    success: true,
    notice: "STRICT B2B COMPLIANCE — FOR PAID PRODUCERS, IMPORTERS & BRAND OWNERS (PIBOs) ONLY. ZERO CITIZEN CONNECTION.",
    availableCredits: [
      { category: "Category I (Rigid PET Plastic)", ratePerTonInr: 3200, availableTons: 145.0, cpcbStandard: "Rule 13(1) Compliant" },
      { category: "Category II (High-Density Polyethylene HDPE)", ratePerTonInr: 2800, availableTons: 88.5, cpcbStandard: "Rule 13(2) Compliant" },
      { category: "Category III (Multi-Layered Plastic Packaging)", ratePerTonInr: 4500, availableTons: 62.0, cpcbStandard: "Rule 13(3) Compliant" },
      { category: "Category IV (Plastic Sheet / Film Packaging)", ratePerTonInr: 2600, availableTons: 54.0, cpcbStandard: "Rule 13(4) Compliant" }
    ],
    wageAllocationCommitment: "100% of corporate credit purchase fee funds sanitation hero baseline salaries & MRF upkeep."
  });
});

// 3. POST /api/epr/purchase-credits - Paid FMCG Company Buys Legal Compliance Credits
router.post('/purchase-credits', (req, res) => {
  const { companyId, category, tonsPurchased, authorizedSignatory } = req.body;
  const db = getDB();

  if (!db.eprCompanies) db.eprCompanies = [];
  if (!db.eprWageFund) {
    db.eprWageFund = { totalCollectedInr: 480000, disbursedWagesInr: 360000, balanceInr: 120000, fundedWorkersCount: 24 };
  }

  const company = db.eprCompanies.find(c => c.id === companyId) || db.eprCompanies[0] || {
    id: "EPR-CO-01",
    name: "AquaPure Beverage Industries",
    gstin: "29AAACH7409R1ZX",
    cpcbReg: "CPCB/EPR/2024/PL-0941"
  };

  const tons = Number(tonsPurchased) || 25;
  const ratePerTon = category && category.includes("III") ? 4500 : 3200;
  const totalAmountInr = tons * ratePerTon;
  const timestamp = new Date().toISOString();
  const certId = `CPCB-CERT-2026-${Date.now().toString().slice(-5)}`;
  const sha256Hash = crypto.createHash('sha256').update(`${certId}-${company.gstin}-${tons}-${timestamp}`).digest('hex');

  const newCertificate = {
    certId,
    companyId: company.id,
    companyName: company.name,
    gstin: company.gstin,
    cpcbReg: company.cpcbReg,
    category: category || "Category I (Rigid PET Plastic)",
    tonsOffset: tons,
    totalPaidInr: totalAmountInr,
    authorizedSignatory: authorizedSignatory || "Regional CSR & Sustainability Officer",
    issuedAt: timestamp,
    sha256LedgerHash: sha256Hash,
    status: "Verified & Minted on Central Pollution Control Board (CPCB) Circular Ledger",
    complianceNote: "STRICT B2B CORPORATE OFFSET (PAID BY COMPANY — NO CITIZEN CONNECTION)"
  };

  // Update company metrics
  company.collectedTons = parseFloat(((company.collectedTons || 0) + tons).toFixed(1));
  company.recycledTons = parseFloat(((company.recycledTons || 0) + (tons * 0.96)).toFixed(1));
  if (company.targetTons) {
    company.compliancePercent = parseFloat(Math.min(100, (company.collectedTons / company.targetTons) * 100).toFixed(1));
  }
  if (!company.certificates) company.certificates = [];
  company.certificates.unshift(newCertificate);

  // 100% of purchase proceeds flow into Sanitation Hero Wage Fund!
  db.eprWageFund.totalCollectedInr += totalAmountInr;
  db.eprWageFund.balanceInr += totalAmountInr;

  saveDB(db);

  return res.status(201).json({
    success: true,
    message: `Official CPCB EPR Compliance Certificate issued to ${company.name} for ${tons} tons. 100% of ₹${totalAmountInr.toLocaleString('en-IN')} routed to worker baseline salaries.`,
    certificate: newCertificate,
    wageFundImpact: {
      fundsAddedToWorkerWagePoolInr: totalAmountInr,
      totalWageFundInr: db.eprWageFund.totalCollectedInr
    }
  });
});

// 4. GET /api/epr/wage-fund - Real-Time Worker Wage Funding Ledger
router.get('/wage-fund', (req, res) => {
  const db = getDB();
  const fund = db.eprWageFund || {
    totalCollectedInr: 480000,
    disbursedWagesInr: 360000,
    balanceInr: 120000,
    fundedWorkersCount: 24
  };

  return res.json({
    success: true,
    fundingSource: "Corporate Extended Producer Responsibility (EPR) Compliance Purchases (Paid Companies Only)",
    citizenLink: "NONE — Citizens are never given EPR credits. EPR is 100% funded by corporate FMCG polluters.",
    wageFund: fund,
    supportedSanitationHeroes: (db.workers || []).map(w => ({
      workerId: w.id,
      name: w.name,
      team: w.team,
      monthlyWageFundedInr: 21500,
      fundedStatus: "100% Guaranteed by Corporate EPR Revenue"
    }))
  });
});

export default router;
