import React from "react";
import { motion } from "motion/react";
import { Globe, MapPin, Shield, AlertCircle, Activity, Search, Filter } from "lucide-react";
import { cn } from "../lib/utils";
import { Incident } from "../types";

export default function SituationRoom({ 
  isDemoMode, 
  activeSimulationIncident, 
  simulationData 
}: { 
  isDemoMode: boolean, 
  activeSimulationIncident?: Incident | null,
  simulationData?: any
}) {
  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4 min-h-full pb-4">
      {/* Header Summary */}
      <div className="col-span-12 row-span-1 bento-card px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Globe className="text-white w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Sector Analysis</h2>
              <p className="text-xl font-bold text-white tracking-tighter">Global Situational Matrix</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Active Nodes</span>
              <span className="text-sm font-mono text-white">12,402</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Protection Level</span>
              <span className="text-sm font-mono text-emerald-400 uppercase">Tier 5 (Max)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Real-time Feed
          </div>
          <button className="p-2 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 row-span-5 bento-card relative overflow-hidden bg-black/40 group">
        {/* Animated Matrix Grid Background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Crosshair Overlay */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 z-0" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 z-0" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full h-full max-w-[500px] max-h-[500px] border border-white/5 rounded-full flex items-center justify-center">
            {/* Spinning rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-blue-600/10 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border border-blue-600/5 rounded-full"
            />
            
            {/* Internal Hub */}
            <div className="w-2/3 h-2/3 border border-white/5 rounded-full flex items-center justify-center relative">
              <div className="w-1/2 h-1/2 border border-blue-600/20 rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff]" />
                <motion.div 
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-white rounded-full"
                />
              </div>

              {/* Map Pins */}
              <MapPinPoint x="20%" y="30%" label="US-EAST-1" status="stable" />
              <MapPinPoint x="45%" y="25%" label="EU-WEST-4" status="stable" />
              <MapPinPoint 
                x="75%" 
                y="65%" 
                label="AP-SOUTH-1" 
                status={isDemoMode && activeSimulationIncident?.region === "Global" ? "critical" : "warning"} 
                pulse 
              />
              <MapPinPoint x="30%" y="75%" label="SA-EAST-1" status="stable" />
              <MapPinPoint 
                x="85%" 
                y="35%" 
                label="AP-NORTHEAST-1" 
                status={isDemoMode ? "critical" : "stable"} 
                pulse={isDemoMode}
              />
            </div>
          </div>
        </div>

        {/* Overlays */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <MapControl icon={Activity} label="Traffic Analysis" active />
          <MapControl icon={Shield} label="Secure Enclaves" />
          <MapControl icon={AlertCircle} label="Risk Heatmap" />
        </div>

        {/* Sidebar Intel Summary */}
        <div className="absolute bottom-6 right-6 p-5 glass-panel bg-[#0f1115]/90 max-w-xs border-white/10">
          <h4 className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-3">Regional Diagnostic</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Node Stability:</span>
              <span className={cn("font-mono font-bold", isDemoMode ? "text-red-500" : "text-emerald-400")}>
                {isDemoMode ? "UNSTABLE" : "99.98%"}
              </span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Autonomous Rerouting:</span>
              <span className="text-slate-300 font-mono">{isDemoMode ? "ACTIVE" : "STANDBY"}</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
              <div className={cn("h-full transition-all duration-700", isDemoMode ? "bg-red-500 w-[95%]" : "bg-blue-600 w-[20%]")} />
            </div>
          </div>
        </div>

        {isDemoMode && activeSimulationIncident && (
          <div className="absolute inset-0 flex items-center justify-center z-10 p-6 bg-red-950/20 backdrop-blur-[2px]">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0f1115] border-2 border-red-500/40 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(239,68,68,0.2)] max-w-md"
            >
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
                {activeSimulationIncident.title}
              </h3>
              <p className="text-slate-400 mb-6 font-mono text-[10px] uppercase tracking-widest">
                Source: {activeSimulationIncident.region} Cluster
              </p>
              <div className="bg-red-600/10 border border-red-500/20 p-4 rounded-xl mb-6 text-left">
                <p className="text-[9px] text-red-400 uppercase font-black mb-1 tracking-widest">AI Strategic Projection</p>
                <p className="text-[11px] text-red-200/60 font-medium italic">"{simulationData?.prediction}"</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-red-700 transition-colors">Authorize Containment</button>
                <button className="flex-1 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10">Audit Logic</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <div className="col-span-12 lg:col-span-4 row-span-5 flex flex-col gap-4">
        <div className="flex-1 bento-card p-6">
          <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Traffic Integrity Index</h3>
          <div className="space-y-6">
            <TrafficBar label="Secured API Ingress" value={isDemoMode ? 42 : 92} status={isDemoMode ? "warning" : "stable"} />
            <TrafficBar label="Database Replication" value={isDemoMode ? 28 : 96} status={isDemoMode ? "critical" : "stable"} />
            <TrafficBar label="Global Mesh Connectivity" value={isDemoMode ? 64 : 98} status={isDemoMode ? "warning" : "stable"} />
            <TrafficBar label="Edge Deliverability" value={isDemoMode ? 81 : 94} status="stable" />
          </div>
        </div>

        <div className="flex-1 bento-card p-6 border-blue-600/20 bg-blue-600/5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-blue-500 w-4 h-4" />
            <h3 className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em]">Security Protocol Advice</h3>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {isDemoMode 
                ? "Anomalous traffic detected. Sentinel recommends immediate rotation of all regional access tokens and enabling entropy-based auth filters for AP-NORTHEAST-1."
                : "Security baseline maintained. Autonomous patrols report zero intrusions. Recommendation: Optimize key rotation cycle for cost efficiency in Tier 2 sectors."
              }
            </p>
          </div>
          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg text-[9px] font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-500/20">
            Apply Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}

