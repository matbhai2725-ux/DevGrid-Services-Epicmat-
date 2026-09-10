import { Zap, MessageSquare, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { playSound } from '../utils/audio';

interface FooterProps {
  onOpenTicket: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onOpenTicket, onNavigate }: FooterProps) {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080d] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#090b10] rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-base text-white font-['Space_Grotesk'] tracking-tight">
                DevGrid<span className="text-cyan-400">Services</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              ⚡ DevGrid Services — Your Digital Services Hub. Providing reliable, high-performance, and affordable solutions for creators, communities, developers, and businesses.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-mono text-[11px] font-semibold">ALL SYSTEMS OPERATIONAL (99.98% UPTIME)</span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider mb-4">Core Services</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  id="footer-link-bots"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  🤖 Discord Bots
                </button>
              </li>
              <li>
                <button
                  id="footer-link-web"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  🌐 Websites & Apps
                </button>
              </li>
              <li>
                <button
                  id="footer-link-hosting"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  🛠️ Bot Hosting
                </button>
              </li>
              <li>
                <button
                  id="footer-link-mc"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  🎮 Minecraft Services
                </button>
              </li>
              <li>
                <button
                  id="footer-link-custom"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  ⚙️ Custom Development
                </button>
              </li>
              <li>
                <button
                  id="footer-link-setup"
                  onClick={() => onNavigate('services')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  🔧 Setup & Configuration
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Hub */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider mb-4">Features</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  id="footer-link-3d"
                  onClick={() => onNavigate('three-hero')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  3D Quantum Visualizer
                </button>
              </li>
              <li>
                <button
                  id="footer-link-calc"
                  onClick={() => onNavigate('configurator')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  Pricing Configurator
                </button>
              </li>
              <li>
                <button
                  id="footer-link-term"
                  onClick={() => onNavigate('terminal')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  Live Cloud Terminal
                </button>
              </li>
              <li>
                <button
                  id="footer-link-infra"
                  onClick={() => onNavigate('specs')}
                  className="hover:text-cyan-300 transition-colors text-left"
                >
                  DDoS & Infrastructure
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Ticket CTA */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider mb-4">Community & Dispatch</h4>
            <div className="space-y-3">
              <a
                id="footer-discord-cta"
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-900 transition-all font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Discord Hub</span>
              </a>

              <button
                id="footer-ticket-cta"
                onClick={() => {
                  playSound('click');
                  onOpenTicket();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                ⚡ Open Ticket Now
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} DevGrid Services. All rights reserved. 🚀 Build. Manage. Grow.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>OWASP & Enterprise Hardened</span>
            </span>

            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 font-mono transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
