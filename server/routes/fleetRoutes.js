import express from 'express';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

// Helper: Haversine distance calculation in meters
export const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
};

// 1. Get Fleet
router.get('/', (req, res) => {
  const db = getDB();
  return res.json({ success: true, vehicles: db.vehicles || [] });
});

// 2. Compute Proximity
router.post('/proximity', (req, res) => {
  const { userLat, userLng, vehicleId } = req.body;
  const db = getDB();

  const vehicle = (db.vehicles || []).find(v => v.id === (vehicleId || 'VH-102')) || db.vehicles?.[0];
  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" });
  }

  const citizenLat = Number(userLat) || 12.9784;
  const citizenLng = Number(userLng) || 77.6408;

  const distanceMeters = calculateDistanceMeters(
    citizenLat,
    citizenLng,
    vehicle.currentLocation.lat,
    vehicle.currentLocation.lng
  );

  const speedMps = (vehicle.speedKmH * 1000) / 3600 || 5;
  const etaMinutes = Math.max(1, Math.round(distanceMeters / (speedMps * 60)));
  const isNearby = distanceMeters <= 300;

  return res.json({
    success: true,
    vehicleId: vehicle.id,
    registrationNo: vehicle.registrationNo,
    distanceMeters,
    etaMinutes,
    isNearby,
    shouldAlert: isNearby
  });
});

export default router;
