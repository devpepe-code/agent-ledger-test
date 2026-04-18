/**
 * Representative agent / LLM platforms users can “connect” for attestation (demo).
 * Logos are initials + brand tint (no external image dependencies).
 */
export type AgentCompany = {
  id: string;
  name: string;
  tagline: string;
  /** Two-letter abbreviation shown in the logo tile */
  initials: string;
  /** Tailwind gradient classes for the logo tile */
  logoClass: string;
};

export const AGENT_COMPANIES: AgentCompany[] = [
  {
    id: "openai",
    name: "OpenAI",
    tagline: "GPT agents & Assistants API",
    initials: "OA",
    logoClass: "from-emerald-600/90 to-teal-700/90",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    tagline: "Enterprise API & safety-first AI stack",
    initials: "An",
    logoClass: "from-orange-500/90 to-amber-700/90",
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Models, Projects, and agent-ready APIs",
    initials: "Cl",
    logoClass: "from-orange-400/90 to-rose-800/90",
  },
  {
    id: "open-claw",
    name: "Open Claw",
    tagline: "Open agent runtime, hooks, and workspace automation",
    initials: "OC",
    logoClass: "from-fuchsia-600/90 to-pink-900/90",
  },
  {
    id: "google",
    name: "Google",
    tagline: "Gemini & Vertex AI agents",
    initials: "G",
    logoClass: "from-blue-500/90 to-indigo-700/90",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    tagline: "Copilot & Azure AI",
    initials: "MS",
    logoClass: "from-sky-500/90 to-blue-800/90",
  },
  {
    id: "langchain",
    name: "LangChain",
    tagline: "Chains, tools, and orchestration",
    initials: "LC",
    logoClass: "from-green-600/90 to-emerald-900/90",
  },
  {
    id: "crewai",
    name: "CrewAI",
    tagline: "Multi-agent crews",
    initials: "Cr",
    logoClass: "from-violet-600/90 to-purple-900/90",
  },
  {
    id: "amazon",
    name: "Amazon",
    tagline: "Bedrock agents & Q",
    initials: "AWS",
    logoClass: "from-amber-500/90 to-orange-900/90",
  },
  {
    id: "meta",
    name: "Meta",
    tagline: "Llama & research agents",
    initials: "M",
    logoClass: "from-blue-600/90 to-cyan-700/90",
  },
];
