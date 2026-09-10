import { useState, useEffect } from 'react';
import { 
  Bot, 
  Globe, 
  Server, 
  Gamepad2, 
  Cpu, 
  Wrench, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { playSound } from '../utils/audio';

interface HeroSectionProps {
  onExploreServices: () => void;
  onOpenConfigurator: () => void;
  onOpenTicket: () => void;
  onSelectServiceFilter: (serviceId: string) => void;
}

export default function HeroSection({
  onExploreServices,
  onOpenConfigurator,
  onOpenTicket,
  onSelectServiceFilter,
}: HeroSectionProps) {
  const [telemetryMessage, setTelemetryMessage] = useState('NODE_CLUSTER_01: ALL SYSTEMS NORMAL [99.98%]');
  
  const telemetryLogs = [
    'NODE_CLUSTER_01: ALL SYSTEMS NORMAL [99.98%]',
    'DISCORD_GATEWAY: HEARTBEAT 22ms LATENCY',
    'BOT_HOSTING_PODS: 1,480 CONTAINER INSTANCES ACTIVE',
    'MINECRAFT_FABRIC_NODES: TPS 20.0 LOCKED',
    'DDOS_SHIELD: 1.5 TBPS MITIGATION CAPACITY READY',
    'AUTOMATION_PIPELINES: ZERO QUEUED BACKLOG',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % telemetryLogs.length;
      setTelemetryMessage(telemetryLogs[index]);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const servicePills = [
    { id: 'discord-bots', name: 'Discord Bots', icon: Bot, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/30 hover:border-indigo-400' },
    { id: 'websites-apps', name: 'Websites & Apps', icon: Globe, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/30 hover:border-cyan-400' },
    { id: 'bot-hosting', name: 'Bot Hosting', icon: Server, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30 hover:border-emerald-400' },
    { id: 'minecraft-services', name: 'Minecraft Services', icon: Gamepad2, color: 'text-lime-400 border-lime-500/30 bg-lime-950/30 hover:border-lime-400' },
    { id: 'custom-development', name: 'Custom Development', icon: Cpu, color: 'text-amber-400 border-amber-500/30 bg-amber-950/30 hover:border-amber-400' },
    { id: 'setup-configuration', name: 'Setup & Configuration', icon: Wrench, color: 'text-pink-400 border-pink-500/30 bg-pink-950/30 hover:border-pink-400' },
  ];

  return (
    <section id="hero" className="relative pt-8 pb-12 overflow-hidden border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status & Telemetry Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-mono text-slate-300 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold tracking-wide">SYSTEM ONLINE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden sm:inline">⚡ DEVGRID SERVICES HUB</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-cyan-300 font-semibold">99.98% UPTIME</span>
          </div>

          {/* Live Telemetry Ticker */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-500">LOG:</span>
            <span className="text-cyan-300/90 tracking-wide font-medium">{telemetryMessage}</span>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-4 tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span>DEVGRID SERVICES • YOUR DIGITAL SERVICES HUB</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Space_Grotesk'] leading-[1.12]">
            🚀 Build. Manage. Grow. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Reliable & Affordable
            </span>{' '}
            Digital Solutions.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            DevGrid Services provides dependable, enterprise-grade digital solutions tailored for{' '}
            <span className="text-white font-medium">creators</span>,{' '}
            <span className="text-white font-medium">communities</span>,{' '}
            <span className="text-white font-medium">developers</span>, and{' '}
            <span className="text-white font-medium">growing businesses</span>.
          </p>

          {/* Service Tag Chips directly from user prompt */}
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {servicePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.id}
                  id={`hero-pill-${pill.id}`}
                  onClick={() => {
                    playSound('hover');
                    onSelectServiceFilter(pill.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all backdrop-blur-sm cursor-pointer ${pill.color} hover:scale-105 active:scale-95`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pill.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-configurator-btn"
              onClick={() => {
                playSound('click');
                onOpenConfigurator();
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2 fill-slate-950" />
              <span>Launch Quote & Specs Configurator</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              id="hero-explore-btn"
              onClick={() => {
                playSound('click');
                onExploreServices();
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore All 6 Services</span>
            </button>

            <button
              id="hero-ticket-btn"
              onClick={() => {
                playSound('click');
                onOpenTicket();
              }}
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 hover:border-cyan-400 transition-all cursor-pointer"
            >
              <span>⚡ Open Discord Ticket</span>
            </button>
          </div>

          {/* Assurance Trust Badges */}
          <div className="mt-10 pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Zero Setup Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">1.5 Tbps DDoS Shield</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Instant Deploy Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Full Code Ownership</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
