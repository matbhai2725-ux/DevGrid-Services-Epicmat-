import { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Server, 
  Clock, 
  Star, 
  ChevronDown, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';
import { playSound } from '../utils/audio';

export default function MetricsAndTestimonials() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Active Projects & Bots', value: '1,840+', icon: Zap, color: 'text-cyan-400' },
    { label: 'Verified Global Uptime', value: '99.98%', icon: Server, color: 'text-emerald-400' },
    { label: 'Average Support Response', value: '< 18 mins', icon: Clock, color: 'text-indigo-400' },
    { label: 'Client Satisfaction Rating', value: '4.98 / 5.0', icon: Star, color: 'text-amber-400' },
  ];

  const testimonials = [
    {
      name: 'Alex "Krono" Vance',
      role: 'Owner, NexusCraft SMP (400+ Players)',
      service: 'Minecraft Services & VPS Config',
      content:
        'DevGrid transformed our Minecraft server network. They resolved persistent TPS drops, set up a flawless Velocity proxy cluster, and customized our Paper configuration. Zero lag even during peak events.',
      avatar: '🎮',
      rating: 5,
    },
    {
      name: 'Sarah Lin',
      role: 'Community Lead, DevFlow Guild (18k Members)',
      service: 'Custom Discord Bot & Hosting',
      content:
        'We needed an automated verification system with Stripe subscriptions and ticket dispatch. DevGrid built and deployed our bot within 3 days. It has run for 6 months without a single crash.',
      avatar: '🤖',
      rating: 5,
    },
    {
      name: 'Marcus Sterling',
      role: 'Founder, CloudPulse SaaS',
      service: 'Websites & Apps + Custom Dev',
      content:
        'Affordable, communicative, and technically razor sharp. The responsive dashboard they built surpassed our expectations in both design elegance and raw page speed scores.',
      avatar: '🌐',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'Do I get 100% full source code ownership for custom bots and websites?',
      a: 'Yes, absolutely. For all Discord bots, websites, apps, and custom development orders, you receive full intellectual property and clean GitHub repository source code with zero vendor lock-in.',
    },
    {
      q: 'How quickly will my bot hosting or VPS configuration be activated?',
      a: 'Bot hosting containers are provisioned near-instantly upon order completion. Complete VPS setups and Pterodactyl installations are typically finalized within 2 to 6 hours by our engineers.',
    },
    {
      q: 'What happens if my bot or Minecraft server experiences an issue?',
      a: 'Our systems feature automated health watchdogs that restart crashed processes within seconds. Additionally, our staff is available 24/7 on Discord to investigate any anomalies immediately.',
    },
    {
      q: 'Can DevGrid help migrate an existing bot, website, or server?',
      a: 'Yes! We frequently handle zero-downtime migrations from other hosts or local machines to DevGrid cloud containers with full database export and DNS transition.',
    },
  ];

  const toggleFaq = (index: number) => {
    playSound('hover');
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="specs" className="py-16 sm:py-24 bg-[#090b11] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800/80 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Why Choose DevGrid Features */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE RELIABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Engineered For Zero Friction
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Why hundreds of community leaders, developers, and server admins rely on DevGrid Services.
          </p>
        </div>

        {/* 3 Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-7 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">Affordable & Transparent</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              No hidden renewal surcharges or predatory contracts. We keep our infrastructure lean and pass the cost savings directly to you.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">1.5 Tbps DDoS Shield</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Every bot container and game node runs behind high-grade L3/L4/L7 volumetric mitigation scrubbing layers.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">Real Human Discord Support</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              You talk directly with engineers who write the code and manage the Linux servers—not outsourced tier-1 ticket bots.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Trusted by Community Builders Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0d111d] border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-400">{t.role}</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{t.service}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl border border-slate-800 bg-[#0c101a] overflow-hidden transition-all"
                >
                  <button
                    id={`faq-toggle-${fIdx}`}
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
