import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Bot, User, Sparkles, Terminal, ChevronRight, Activity, Cpu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

type CopilotStatus = "idle" | "thinking" | "processing" | "responding";

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome, Administrator. I am the SentinelOS Executive Copilot. I have analyzed all active nodes and security enclaves. My generative model is currently grounding its responses with real-time operational data. How can I assist with your intelligence requirements today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<CopilotStatus>("idle");
  const [activeStep, setActiveStep] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const THOUGHT_PHASES = [
    "Initializing neural uplink...",
    "Querying global operational matrix...",
    "Analyzing regional node telemetry...",
    "Synthesizing strategic projection...",
    "Finalizing executive brief..."
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status, activeStep]);

  const handleSend = async () => {
    if (!input.trim() || status !== "idle") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setStatus("thinking");

    try {
      // Simulate multiple thinking steps for "intelligent" feel
      for (const step of THOUGHT_PHASES) {
        setActiveStep(step);
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
        if (step === THOUGHT_PHASES[1]) setStatus("processing");
      }

      setStatus("responding");
      
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query: input,
          systemState: {
            healthScore: 97,
            threatLevel: "stable",
            activeIncidents: 2
          }
        }),
      });
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "I'm having trouble connecting to the intelligence core. Please standby.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI Copilot Error:", err);
    } finally {
      setStatus("idle");
      setActiveStep("");
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 max-w-6xl mx-auto pb-4">
      {/* Copilot Header */}
      <div className="bento-card p-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Bot className="w-6 h-6 text-white" />
            </div>
            {status !== "idle" && (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 border border-blue-500/50 rounded-xl pointer-events-none"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter text-white">Executive Copilot</h2>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                status === "idle" ? "bg-emerald-500 text-emerald-500" : "bg-blue-500 text-blue-500 animate-pulse"
              )} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                {status === "idle" ? "Core: Nominal" : `Core: ${status.toUpperCase()}...`}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <Activity className={cn("w-4 h-4", status === "idle" ? "text-blue-500" : "text-emerald-500 animate-pulse")} />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              {status === "idle" ? "Global Context: Active" : "Analyzing Neural Path..."}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bento-card bg-black/40 overflow-hidden flex flex-col relative border-white/5">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative z-10"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-5 max-w-[90%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border",
                msg.role === "user" ? "bg-slate-800 border-white/10 shadow-lg" : "bg-blue-600/10 border-blue-500/30"
              )}>
                {msg.role === "user" ? <User className="w-5 h-5 text-slate-300" /> : <Sparkles className="w-5 h-5 text-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />}
              </div>
              <div className="space-y-2">
                <div className={cn(
                  "p-5 rounded-2xl relative",
                  msg.role === "user" ? "bg-white/5 text-slate-200 border border-white/10" : "bg-slate-950/80 border border-white/5 text-slate-300 backdrop-blur-md"
                )}>
                  {msg.role === "assistant" && (
                    <div className="absolute -top-4 -left-4 opacity-5 pointer-events-none">
                      <Cpu className="text-white w-20 h-20" />
                    </div>
                  )}
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#0f1115] prose-pre:border prose-pre:border-white/5 shadow-2xl">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-2 px-1",
                  msg.role === "user" && "flex-row-reverse"
                )}>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                    {msg.role}
                  </span>
                  <span className="text-[8px] font-mono text-slate-700">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {status !== "idle" && (
            <div className="flex gap-5 max-w-[85%] mr-auto">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 flex flex-col gap-3 min-w-[240px]">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce" />
                    <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-[0.2em] ml-2">Agent {status}</span>
                  </div>
                  
                  {activeStep && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/5"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.8)]" />
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter italic">
                        &gt; {activeStep}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-8 py-4 border-t border-white/5 flex items-center gap-3 overflow-x-auto bg-black/40 relative z-10">
          <Terminal className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          {["Analyze Current Risk Profile", "Security Integrity Level?", "Predict Future Stability", "Operational Overview"].map((q) => (
            <button 
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-2 bg-white/5 border border-white/5 hover:border-blue-500/30 rounded-lg text-[9px] font-bold text-slate-400 hover:text-blue-400 transition-all whitespace-nowrap uppercase tracking-widest"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-8 pt-0 relative z-10">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Query the sentinel intelligence core..."
              className="w-full bg-[#0f1115] border border-white/10 rounded-2xl py-5 pl-7 pr-16 text-sm focus:outline-none focus:border-blue-500/40 transition-all resize-none min-h-[64px] max-h-[140px] custom-scrollbar shadow-2xl text-slate-200 placeholder:text-slate-600"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={status !== "idle" || !input.trim()}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95 transition-all disabled:opacity-50 disabled:bg-slate-800 disabled:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">Protocol 4-Alpha Encryption Enabled</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-[9px] font-mono">256-BIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
