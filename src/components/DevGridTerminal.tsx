import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';

interface TerminalLine {
  type: 'input' | 'output' | 'success' | 'warn' | 'info';
  text: string;
}

export default function DevGridTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'info', text: '⚡ DevGrid Quantum Shell [Version 2.4.1-LTS]' },
    { type: 'info', text: 'Connected to node-us-east-cluster (latency 19ms). Type "help" for commands.' },
    { type: 'output', text: 'System ready: 6 digital service pipelines initialized.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    playSound('terminal');
    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `devgrid@cloud:~$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      newHistory.push({
        type: 'output',
        text: `AVAILABLE COMMANDS:
  • help                 - Display this instruction index
  • services             - Query status of all 6 DevGrid hubs
  • ping                 - Measure roundtrip gateway ping to DevGrid edge
  • bot --status         - Check Discord bot cluster health & shard states
  • mc --telemetry       - Query Minecraft server TPS & paper performance
  • hosting --uptime     - Check 24/7 container node availability
  • deploy --demo        - Run simulated zero-downtime deployment
  • clear                - Purge terminal console buffer`,
      });
    } else if (lower === 'services') {
      newHistory.push({
        type: 'success',
        text: `ACTIVE DEVGRID SERVICE PIPELINES:
  [1] 🤖 Discord Bots          - ONLINE (Discord.js v14 & Python 3.11)
  [2] 🌐 Websites & Apps       - ONLINE (React, Next.js, Tailwind v4)
  [3] 🛠️ Bot Hosting          - ONLINE (Pterodactyl, 99.98% SLA, 10Gbps)
  [4] 🎮 Minecraft Services    - ONLINE (Purpur/Paper, Locked 20.0 TPS)
  [5] ⚙️ Custom Development   - READY  (Bespoke APIs & Microservices)
  [6] 🔧 Setup & Configuration - READY  (VPS, DNS, SSL & Cloud Hardening)`,
      });
    } else if (lower === 'ping') {
      newHistory.push({
        type: 'info',
        text: `PING devgrid.services (172.67.194.21):
  64 bytes from 172.67.194.21: icmp_seq=1 ttl=59 time=18.4 ms
  64 bytes from 172.67.194.21: icmp_seq=2 ttl=59 time=19.1 ms
  64 bytes from 172.67.194.21: icmp_seq=3 ttl=59 time=18.8 ms
  --- devgrid ping statistics ---
  3 packets transmitted, 3 received, 0% packet loss, time 2004ms
  rtt min/avg/max/mdev = 18.4/18.76/19.1/0.29 ms (EXCELLENT)`,
      });
    } else if (lower.includes('bot')) {
      newHistory.push({
        type: 'success',
        text: `[DISCORD BOT CONTAINER STATUS]
  • Gateway Shard: #0 (Connected)
  • Gateway Heartbeat: 22ms
  • Memory Allocation: 84MB / 512MB (Optimal)
  • Slash Commands Cached: 48 Registered
  • Auto-Restart Watchdog: ACTIVE (0 crashes in 140 days)`,
      });
    } else if (lower.includes('mc') || lower.includes('minecraft')) {
      newHistory.push({
        type: 'success',
        text: `[MINECRAFT NODE TELEMETRY]
  • Core Engine: Purpur 1.21.1 (Java 21 OpenJDK)
  • Server TPS: 20.0 / 20.0 [MSPT: 11.2ms]
  • Chunk Rendering: Async Multithreaded
  • Protection: Anti-Cheat & Anti-Grief active
  • Network: Velocity Proxy cluster syncd`,
      });
    } else if (lower.includes('hosting') || lower.includes('uptime')) {
      newHistory.push({
        type: 'info',
        text: `[DEVGRID CLUSTER UPTIME]
  • Host Uptime: 248 days, 14 hours, 32 mins
  • Monitored SLA: 99.98% verified
  • DDoS Shield: Active (Clean Traffic 1.5 Tbps filter)
  • NVMe Read Speed: 6,800 MB/s`,
      });
    } else if (lower.includes('deploy')) {
      newHistory.push({
        type: 'info',
        text: `[PIPELINE] Initializing simulated DevGrid instant deployment...
  → Fetching latest git revision [HEAD -> main]
  → Building production assets with Vite & TypeScript... Done in 1.4s
  → Spinning up isolated Docker container...
  → Running healthcheck: HTTP 200 OK
  → Switching traffic to new revision (Zero Downtime)...
  ✔ DEPLOYMENT SUCCESSFUL! Live at production edge.`,
      });
    } else if (lower === 'clear') {
      setHistory([]);
      return;
    } else {
      newHistory.push({
        type: 'warn',
        text: `Command not recognized: "${trimmed}". Type "help" or click one of the quick test commands below.`,
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'services', 'ping', 'bot --status', 'mc --telemetry', 'deploy --demo'];

  return (
    <section id="terminal" className="py-16 sm:py-24 bg-[#0a0d16] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>LIVE INFRASTRUCTURE INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            DevGrid Interactive Terminal
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Simulate real-time queries to test our cloud gateways, Discord bot ping, and Minecraft server telemetry.
          </p>
        </div>

        {/* Terminal Window Frame */}
        <div className="rounded-2xl border border-slate-800 bg-[#07090e] shadow-2xl overflow-hidden">
          
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d121c] border-b border-slate-800/90 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 font-medium">
                devgrid@edge-node-01: ~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
              <button
                id="terminal-clear-btn"
                onClick={() => {
                  playSound('click');
                  setHistory([]);
                }}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                title="Clear Terminal"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="p-4 sm:p-6 min-h-[320px] max-h-[460px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2.5">
            {history.map((line, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-cyan-300 font-semibold'
                    : line.type === 'success'
                    ? 'text-emerald-400'
                    : line.type === 'warn'
                    ? 'text-amber-300'
                    : line.type === 'info'
                    ? 'text-sky-300'
                    : 'text-slate-300'
                }`}
              >
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Command Input */}
          <div className="p-3 sm:p-4 bg-[#090d16] border-t border-slate-800/90 flex items-center gap-3">
            <span className="text-cyan-400 font-mono font-bold text-xs">devgrid@cloud:~$</span>
            <input
              id="terminal-command-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. services, ping, bot, mc) or click below..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-500"
            />
            <button
              id="terminal-submit-btn"
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-400 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-slate-950" />
              <span>Run</span>
            </button>
          </div>

          {/* Quick Click Action Chips */}
          <div className="px-4 py-2.5 bg-[#070a12] border-t border-slate-800/60 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 mr-1">Quick Run:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                id={`quick-cmd-${cmd.replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-mono text-cyan-300 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
