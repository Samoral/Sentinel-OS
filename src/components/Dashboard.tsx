import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  ArrowRight,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";
import { cn } from "../lib/utils";
import { SystemState, Incident, Severity } from "../types";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const MOCK_HISTORICAL_DATA = [
  { time: "00:00", health: 98, events: 120 },
  { time: "04:00", health: 97, events: 140 },
  { time: "08:00", health: 95, events: 180 },
  { time: "12:00", health: 99, events: 110 },
  { time: "16:00", health: 94, events: 210 },
  { time: "20:00", health: 96, events: 160 },
  { time: "23:59", health: 97, events: 150 },
];

const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-921",
    title: "Regional Node Instability",
    description: "Latency detected in AP-South-1 clusters.",
    severity: "medium",
    status: "analyzing",
    timestamp: "12m ago",
    region: "Asia Pacific",
    affectedSystems: ["Auth", "Database"]
  },
  {
    id: "INC-922",
    title: "Unusual Login Patterns",
    description: "Credential stuffing attempt blocked from 1.2k unique IPs.",
    severity: "high",
    status: "contained",
    timestamp: "45m ago",
    region: "Global",
    affectedSystems: ["Security", "Identity"]
  }
];

export default function Dashboard({ 
  isDemoMode, 
  activeSimulationIncident, 
  simulationData,
  onSelectIncident
}: { 
  isDemoMode: boolean, 
  activeSimulationIncident?: Incident | null,
  simulationData?: any,
  onSelectIncident: (incident: Incident) => void
}) {
  const [state, setState] = useState<SystemState>({
    healthScore: 97,
    activeIncidents: 2,
    totalEvents: 14209,
    threatLevel: "stable"
  });

  useEffect(() => {
    if (isDemoMode && activeSimulationIncident) {
      const isCritical = activeSimulationIncident.severity === "critical";
      setState({
        healthScore: isCritical ? 64 : 88,
        activeIncidents: 4,
        totalEvents: 28400,
        threatLevel: isCritical ? "extreme" : "high"
      });
    } else {
      setState({
        healthScore: 97,
        activeIncidents: 2,
        totalEvents: 14209,
        threatLevel: "stable"
      });
    }
  }, [isDemoMode, activeSimulationIncident]);

  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4 min-h-full">
      {/* Top Banner for Demo Mode */}
      <AnimatePresence>
        {isDemoMode && activeSimulationIncident && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="col-span-12 bg-red-950/20 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-500/20 animate-pulse" />
              <span className="text-xs font-bold text-red-500 uppercase tracking-[0.2em]">
                CRITICAL_EVENT: {activeSimulationIncident.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-[10px] font-mono text-white bg-red-600 px-2 py-0.5 rounded uppercase tracking-tighter">NODE: {activeSimulationIncident.region}</div>
              <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest">Escalation Mode: AI_AUTONOMOUS</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="col-span-12 lg:col-span-3 row-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
        <StatCard 
          label="Operational Health" 
          value={`${state.healthScore}%`} 
          subText="SYSTEM STATUS"
          icon={Activity}
          trend={+0.4}
          color={isDemoMode ? "critical" : "brand"}
        />
        <StatCard 
          label="Risk Exposure" 
          value={state.activeIncidents} 
          subText="ACTIVE THREATS"
          icon={AlertTriangle}
          trend={+2}
          color={state.activeIncidents > 3 ? "critical" : "medium"}
        />
      </div>

      <div className="col-span-12 lg:col-span-6 row-span-4 bento-card p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400">Live Telemetry</h3>
            <p className="text-2xl font-light text-white">Global Event Horizon</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors">24h</button>
            <div className="px-3 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Live
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORICAL_DATA}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#475569" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false}
                domain={[90, 100]}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f1115", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "10px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Area 
                type="monotone" 
                dataKey="health" 
                stroke="#2563eb" 
                fillOpacity={1} 
                fill="url(#colorHealth)" 
                strokeWidth={2}
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-3 row-span-4 bento-card p-6 flex flex-col bg-[#0f1115]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Incident Matrix</h3>
          <span className="text-[9px] font-mono text-slate-500 uppercase">{MOCK_INCIDENTS.length + (isDemoMode ? 1 : 0)} Active</span>
        </div>
        <div className="space-y-3 flex-1 overflow-auto custom-scrollbar pr-1">
          {isDemoMode && activeSimulationIncident && (
            <IncidentItem 
              key={activeSimulationIncident.id} 
              incident={activeSimulationIncident} 
              onClick={() => onSelectIncident(activeSimulationIncident)}
            />
          )}
          {MOCK_INCIDENTS.map((incident) => (
            <IncidentItem 
              key={incident.id} 
              incident={incident} 
              onClick={() => onSelectIncident(incident)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Insights and Agents */}
      <div className="col-span-12 lg:col-span-4 row-span-2 bento-card p-6 flex flex-col bg-gradient-to-br from-[#1a1c22] to-[#0f1115]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">AI Executive Brief</h3>
        </div>
        <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex-1 mb-4">
          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            {isDemoMode 
              ? "Autonomous Response Protocol (Sentinel-V0.8) engaged. Tier 1 failover initialized for AP-NORTHEAST-1. High risk of latency cascading to payment gateways."
              : "Operations show steady baseline. No predicted anomalies within 4h window. Infrastructure agent suggests minor node rotation in EMEA for cost optimization."
            }
          </p>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono tracking-tighter">
          <span>SOURCE: PRIMARY_INTEL</span>
          <span>AUTONOMY: {isDemoMode ? "FULL" : "SUPERVISED"}</span>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 row-span-2 space-y-4">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Multi-Agent Orchestration</h3>
           <div className="h-0.5 w-12 bg-blue-600/30 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AgentCard 
            role="Risk" 
            status={isDemoMode ? "orchestrating" : "monitoring"} 
            directive={simulationData?.agentDirectives?.risk}
          />
          <AgentCard 
            role="Security" 
            status={isDemoMode ? "orchestrating" : "monitoring"} 
            directive={simulationData?.agentDirectives?.security}
          />
          <AgentCard 
            role="Logistics" 
            status={isDemoMode ? "orchestrating" : "idle"} 
            directive={simulationData?.agentDirectives?.logistics}
          />
          <AgentCard 
            role="Infrastructure" 
            status={isDemoMode ? "orchestrating" : "idle"} 
            directive={simulationData?.agentDirectives?.infrastructure}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subText, icon: Icon, trend, color }: any) {
  const colorMap = {
    brand: "text-blue-500",
    critical: "text-red-500",
    medium: "text-yellow-500",
    low: "text-emerald-500"
  };

  return (
    <div className="bento-card p-5 group flex flex-col justify-center h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/15 transition-colors">
          <Icon className={cn("w-4 h-4", colorMap[color as keyof typeof colorMap])} />
        </div>
        {trend !== 0 && (
          <div className={cn(
            "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/5",
            trend > 0 ? "text-emerald-400" : "text-red-500"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">{label}</p>
        <h4 className="text-2xl font-mono text-white leading-none tracking-tight">{value}</h4>
        <p className="text-[9px] text-slate-600 mt-2 font-mono tracking-tighter uppercase">{subText}</p>
      </div>
    </div>
  );
}

function IncidentItem({ incident, onClick }: { incident: Incident, onClick?: () => void }) {
  const severityColors = {
    low: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30",
    medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    critical: "bg-red-500/20 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden",
        incident.severity === "critical" ? "bg-red-950/20 border-red-500/30" : "bg-white/5 border-white/5 hover:bg-white/10"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={cn("text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border", severityColors[incident.severity])}>
          {incident.severity}
        </span>
        <span className="text-[9px] text-slate-500 font-mono">{incident.timestamp}</span>
      </div>
      <h5 className="text-xs font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{incident.title}</h5>
      <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{incident.description}</p>
    </div>
  );
}

function AgentCard({ role, status, directive }: { role: string, status: "idle" | "monitoring" | "orchestrating", directive?: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col gap-4 group">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
          <RefreshCcw className={cn("w-5 h-5", status === "orchestrating" ? "animate-spin text-blue-500" : "text-slate-500")} />
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border",
          status === "idle" ? "bg-slate-800 text-slate-500 border-slate-700" : 
          status === "monitoring" ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : 
          "bg-red-600/20 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
        )}>
          {status}
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white mb-1">{role} Agent</h4>
        <p className="text-[10px] text-slate-500 leading-tight line-clamp-2">
          {directive || (status === "idle" ? "Routes optimized. Minimal activity." : status === "monitoring" ? "Scanning regional node throughput..." : "Escalation procedures active.")}
        </p>
      </div>

      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: status === "idle" ? "20%" : status === "monitoring" ? "60%" : "95%" }}
          className={cn("h-full transition-all duration-1000", status === "orchestrating" ? "bg-blue-500" : "bg-slate-700")}
        />
      </div>
    </div>
  );
}
