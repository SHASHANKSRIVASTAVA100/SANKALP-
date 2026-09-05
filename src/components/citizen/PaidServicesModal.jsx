import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PAID_SERVICES_CATALOG } from '../../data/mockData';
import {
  Sparkles,
  X,
  Calendar,
  Building,
  CheckCircle,
  Truck,
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';

export const PaidServicesModal = ({ isOpen, onClose }) => {
  const { addNotification, playChime } = useApp();

  const [selectedService, setSelectedService] = useState(PAID_SERVICES_CATALOG[0]);
  const [eventDate, setEventDate] = useState("2026-09-08");
  const [guestCount, setGuestCount] = useState(150);
  const [spaceAddress, setSpaceAddress] = useState("Royal Grand Banquet Hall, 80 Feet Road, Indiranagar");
  const [contactPhone, setContactPhone] = useState("+91 98450 12345");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingToken, setBookingToken] = useState("");

  if (!isOpen) return null;

  // Calculate dynamic price based on guest count or unit size
  const calculatedPrice = selectedService.id === 'PAID-01'
    ? selectedService.basePrice + Math.max(0, Math.ceil((guestCount - 100) / 50)) * 499
    : selectedService.basePrice;

  const handleBooking = (e) => {
    e.preventDefault();
    const token = `SLOT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingToken(token);
    setIsBooked(true);
    playChime('success');
    addNotification(
      "Paid Service Booked! 🚛",
      `Booking ${token} confirmed for ${selectedService.title}. Dedicated crew scheduled.`,
      "success"
    );
  };

  const handleResetAndClose = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-900 p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                On-Demand & Commercial Waste Services
              </h2>
              <p className="text-xs text-slate-400">
                Book professional post-function clearing or scheduled commercial pickups for shops & factories
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4 max-w-lg mx-auto overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Booking Confirmed & Dispatched!</h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Digital Service Token:</div>
              <div className="text-2xl font-mono font-extrabold text-emerald-400">{bookingToken}</div>
              <div className="text-xs text-slate-300">
                Assigned Team: <strong className="text-white">Zone 12 Rapid Commercial Unit</strong>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Our crew will arrive with segregated bins and mechanical support at the scheduled slot. Municipal compliance certificate will be issued upon completion.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto flex-1">
            {/* Service Selection Catalog (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Select Service Type:
              </label>

              {PAID_SERVICES_CATALOG.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedService.id === srv.id
                      ? 'bg-teal-950/40 border-teal-500/80 ring-2 ring-teal-500/20 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{srv.title}</span>
                    <span className="text-[10px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded font-mono">
                      {srv.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{srv.description}</p>
                  <div className="mt-2 text-xs font-mono font-bold text-emerald-400">
                    From ₹{srv.basePrice} <span className="text-[10px] text-slate-400 font-normal">({srv.priceUnit})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Form & Calculator (7 Cols) */}
            <form onSubmit={handleBooking} className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-teal-300">
                  Configure Booking: {selectedService.title}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  SLA: {selectedService.turnaround}
                </span>
              </div>

              {/* Dynamic input for event vs commercial */}
              {selectedService.id === 'PAID-01' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Event / Function Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Estimated Guests ({guestCount} guests)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full mt-2 accent-teal-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Daily Preferred Slot
                    </label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500">
                      <option>Morning Slot (08:00 AM - 09:30 AM)</option>
                      <option>Evening Post-Close (09:00 PM - 10:30 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Premise Type
                    </label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500">
                      <option>Retail Shop / Boutique</option>
                      <option>Restaurant / Eatery / Cloud Kitchen</option>
                      <option>Small Manufacturing Unit / Workshop</option>
                      <option>Corporate Office / Tech Space</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Space Address */}
              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Location / Venue Address
                </label>
                <input
                  type="text"
                  value={spaceAddress}
                  onChange={(e) => setSpaceAddress(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">
                  Coordinator Contact Number
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Package Inclusions */}
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Package Guarantees:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                  {selectedService.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Calculation & Checkout */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Quotation:</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    ₹{calculatedPrice}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(Taxes & Labor Included)</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Confirm & Schedule Pickup
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
