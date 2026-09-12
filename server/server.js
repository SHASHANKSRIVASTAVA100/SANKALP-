import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import fleetRoutes from './routes/fleetRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import eprRoutes from './routes/eprRoutes.js';
import botRoutes from './routes/botRoutes.js';
import { getDB, saveDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Serve static uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/epr', eprRoutes);
app.use('/api/bot', botRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Swachhta Sangam Real-Life Municipal Waste Operations Backend',
    version: '2.0.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Serve compiled frontend assets from dist (allows full app on port 5000 as well)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side single page app routing
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server for live RTK GPS Telematics
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('[WebSocket] Client connected to live GPS telematics stream');

  // Send initial fleet state
  const db = getDB();
  ws.send(JSON.stringify({
    type: 'FLEET_INIT',
    vehicles: db.vehicles || []
  }));

  ws.on('close', () => {
    console.log('[WebSocket] Client disconnected');
  });
});

// Periodic GPS Telematics Broadcast Loop (Every 3 seconds)
setInterval(() => {
  const db = getDB();
  if (db.vehicles && db.vehicles.length > 0) {
    db.vehicles = db.vehicles.map((v) => {
      // Simulate real-world moving trajectory
      const nextProgress = v.routeProgress >= 98 ? 15 : v.routeProgress + 1;
      const nextDistance = v.distanceFromUserMeters <= 80 ? 320 : Math.max(50, v.distanceFromUserMeters - 15);
      const nextEta = Math.max(1, Math.round(nextDistance / 80));

      return {
        ...v,
        distanceFromUserMeters: nextDistance,
        estimatedArrivalMinutes: nextEta,
        routeProgress: nextProgress,
        currentLocation: {
          lat: v.currentLocation.lat + (Math.random() - 0.5) * 0.0004,
          lng: v.currentLocation.lng + (Math.random() - 0.5) * 0.0004
        }
      };
    });

    saveDB(db);

    const broadcastPayload = JSON.stringify({
      type: 'GPS_TELEMETRY_TICK',
      timestamp: new Date().toISOString(),
      vehicles: db.vehicles
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(broadcastPayload);
      }
    });
  }
}, 3000);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ [Backend Server] Port ${PORT} is already in use by another instance.`);
  } else {
    console.error('❌ [Backend Server] Server error:', err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`🚀 Swachhta Sangam Backend API is running on port ${PORT}`);
  console.log(`📡 WebSocket GPS Telematics active at ws://localhost:${PORT}`);
  console.log(`=================================================`);
});
