import { useState } from 'react';
import { 
  Bot, 
  Globe, 
  Server, 
  Gamepad2, 
  Cpu, 
  Wrench, 
  Check, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem, ServiceId } from '../types';
import { playSound } from '../utils/audio';

interface ServicesSectionProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onOpenTicketWithService: (service: ServiceItem) => void;
  activeFilterId?: string | null;
}

export default function ServicesSection({
  onSelectServiceForQuote,
  onOpenTicketWithService,
  activeFilterId,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return Bot;
      case 'Globe':
        return Globe;
      case 'Server':
        return Server;
      case 'Gamepad2':
        return Gamepad2;
      case 'Cpu':
        return Cpu;
      case 'Wrench':
        return Wrench;
      default:
        return Bot;
    }
  };

  const categories = [
    { id: 'all', label: 'All 6 Services' },
    { id: 'bots', label: 'Discord & Bots', match: ['discord-bots', 'bot-hosting'] },
    { id: 'web', label: 'Web & Development', match: ['websites-apps', 'custom-development'] },
    { id: 'infra', label: 'Hosting & Infra', match: ['bot-hosting', 'setup-configuration', 'minecraft-services'] },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (activeFilterId && activeFilterId !== 'all') {
      return service.id === activeFilterId;
    }
    if (selectedCategory === 'all') return true;
    const cat = categories.find((c) => c.id === selectedCategory);
    return cat?.match ? cat.match.includes(service.id) : true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#0a0d14] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <span>EXPLORE SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
              DevGrid Core Solutions
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl">
              Engineered with modern architectures, strict uptime targets, and transparent pricing. Every service includes dedicated Discord support.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                onClick={() => {
                  playSound('click');
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative flex flex-col justify-between rounded-2xl bg-[#0e131f]/90 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-7 shadow-xl shadow-slate-950/50 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Top Subtle Gradient Light Glow */}
                <div className={`absolute -top-px left-8 right-8 h-px bg-gradient-to-r ${service.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                
                <div>
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-slate-900 border border-slate-700/70 text-slate-300">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] tracking-tight group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-cyan-400/90 font-mono">{service.tagline}</p>
                  
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Core Features List */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Specs Pill Box */}
                  <div className="mt-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 grid grid-cols-2 gap-2">
                    {service.specs.slice(0, 2).map((spec, sIdx) => (
                      <div key={sIdx} className="text-[11px]">
                        <span className="text-slate-400 block">{spec.label}</span>
                        <span className="text-white font-mono font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & Action Buttons */}
                <div className="mt-6 pt-5 border-t border-slate-800/80">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Starting at</span>
                      <div className="text-2xl font-extrabold text-white font-mono">
                        {service.startingPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{service.typicalDelivery}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`service-config-btn-${service.id}`}
                      onClick={() => {
                        playSound('click');
                        onSelectServiceForQuote(service);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Configure</span>
                    </button>

                    <button
                      id={`service-detail-btn-${service.id}`}
                      onClick={() => {
                        playSound('hover');
                        setActiveModalService(service);
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-colors cursor-pointer"
                    >
                      <span>Specs</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div
          id="service-detail-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalService(null)}
        >
          <div
            id="service-detail-modal"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e1320] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeModalService.color} flex items-center justify-center text-white font-bold`}>
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">{activeModalService.title}</h3>
                  <p className="text-xs font-mono text-cyan-400">{activeModalService.tagline}</p>
                </div>
              </div>
              <button
                id="close-service-modal-btn"
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">{activeModalService.description}</p>

            {/* Complete Features */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Complete Capability Suite</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Addons */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Popular Add-ons Available</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalService.popularAddons.map((addon, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                    + {addon}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Engineering Specifications</h4>
              <div className="grid grid-cols-3 gap-3">
                {activeModalService.specs.map((sp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-[10px] uppercase font-mono text-slate-400">{sp.label}</div>
                    <div className="text-xs font-mono font-bold text-white mt-1">{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400">Starting from</span>
                <div className="text-2xl font-bold font-mono text-cyan-300">{activeModalService.startingPrice}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  id="modal-order-btn"
                  onClick={() => {
                    playSound('success');
                    const s = activeModalService;
                    setActiveModalService(null);
                    onOpenTicketWithService(s);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  Order / Open Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
