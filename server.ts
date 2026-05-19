import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Agent Orchestration Endpoint
app.post("/api/orchestrate", async (req, res) => {
  const { incident, context } = req.body;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the SentinelOS Multi-Agent Primary Orchestrator. 
      Analyze the following enterprise incident and coordinate the specialized agents: Risk, Logistics, Security, Infrastructure.
      
      Incident: ${JSON.stringify(incident)}
      Current Context: ${JSON.stringify(context)}
      
      Generate a coordinated response plan including:
      1. Immediate classification and severity assessment.
      2. Specific directives for each agent.
      3. Predicted escalation path.
      4. Autonomous execution steps taken.
      
      Output in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ["low", "medium", "high", "critical"] },
            agentDirectives: {
              type: Type.OBJECT,
              properties: {
                risk: { type: Type.STRING },
                logistics: { type: Type.STRING },
                security: { type: Type.STRING },
                infrastructure: { type: Type.STRING }
              }
            },
            prediction: { type: Type.STRING },
            autonomousActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    console.error("AI Orchestration Error:", error);
    res.status(500).json({ error: "Failed to orchestrate response" });
  }
});

// Executive Briefing Endpoint
app.post("/api/briefing", async (req, res) => {
  const { query, systemState } = req.body;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the SentinelOS Executive AI Copilot. 
      Provide a concise, high-level intelligence summary for an enterprise executive based on the user's query and the current platform state.
      
      User Query: ${query}
      System State: ${JSON.stringify(systemState)}
      
      Maintain a precise, authoritative, and cinematic tone.`,
    });

    res.json({ content: response.text });
  } catch (error) {
    res.status(500).json({ error: "Briefing generation failed" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SentinelOS Core running at http://localhost:${PORT}`);
  });
}

startServer();
