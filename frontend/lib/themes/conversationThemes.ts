export type ConversationTheme = {
  id: string;
  label: string;
  vars: Record<string, string>;
};

export const conversationThemes: ConversationTheme[] = [
  { id: "aurora", label: "Aurora", vars: { "--conv-grad-1": "rgba(0,255,209,0.35)", "--conv-grad-2": "rgba(98,206,255,0.32)", "--conv-grad-3": "rgba(168,126,255,0.28)", "--conv-base-1": "rgba(255,255,255,0.94)", "--conv-base-2": "rgba(236,244,255,0.98)" } },
  { id: "sunset", label: "Sunset", vars: { "--conv-grad-1": "rgba(255,170,77,0.36)", "--conv-grad-2": "rgba(255,92,133,0.34)", "--conv-grad-3": "rgba(255,111,181,0.30)", "--conv-base-1": "rgba(255,249,246,0.94)", "--conv-base-2": "rgba(250,236,242,0.98)" } },
  { id: "mint", label: "Mint", vars: { "--conv-grad-1": "rgba(64,255,200,0.34)", "--conv-grad-2": "rgba(64,200,255,0.30)", "--conv-grad-3": "rgba(130,255,170,0.28)", "--conv-base-1": "rgba(249,255,252,0.94)", "--conv-base-2": "rgba(232,248,244,0.98)" } },
  { id: "midnight", label: "Midnight", vars: { "--conv-grad-1": "rgba(72,130,255,0.32)", "--conv-grad-2": "rgba(40,80,200,0.30)", "--conv-grad-3": "rgba(24,38,84,0.28)", "--conv-base-1": "rgba(247,249,255,0.94)", "--conv-base-2": "rgba(235,240,255,0.98)" } },
  { id: "citrus", label: "Citrus", vars: { "--conv-grad-1": "rgba(255,226,109,0.38)", "--conv-grad-2": "rgba(255,154,66,0.34)", "--conv-grad-3": "rgba(255,230,150,0.28)", "--conv-base-1": "rgba(255,252,245,0.94)", "--conv-base-2": "rgba(252,244,230,0.98)" } },
];

export function applyConversationTheme(vars: Record<string, string>) {
  Object.entries(vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
