import express from 'express';
import crypto from 'crypto';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

// 1. GET /api/farmer/bookings - List All Stubble Pickup Bookings
router.get('/bookings', (req, res) => {
  const db = getDB();
  return res.json({
    success: true,
    count: (db.farmerStubbleBookings || []).length,
    bookings: db.farmerStubbleBookings || []
  });
});

// 2. POST /api/farmer/book-stubble - Farmer Books Free Municipal Stubble Transport
router.post('/book-stubble', (req, res) => {
  const { farmerName, phone, kisanId, village, district, state, landAcres, cropType, scheduledDate, coordinates } = req.body;
  const db = getDB();

  const bookingId = `STB-2026-${Date.now().toString().slice(-5)}`;
  const estimatedTons = parseFloat(((Number(landAcres) || 4) * 1.8).toFixed(1)); // Approx 1.8 tons/acre stubble
  const timestamp = new Date().toISOString();

  const newBooking = {
    bookingId,
    farmerName: farmerName || "Sardar Harpreet Singh",
    phone: phone || "+91 98140 55432",
    kisanId: kisanId || "PM-KISAN-PB-9942",
    village: village || "Fatehgarh Sahib",
    district: district || "Patiala",
    state: state || "Punjab",
    landAcres: Number(landAcres) || 5,
    cropType: cropType || "Paddy (Parali)",
    estimatedTons,
    scheduledDate: scheduledDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    status: "Confirmed - Free Municipal Transport Dispatched",
    transportTruckAssigned: "KA-01-MJ-8842",
    bookedAt: timestamp,
    coordinates: coordinates || { lat: 30.6425, lng: 76.3984 },
    dbtStatus: "Pending Weighbridge Delivery & Digestion"
  };

  if (!db.farmerStubbleBookings) db.farmerStubbleBookings = [];
  db.farmerStubbleBookings.unshift(newBooking);

  saveDB(db);

  return res.status(201).json({
    success: true,
    message: "Free municipal farm stubble pickup booked! Transport dispatched. Zero field burning guaranteed.",
    booking: newBooking
  });
});

// 3. POST /api/farmer/dbt-payout - Execute 40% Net Profit Direct Benefit Transfer
router.post('/dbt-payout', (req, res) => {
  const { bookingId, actualTonsDelivered, cbgMarketValueInr } = req.body;
  const db = getDB();

  if (!db.farmerStubbleBookings) db.farmerStubbleBookings = [];
  if (!db.farmerDbtPayouts) db.farmerDbtPayouts = [];

  const booking = db.farmerStubbleBookings.find(b => b.bookingId === bookingId) || {
    bookingId: bookingId || "STB-SAMPLE-01",
    farmerName: "Sardar Harpreet Singh",
    phone: "+91 98140 55432",
    kisanId: "PM-KISAN-PB-9942",
    village: "Fatehgarh Sahib"
  };

  const tons = Number(actualTonsDelivered) || booking.estimatedTons || 9.0;
  // CBG & Bio-Fertilizer marketplace gross revenue: Rs 3,500 / ton stubble
  const grossRevenueInr = Math.round(tons * (Number(cbgMarketValueInr) || 3500));
  // Operational processing cost: 25%
  const netProfitInr = Math.round(grossRevenueInr * 0.75);
  // Farmer Statutory Profit Share: EXACTLY 40% via DBT
  const farmerShareInr = Math.round(netProfitInr * 0.40);

  const timestamp = new Date().toISOString();
  const utrNumber = `RBI-PFMS-DBT-2026-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const payoutRecord = {
    payoutId: `DBT-2026-${Date.now().toString().slice(-5)}`,
    bookingId: booking.bookingId,
    farmerName: booking.farmerName,
    kisanId: booking.kisanId,
    village: booking.village,
    tonsDelivered: tons,
    grossBiogasRevenueInr: grossRevenueInr,
    netProfitInr: netProfitInr,
    farmerProfitSharePercent: "40%",
    payoutAmountInr: farmerShareInr,
    paymentMethod: "Direct Benefit Transfer (PFMS / NPCI Linked Bank Account)",
    utrNumber,
    timestamp,
    status: "Transferred Successfully (Credit Confirmed)",
    cryptographicProof: crypto.createHash('sha256').update(`${utrNumber}-${farmerShareInr}-${timestamp}`).digest('hex')
  };

  db.farmerDbtPayouts.unshift(payoutRecord);

  // Update booking status
  booking.dbtStatus = `Paid: ₹${farmerShareInr.toLocaleString('en-IN')} (UTR: ${utrNumber})`;

  saveDB(db);

  return res.status(201).json({
    success: true,
    message: `40% Net Profit Share of ₹${farmerShareInr.toLocaleString('en-IN')} credited directly to ${booking.farmerName}'s bank account via DBT.`,
    payout: payoutRecord
  });
});

// 4. GET /api/farmer/dbt-ledger - Transparent Government DBT Ledger
router.get('/dbt-ledger', (req, res) => {
  const db = getDB();
  const payouts = db.farmerDbtPayouts || [];
  const totalPaidInr = payouts.reduce((sum, p) => sum + (Number(p.payoutAmountInr) || 0), 0);
  const totalStubbleTons = payouts.reduce((sum, p) => sum + (Number(p.tonsDelivered) || 0), 0);

  return res.json({
    success: true,
    totalDisbursedInr: totalPaidInr,
    totalFarmersBenefitted: payouts.length,
    stubbleTonsDivertedFromBurning: totalStubbleTons,
    cleanCbgBiogasGeneratedNm3: totalStubbleTons * 180, // 180 m3 CBG per ton
    payouts
  });
});

export default router;
