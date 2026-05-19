import { useState, useEffect, useCallback } from "react";
import { Incident, SimulationStep, Severity } from "../types";

export function useSimulation(isActive: boolean) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);

  const steps: SimulationStep[] = [
    {
      incident: {
        id: "SIM-001",
        title: "Database Cluster Desync",
        description: "Primary database in AP-NORTHEAST-1 reporting replication lag > 15s.",
        severity: "medium",
        status: "detected",
        timestamp: "just now",
        region: "AP-NORTHEAST-1",
        affectedSystems: ["RDS", "Cache"]
      },
      agentDirectives: {
        risk: "Analyze throughput impact on active user sessions.",
        logistics: "Reroute traffic to EU-CENTRAL-1 failover group.",
        security: "Verify integrity of replicated blocks.",
        infrastructure: "Scale standby clusters and initiate sync check."
      },
      actions: ["Node monitoring intensified", "Traffic rerouted"],
      prediction: "65% chance of escalation to Tier 1 failure within 5 minutes if left uncontained."
    },
    {
      incident: {
        id: "SIM-001",
        title: "Cascaded Node Failure",
        description: "Failover group in EU-CENTRAL-1 saturated. Connection pool exhausted.",
        severity: "critical",
        status: "analyzing",
        timestamp: "2m ago",
        region: "Global",
        affectedSystems: ["Auth", "Payments", "API"]
      },
      agentDirectives: {
        risk: "Calculate exposure for 15,000 active transactions.",
        logistics: "Initialize throttle on non-critical API endpoints.",
        security: "Enable emergency entropy-based authentication bypass.",
        infrastructure: "Manual resource override: Allocating +200% capacity."
      },
      actions: ["Global throttle active", "Emergency resources allocated"],
      prediction: "Resolution in progress. Recovery estimated in 120s."
    }
  ];

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0);
      setActiveIncident(null);
      setLogs([]);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const next = Math.min(prev + 1, steps.length - 1);
        setActiveIncident(steps[next].incident);
        return next;
      });
    }, 10000); // Progress every 10s

    setActiveIncident(steps[0].incident);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return {
    activeIncident,
    simulationData: steps[currentStep],
    isFinalStep: currentStep === steps.length - 1
  };
}
