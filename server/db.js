import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// In-memory cache
let cachedDB = null;

export const getDB = () => {
  if (!cachedDB) {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        cachedDB = JSON.parse(raw);
      } else {
        cachedDB = {
          users: {},
          complaints: [],
          workers: [],
          vehicles: [],
          hotspots: [],
          eprCompanies: [],
          citizenPoints: 650
        };
      }
    } catch (err) {
      console.error('Error reading database file:', err);
      cachedDB = {};
    }
  }
  return cachedDB;
};

export const saveDB = (newDB) => {
  cachedDB = newDB;
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(newDB, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
};
