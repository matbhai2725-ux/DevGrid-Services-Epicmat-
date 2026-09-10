import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, CheckCircle2, MessageSquare, ShieldCheck, Copy } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { playSound } from '../utils/audio';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  prefilledSummary?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  preselectedService,
  prefilledSummary,
}: ContactModalProps) {
  const [discordTag, setDiscordTag] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(preselectedService?.id || 'discord-bots');
  const [budget, setBudget] = useState('$25 - $100');
  const [timeline, setTimeline] = useState('Standard (3-5 Days)');
  const [details, setDetails] = useState(prefilledSummary || '');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }
    const randomTicket = `DEVGRID-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicketId(randomTicket);
  };

  const handleCopyTicket = () => {
    playSound('click');
    const summary = `Ticket ID: ${submittedTicketId}\nDiscord Tag: ${discordTag}\nService: ${serviceId}\nBudget: ${budget}\nDetails: ${details}`;
    navigator.clipboard.writeText(summary);
  };

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="contact-modal-content"
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0c101c] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                {submittedTicketId ? 'Ticket Dispatched!' : 'Open DevGrid Project Ticket'}
              </h3>
              <p className="text-xs text-slate-400">Direct response via Discord or Email within 18 minutes</p>
            </div>
          </div>
          <button
            id="close-ticket-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedTicketId ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Ticket #{submittedTicketId} Created
            </h4>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your service request has been queued in our engineering dispatch hub. Our developers are reviewing your requirements.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Ticket Reference:</span>
                <span className="text-cyan-400 font-bold">#{submittedTicketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Discord Contact:</span>
                <span className="text-white">{discordTag || 'Direct Web Submission'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold">ASSIGNED TO ENGINEER</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                id="copy-submitted-ticket-btn"
                onClick={handleCopyTicket}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Ticket Reference</span>
              </button>
              <button
                id="done-ticket-modal-btn"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Ticket Submission Form */
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Discord Username / Tag *
                </label>
                <input
                  id="ticket-discord-input"
                  type="text"
                  required
                  value={discordTag}
                  onChange={(e) => setDiscordTag(e.target.value)}
                  placeholder="e.g. dev_alex or alex#1234"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  id="ticket-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Primary Service
                </label>
                <select
                  id="ticket-service-select"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Target Budget
                </label>
                <select
                  id="ticket-budget-select"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="$20 - $50">$20 - $50 (Micro / Hosting)</option>
                  <option value="$50 - $150">$50 - $150 (Standard Bot / Setup)</option>
                  <option value="$150 - $400">$150 - $400 (Website / Minecraft Network)</option>
                  <option value="$400+">$400+ (Full Custom Architecture)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Target Timeline
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Rush (< 48h)', 'Standard (3-5 Days)', 'Flexible (1-2 Weeks)'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      playSound('hover');
                      setTimeline(t);
                    }}
                    className={`py-2 px-2 text-[11px] font-mono rounded-lg border text-center transition-all cursor-pointer ${
                      timeline === t
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                Requirements & Project Notes
              </label>
              <textarea
                id="ticket-details-textarea"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us what you want to build, what features are must-haves, or paste your bot commands list..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No upfront charge required</span>
              </div>

              <button
                id="submit-ticket-form-btn"
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 fill-slate-950" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
