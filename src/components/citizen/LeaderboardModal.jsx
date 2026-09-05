import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CITIZEN_LEADERBOARD } from '../../data/mockData';
import {
  Trophy,
  X,
  Medal,
  Award,
  Sparkles,
  Gift,
  Check,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const LeaderboardModal = ({ isOpen, onClose }) => {
  const { citizenPoints, addNotification, playChime } = useApp();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'rewards'

  if (!isOpen) return null;

  const rewards = [
    {
      id: "REW-01",
      title: "10 KG Organic Municipal Bio-Compost Bag",
      pointsCost: 300,
      description: "Produced from city wet waste at the Indiranagar MRF composting unit.",
      icon: "🌱"
    },
    {
      id: "REW-02",
      title: "5% Property Tax Green Citizen Rebate Token",
      pointsCost: 500,
      description: "Official municipal credit voucher for annual urban property tax deduction.",
      icon: "🏛️"
    },
    {
      id: "REW-03",
      title: "Namma Metro Pass ₹150 Recharge Credit",
      pointsCost: 400,
      description: "Eco-transit credit automatically topped up to your linked smart card.",
      icon: "🚆"
    }
  ];

  const handleRedeem = (reward) => {
    if (citizenPoints < reward.pointsCost) {
      alert("Insufficient Green Points to redeem this reward yet!");
      return;
    }
    playChime('success');
    addNotification(
      "Reward Claimed! 🎁",
      `You successfully redeemed "${reward.title}"! Digital redemption code: SIH-ECO-${Math.floor(1000 + Math.random() * 9000)}.`,
      "success"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto sm:my-8 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Citizen Green Leaderboard & Rewards
              </h2>
              <p className="text-xs text-slate-400">Recognizing citizen vigilance in keeping Bengaluru spotless</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Balance Header Strip */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300 text-base sm:text-lg shrink-0">
              ✨
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Your Current Civic Wallet:</div>
              <div className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-emerald-400">{citizenPoints}</span>
                <span className="text-xs font-semibold text-slate-400">Green Points</span>
              </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              City Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rewards Store
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'leaderboard' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-500 px-3 uppercase tracking-wider">
                <div className="col-span-2 sm:col-span-1">Rank</div>
                <div className="col-span-7 sm:col-span-6">Citizen Name & Ward</div>
                <div className="hidden sm:block sm:col-span-2 text-center">Verified</div>
                <div className="col-span-3 text-right">Green Points</div>
              </div>

              {CITIZEN_LEADERBOARD.map((user) => {
                const isYou = user.name.includes("You");
                const currentPoints = isYou ? citizenPoints : user.points;

                return (
                  <div
                    key={user.rank}
                    className={`grid grid-cols-12 items-center p-3 rounded-xl border text-xs transition-all ${
                      isYou
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="col-span-2 sm:col-span-1 flex items-center font-bold">
                      {user.rank === 1 && <span className="text-amber-400 text-base">🥇</span>}
                      {user.rank === 2 && <span className="text-slate-300 text-base">🥈</span>}
                      {user.rank === 3 && <span className="text-amber-600 text-base">🥉</span>}
                      {user.rank > 3 && <span className="text-slate-400 font-mono">#{user.rank}</span>}
                    </div>

                    <div className="col-span-7 sm:col-span-6">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span className="truncate">{user.name}</span>
                        <span className="text-[10px] bg-slate-800 text-emerald-400 px-1.5 py-0.2 rounded-full font-normal shrink-0">
                          {user.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{user.ward}</div>
                    </div>

                    <div className="hidden sm:block sm:col-span-2 text-center font-mono text-slate-300">
                      {user.complaintsVerified} cleanups
                    </div>

                    <div className="col-span-3 text-right font-mono font-bold text-emerald-400 text-xs sm:text-sm">
                      {currentPoints} pts
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rewards.map((r) => (
                <div
                  key={r.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-all"
                >
                  <div>
                    <div className="text-3xl mb-2">{r.icon}</div>
                    <h4 className="font-bold text-sm text-white">{r.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{r.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {r.pointsCost} Pts
                    </span>
                    <button
                      onClick={() => handleRedeem(r)}
                      disabled={citizenPoints < r.pointsCost}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        citizenPoints >= r.pointsCost
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
