import React from "react";
import { motion } from "motion/react";
import { Shield, Zap, Globe, Target, Terminal, ChevronRight, Briefcase, Cpu, Lock as LucideLock, Activity } from "lucide-react";

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-[#050608] text-slate-400 selection:bg-blue-600/30 overflow-x-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 blur-[140px] rounded-full animate-pulse " style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "48px 48px" }}></div>
      </div>

      <nav className="relative z-10 p-8 flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/10 p-2.5 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            SENTINEL<span className="text-blue-600">OS</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          <a href="#" className="hover:text-blue-500 transition-colors">Infrastructure</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Multi-Agent</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Kernel</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Compliance</a>
        </div>
        <button 
          onClick={onEnter}
          className="group relative px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Access Matrix</span>
        </button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-40 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 mb-10">
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-blue-400">Autonomous Kernel Activated</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
            OPERATIONAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-600 animate-gradient bg-[length:200%_auto]">INTELLIGENCE</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
            The first multi-agent autonomous framework designed to orchestrate complex global enterprise infrastructure at machine speed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnter}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-blue-600/20 w-full sm:w-auto text-xs"
            >
              Initialize Node
            </button>
            <button className="px-10 py-5 bg-[#0f1115] border border-white/10 hover:border-white/20 text-slate-300 font-bold uppercase tracking-widest rounded-xl transition-all w-full sm:w-auto text-xs">
              View Whitepaper
            </button>
          </div>
        </motion.div>

        {/* Feature Bento Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-40 w-full"
        >
          {[
            { icon: Cpu, title: "Autonomous Core", desc: "Proprietary kernel that scales compute horizontally across any cloud fabric." },
            { icon: Target, title: "Predictive V3", desc: "Advanced Bayesian models project system failure vectors with 98.4% precision." },
            { icon: Zap, title: "Zero Latency", desc: "Optimized orchestration protocols bypass standard API congestion for instant response." }
          ].map((feature, i) => (
            <div key={i} className="bg-[#0f1115] border border-white/5 p-10 text-left rounded-3xl hover:border-blue-500/30 transition-all duration-500 group">
              <div className="bg-blue-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-blue-500/20">
                <feature.icon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-600 font-mono text-[9px] tracking-widest uppercase font-bold">
              <Globe className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Nodes Stable: 12,402</span>
            </div>
            <div className="h-4 w-px bg-white/5" />
            <div className="flex items-center gap-2 text-slate-600 font-mono text-[9px] tracking-widest uppercase font-bold">
              <span>Status: NOMINAL</span>
            </div>
          </div>
          <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">© 2026 Sentinel Operations Intel. Secure AES Encrypted.</p>
          <div className="flex gap-8">
            <Briefcase className="w-4 h-4 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
            <LucideLock className="w-4 h-4 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
            <Activity className="w-4 h-4 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
