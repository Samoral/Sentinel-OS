import React from "react";
import { motion } from "motion/react";
import { 
  X, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Clock, 
  MessageSquare,
  ChevronRight,
  Database,
  Lock,
  Cpu
} from "lucide-react";
import { Incident, Severity } from "../types";
import { cn } from "../lib/utils";

export default function IncidentDetail({ 
  incident, 
  onClose 
}: { 
  incident: Incident, 
  onClose: () => void 
}) {
  const severityColors = {
    low: "text-green-500 bg-green-500/10 border-green-500/20",
    medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    high: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    critical: "text-red-500 bg-red-500/10 border-red-500/20"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 bg-slate-950/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-panel w-full max-w-5xl max-h-full overflow-hidden flex flex-col shadow-2xl border-slate-700/50"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", severityColors[incident.severity])}>
              {incident.severity} PRIORITY
            </div>
            <h2 className="text-xl font-bold">{incident.id}: {incident.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 custom-scrollbar">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand" />
                Root Cause Analysis
              </h3>
              <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <p className="text-slate-300 leading-relaxed">
                  {incident.description} Preliminary analysis suggests a state-desynchronization in the {incident. affectedSystems[0] || 'primary'} node, likely triggered by a surge in cross-regional replication requests. AI models have identified similar patterns in 3 historical events.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand" />
                Incident Timeline
              </h3>
              <div className="space-y-4">
                <TimelineItem 
                  time="T-0:00" 
                  title="Anomaly Detected" 
                  desc="System baseline deviation exceeded 15% threshold in AP-NORTHEAST-1." 
                  icon={Shield}
                  active
                />
                <TimelineItem 
                  time="T+0:12" 
                  title="Multi-Agent Deployment" 
                  desc="Risk and Infrastructure agents initialized autonomous containment protocols." 
                  icon={Cpu}
                />
                <TimelineItem 
                  time="T+0:45" 
                  title="Traffic Rerouting" 
                  desc="90% of regional traffic redirected to EU-CENTRAL-1 failover clusters." 
                  icon={ChevronRight}
                />
              </div>
            </section>

            <section className="bg-brand/5 border border-brand/20 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-brand w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-200">AI Response Strategy</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Initialize cold storage failover for AP-NORTHEAST-1",
                  "Enable rate limiting on non-authenticated API endpoints",
                  "Conduct deep-packet inspection on replication traffic"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="glass-panel p-5 bg-slate-900/30">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">System Impact</h4>
              <div className="space-y-4">
                <ImpactMetric label="Latency" value="+124ms" status="critical" />
                <ImpactMetric label="Throughput" value="-12%" status="warning" />
                <ImpactMetric label="Error Rate" value="0.04%" status="normal" />
              </div>
            </div>

            <div className="glass-panel p-5 bg-slate-900/30">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Affected Assets</h4>
              <div className="flex flex-wrap gap-2">
                {incident.affectedSystems.map(s => (
                  <span key={s} className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-mono border border-slate-700">
                    {s}.prd.node
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 border border-slate-800 rounded-2xl bg-indigo-500/5">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-indigo-400" />
                <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Compliance Status</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed capitalize">
                Audit Log Generated. HIPAA/GDPR Parameters Maintained. 
                <span className="block mt-1 text-indigo-400 font-bold">SHA-256: 92a..f41</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-4 text-slate-500 text-[10px] font-mono">
            <Clock className="w-3 h-3" />
            ELAPSED: 00:42:12
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-xs font-bold uppercase transition-colors">Generate Report</button>
            <button className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-bold uppercase hover:bg-brand/90 transition-all shadow-lg shadow-brand/20">Authorize Resolution</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({ time, title, desc, icon: Icon, active }: any) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10",
          active ? "bg-brand border-brand text-white" : "bg-slate-900 border-slate-800 text-slate-500"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="w-0.5 flex-1 bg-slate-800 -mb-4" />
      </div>
      <div className="pb-8">
        <p className="text-[10px] font-mono text-brand mb-1">{time}</p>
        <h4 className="text-sm font-bold text-slate-200">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function ImpactMetric({ label, value, status }: { label: string, value: string, status: "critical" | "warning" | "normal" }) {
  const statusColors = {
    critical: "text-red-400",
    warning: "text-yellow-400",
    normal: "text-green-400"
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400">{label}</span>
      <span className={cn("text-xs font-mono font-bold", statusColors[status])}>{value}</span>
    </div>
  );
}
