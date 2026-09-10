import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Bot, 
  Globe, 
  Server, 
  Gamepad2, 
  Cpu, 
  Wrench, 
  Check, 
  Copy, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceId, ServiceItem } from '../types';
import { playSound } from '../utils/audio';

interface InteractiveConfiguratorProps {
  onOpenTicketWithPayload?: (summary: string) => void;
  initialServiceId?: ServiceId;
}

interface TierConfig {
  name: string;
  badge: string;
  multiplier: number;
  basePrice: number;
  desc: string;
}

const TIERS: Record<string, TierConfig> = {
  starter: {
    name: 'Starter / Community',
    badge: 'Affordable',
    multiplier: 1.0,
    basePrice: 25,
    desc: 'Perfect for small communities, hobbyists, or initial project rollouts.',
  },
  pro: {
    name: 'Pro / Growth',
    badge: 'Most Popular',
    multiplier: 1.8,
    basePrice: 45,
    desc: 'High-concurrency logic, priority delivery, and custom integrations.',
  },
  enterprise: {
    name: 'Enterprise / Custom',
    badge: 'Maximum Power',
    multiplier: 3.2,
    basePrice: 90,
    desc: 'Full-scale architecture, dedicated infrastructure, SLA & NDA guarantees.',
  },
};

export default function InteractiveConfigurator({
  onOpenTicketWithPayload,
  initialServiceId = 'discord-bots',
}: InteractiveConfiguratorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    '24/7 Monitored Uptime Alerting',
    'Custom Configuration Walkthrough',
  ]);
  const [customNotes, setCustomNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const currentService = useMemo(() => {
    return SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  }, [selectedServiceId]);

  const availableAddonsList = useMemo(() => {
    return [
      { name: 'Priority 24h Rush Delivery', price: 20 },
      { name: '24/7 Monitored Uptime Alerting', price: 5 },
      { name: 'Custom Configuration Walkthrough', price: 10 },
      { name: 'Extended 90-day Warranty & Bugfixes', price: 25 },
      { name: 'Automated Daily Cloud Backup Snapshot', price: 8 },
      ...currentService.popularAddons.map((addon, idx) => ({
        name: addon,
        price: 15 + (idx % 3) * 10,
      })),
    ];
  }, [currentService]);

  const toggleAddon = (name: string) => {
    playSound('click');
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  // Estimated Pricing Calculation
  const calculation = useMemo(() => {
    // parse base price numeric
    const rawPrice = parseInt(currentService.startingPrice.replace(/[^0-9]/g, ''), 10) || 25;
    const tierMultiplier = TIERS[selectedTier].multiplier;
    const tierBase = Math.round(rawPrice * tierMultiplier);

    let addonsTotal = 0;
    selectedAddons.forEach((selected) => {
      const found = availableAddonsList.find((a) => a.name === selected);
      if (found) addonsTotal += found.price;
    });

    const isRecurring = currentService.id === 'bot-hosting';
    const estimatedTotal = tierBase + addonsTotal;

    return {
      tierBase,
      addonsTotal,
      estimatedTotal,
      isRecurring,
    };
  }, [currentService, selectedTier, selectedAddons, availableAddonsList]);

  const generatedTicketSummary = `[DEVGRID SERVICES TICKET]
• Service: ${currentService.title}
• Tier: ${TIERS[selectedTier].name}
• Estimated Cost: $${calculation.estimatedTotal}${calculation.isRecurring ? '/mo' : ' (one-time)'}
• Selected Addons (${selectedAddons.length}):
${selectedAddons.map((a) => `  - ${a}`).join('\n')}
• Custom Notes: ${customNotes || 'None specified.'}
• Generated via DevGrid Interactive 3D Configurator`;

  const handleCopyTicket = () => {
    playSound('success');
    navigator.clipboard.writeText(generatedTicketSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleOpenTicket = () => {
    playSound('success');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#818cf8', '#10b981', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
    if (onOpenTicketWithPayload) {
      onOpenTicketWithPayload(generatedTicketSummary);
    }
  };

  return (
    <section id="configurator" className="py-16 sm:py-24 bg-[#090b10] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOM SPECS & PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            DevGrid Interactive Configurator
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Tailor your digital service package with transparent real-time pricing and generate an instant Discord ticket format.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Configurator Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-[#0d111c] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">1</span>
                  Select Digital Service
                </label>
                <span className="text-xs text-slate-400">6 Specialized Hubs</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICES_DATA.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <button
                      key={service.id}
                      id={`config-select-${service.id}`}
                      onClick={() => {
                        playSound('click');
                        setSelectedServiceId(service.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base">{service.title === 'Discord Bots' ? '🤖' : service.title === 'Websites & Apps' ? '🌐' : service.title === 'Bot Hosting' ? '🛠️' : service.title === 'Minecraft Services' ? '🎮' : service.title === 'Custom Development' ? '⚙️' : '🔧'}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-xs font-semibold leading-tight">{service.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">{service.startingPrice}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Tier */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                  Choose Service Tier
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(TIERS) as Array<keyof typeof TIERS>).map((tierKey) => {
                  const tier = TIERS[tierKey];
                  const isSelected = selectedTier === tierKey;
                  return (
                    <button
                      key={tierKey}
                      id={`config-tier-${tierKey}`}
                      onClick={() => {
                        playSound('click');
                        setSelectedTier(tierKey);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-400 shadow-md shadow-indigo-950/30'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{tier.name.split('/')[0]}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                          {tier.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px]">3</span>
                  Select Add-ons & Engineering Extras
                </label>
                <span className="text-xs text-slate-400 font-mono">{selectedAddons.length} active</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableAddonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-cyan-950/30 border-cyan-500/60 text-white'
                          : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{addon.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400 shrink-0 ml-2">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Notes / Requirements Input */}
            <div>
              <label htmlFor="configurator-notes-input" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Project Specifics or Custom Requirements (Optional)
              </label>
              <textarea
                id="configurator-notes-input"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Need bot with custom economy and stripe payments, or Minecraft Purpur 1.21 setup..."
                rows={3}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Right / Live Quote Summary & Ticket Generator (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0e1424] to-[#090c16] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">Quote Estimate</span>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                Instant Lock-In
              </span>
            </div>

            <div className="my-6">
              <div className="text-xs text-slate-400">Total Investment Estimate</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                  ${calculation.estimatedTotal}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {calculation.isRecurring ? '/ month' : 'one-time fee'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Includes full configuration, code transfer & Discord support.
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 py-4 border-y border-slate-800 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Base ({currentService.title}):</span>
                <span className="text-white">${calculation.tierBase}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Selected Tier ({TIERS[selectedTier].name.split('/')[0]}):</span>
                <span className="text-emerald-400">Included</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Add-ons Total ({selectedAddons.length} selected):</span>
                <span className="text-cyan-300">+${calculation.addonsTotal}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery Window:</span>
                <span className="text-slate-200">{currentService.typicalDelivery}</span>
              </div>
            </div>

            {/* Generated Discord Ticket Box */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Pre-Formatted Discord Ticket</span>
                <button
                  id="copy-ticket-btn"
                  onClick={handleCopyTicket}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-36">
                {generatedTicketSummary}
              </pre>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                id="configurator-open-ticket-btn"
                onClick={handleOpenTicket}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Submit & Open Project Ticket</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>No commitment required • Free consultation</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
