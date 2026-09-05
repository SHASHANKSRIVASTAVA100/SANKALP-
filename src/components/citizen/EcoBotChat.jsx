import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../services/api';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Phone,
  HelpCircle,
  ShieldAlert,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export const EcoBotChat = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "bot",
      text: "Namaste! I am Swachhta AI, your smart waste segregation assistant for Swachhta Sangam. Ask me anything about waste categories, recycling rules, or municipal bylaws!"
    }
  ]);
  const [inputText, setInputText] = useState("");

  // Lock body scroll on open to prevent background screen from rolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Where do coconut shells go?",
    "How to dispose of tube lights and batteries?",
    "What are the fines for mixed waste?",
    "When does the truck visit Ward 12?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { id: "msg-" + Date.now(), sender: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    try {
      const response = await apiClient.bot.ask(query, language);
      const reply = response?.reply || "♻️ Swachh Tip: Rinse milk pouches and food plastic before dropping into the blue dry waste bin. Green bin is strictly for wet food!";
      setMessages(prev => [...prev, { id: "msg-" + (Date.now() + 1), sender: "bot", text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: "msg-" + (Date.now() + 1), sender: "bot", text: "♻️ Please segregate organic wet waste into the green bin and recyclables into the blue bin." }]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overscroll-contain overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col h-[600px] max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-3.5 sm:p-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Swachhta AI Helpline</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.2 rounded border border-emerald-500/30">
                  ONLINE 24x7
                </span>
              </div>
              <p className="text-xs text-slate-400">Instant answers on waste segregation, fines, and recycling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Helpline Strip */}
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Municipal Sanitation Control Helpline:
          </span>
          <a
            href="tel:18004259988"
            className="text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            1800-425-9988 (Toll Free)
          </a>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none shadow'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-full transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your waste disposal query (e.g. how to pack broken glass)..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
