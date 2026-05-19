import { 
  ShieldAlert, 
  LayoutDashboard, 
  Map, 
  MessageSquare, 
  Bell, 
  Search, 
  Menu, 
  X,
  Activity,
  Box,
  Lock,
  Globe,
  Settings,
  HelpCircle,
  Play
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./lib/utils";
import { Incident, AgentState, SystemState } from "./types";

// Pages
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import SituationRoom from "./components/SituationRoom";
import Copilot from "./components/Copilot";
import IncidentDetail from "./components/IncidentDetail";
import { useSimulation } from "./hooks/useSimulation";

export default function App() {
  const [activePage, setActivePage] = useState<"landing" | "dashboard" | "situation" | "copilot">("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  const { activeIncident, simulationData } = useSimulation(isDemoMode);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Command Center" },
    { id: "situation", icon: Map, label: "Situation Room" },
    { id: "copilot", icon: MessageSquare, label: "AI Copilot" },
  ] as const;

  if (activePage === "landing") {
    return <LandingPage onEnter={() => setActivePage("dashboard")} />;
  }

  return (
    <div className="flex h-screen bg-[#050608] overflow-hidden text-slate-300 p-4 space-x-4">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? "260px" : "80px" }}
        className="bg-[#0f1115] border border-white/10 rounded-2xl flex flex-col z-50 overflow-hidden"
      >
        <div className="p-4 flex items-center gap-4 border-b border-white/5">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ShieldAlert className="text-white w-6 h-6" />
          </div>
          {sidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tighter text-white"
            >
              SENTINEL<span className="text-blue-500">OS</span>
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all relative group",
                activePage === item.id 
                  ? "bg-blue-600/10 text-blue-400" 
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
              )}
            >
              <item.icon className="w-6 h-6 shrink-0" />
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold">
                  {item.label}
                </motion.span>
              )}
              {activePage === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 flex flex-col gap-2">
          <button 
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl transition-all overflow-hidden",
              isDemoMode ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-white/5 text-slate-500 hover:bg-white/10"
            )}
          >
            <Play className={cn("w-6 h-6 shrink-0", isDemoMode && "fill-current")} />
            {sidebarOpen && <span className="text-xs font-bold uppercase tracking-wider">{isDemoMode ? "Stop Sim" : "Demo Mode"}</span>}
          </button>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-4 p-3 rounded-xl text-slate-500 hover:bg-white/5 transition-all font-mono text-[10px] tracking-widest"
          >
            {sidebarOpen ? <X className="w-6 h-6 shrink-0" /> : <Menu className="w-6 h-6 shrink-0" />}
            {sidebarOpen && <span>SYSTEM_MINIMIZE</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col overflow-hidden space-y-4">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#0f1115] border border-white/10 rounded-2xl shrink-0">
          <div className="flex items-center gap-6">
            <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              System State: <span className={cn(isDemoMode ? "text-red-500 animate-pulse" : "text-emerald-500")}>
                {isDemoMode ? "THREAT_DETECTED" : "NOMINAL"}
              </span>
            </h2>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <Activity className={cn("w-4 h-4", isDemoMode ? "text-red-500" : "text-blue-500")} />
              <span>LATENCY: {isDemoMode ? "421.8ms" : "104.2ms"}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Query system assets..." 
                className="bg-black/20 border border-white/5 rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500/30 transition-all w-48"
              />
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Health Score</p>
                <p className={cn("text-xl font-mono leading-none", isDemoMode ? "text-red-500" : "text-emerald-400")}>
                  {isDemoMode ? "64.2%" : "98.4%"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden p-0.5">
                <img className="w-full h-full rounded-lg" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=b6e3f4`} alt="avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {activePage === "dashboard" && (
                <Dashboard 
                  isDemoMode={isDemoMode} 
                  activeSimulationIncident={activeIncident}
                  simulationData={simulationData}
                  onSelectIncident={setSelectedIncident}
                />
              )}
              {activePage === "situation" && (
                <SituationRoom 
                  isDemoMode={isDemoMode} 
                  activeSimulationIncident={activeIncident}
                  simulationData={simulationData}
                />
              )}
              {activePage === "copilot" && <Copilot />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedIncident && (
          <IncidentDetail 
            incident={selectedIncident} 
            onClose={() => setSelectedIncident(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
