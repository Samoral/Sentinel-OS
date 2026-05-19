export type Severity = "low" | "medium" | "high" | "critical";

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: "detected" | "analyzing" | "contained" | "resolved";
  timestamp: string;
  region: string;
  affectedSystems: string[];
}

export interface AgentState {
  id: string;
  name: string;
  role: "Risk" | "Logistics" | "Security" | "Infrastructure" | "Compliance";
  status: "idle" | "analyzing" | "orchestrating" | "executed";
  lastAction: string;
  thoughtProcess: string[];
}

export interface SystemState {
  healthScore: number;
  activeIncidents: number;
  totalEvents: number;
  threatLevel: "stable" | "elevated" | "high" | "extreme";
}

export interface SimulationStep {
  incident: Incident;
  agentDirectives: {
    risk: string;
    logistics: string;
    security: string;
    infrastructure: string;
  };
  actions: string[];
  prediction: string;
}
