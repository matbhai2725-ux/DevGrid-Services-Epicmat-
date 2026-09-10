import { useState } from 'react';
import { Bot, Terminal, Sliders, MessageSquare, Volume2, VolumeX, Menu, X, ShieldCheck, Zap } from 'lucide-react';
import { toggleSound, isSoundEnabled, playSound } from '../utils/audio';

interface NavbarProps {
  onOpenTicket: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onOpenTicket, onNavigate }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSound('click');
  };

  const handleLinkClick = (id: string) => {
    playSound('click');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="nav-brand-logo"
          onClick={() => handleLinkClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090b10] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Space_Grotesk']">
                DevGrid<span className="text-cyan-400">Services</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                HUB
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 hidden sm:block">Build • Manage • Grow</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            id="nav-link-services"
            onClick={() => handleLinkClick('services')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            Services
          </button>
          <button
            id="nav-link-3d"
            onClick={() => handleLinkClick('three-hero')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            3D Quantum Grid
          </button>
          <button
            id="nav-link-configurator"
            onClick={() => handleLinkClick('configurator')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            Configurator & Pricing
          </button>
          <button
            id="nav-link-terminal"
            onClick={() => handleLinkClick('terminal')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            Live Console
          </button>
          <button
            id="nav-link-specs"
            onClick={() => handleLinkClick('specs')}
            className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            Infrastructure
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Audio SFX Toggle */}
          <button
            id="nav-sound-toggle-btn"
            onClick={handleSoundToggle}
            title={soundOn ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-colors"
            aria-label="Toggle Sound Effects"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Discord Hub CTA */}
          <a
            id="nav-discord-link"
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 hover:border-indigo-400/50 transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Discord Hub</span>
          </a>

          {/* Primary CTA: Open Ticket / Get Started */}
          <button
            id="nav-open-ticket-btn"
            onClick={() => {
              playSound('click');
              onOpenTicket();
            }}
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-95"
          >
            <Zap className="w-4 h-4 mr-1.5 fill-slate-950" />
            <span>Get Started</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="nav-mobile-drawer" className="lg:hidden border-b border-slate-800 bg-[#0d111a] px-4 py-4 space-y-2">
          <button
            onClick={() => handleLinkClick('services')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Services Catalog
          </button>
          <button
            onClick={() => handleLinkClick('three-hero')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            3D Quantum Simulation
          </button>
          <button
            onClick={() => handleLinkClick('configurator')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            Configurator & Price Calculator
          </button>
          <button
            onClick={() => handleLinkClick('terminal')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Live Cloud Console
          </button>
          <button
            onClick={() => handleLinkClick('specs')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Infrastructure & Uptime
          </button>
        </div>
      )}
    </header>
  );
}