function MapPinPoint({ x, y, label, status, pulse }: { x: string, y: string, label: string, status: "stable" | "warning" | "critical", pulse?: boolean }) {
  const statusColors = {
    stable: "bg-blue-600 ring-blue-600/30",
    warning: "bg-yellow-500 ring-yellow-500/30",
    critical: "bg-red-500 ring-red-500/40 shadow-[0_0_15px_#ef4444]"
  };

  return (
    <div 
      className="absolute flex flex-col items-center gap-1 z-20 group"
      style={{ left: x, top: y }}
    >
      <div className={cn(
        "w-2.5 h-2.5 rounded-sm border border-white/20 shadow-xl transition-all duration-300 group-hover:scale-125 rotate-45",
        statusColors[status],
        pulse && "ring-pulse"
      )} />
      <span className="text-[9px] font-bold text-slate-300 bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}

function MapControl({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest whitespace-nowrap",
      active 
        ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20" 
        : "bg-black/60 text-slate-500 border-white/5 hover:border-white/20 hover:text-slate-300"
    )}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

function TrafficBar({ label, value, status }: { label: string, value: number, status: "stable" | "warning" | "critical" }) {
  const statusColors = {
    stable: "bg-blue-600",
    warning: "bg-yellow-500",
    critical: "bg-red-500"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest leading-none">
        <span className="text-slate-300">{label}</span>
        <span className={cn("font-mono", status === "stable" ? "text-slate-500" : "animate-pulse")}>{value}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-1000", statusColors[status])} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function AgentAction({ agent, action, status }: { agent: string, action: string, status: "active" | "idle" }) {
  return (
    <div className="flex gap-3">
      <div className={cn("w-1 h-8 rounded-full", status === "active" ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" : "bg-white/5")} />
      <div>
        <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">{agent} Agent</p>
        <p className="text-[10px] text-slate-500 mt-1 italic">{action}</p>
      </div>
    </div>
  );
}
