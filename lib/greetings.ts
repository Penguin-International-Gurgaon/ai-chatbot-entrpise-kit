const welcomeFallbacks = [
  "Welcome ! How can I help you today?",
  "Hello! I'm here to assist you with any questions you have.",
  "Hi there! What would you like to explore today?",
  "Welcome! I'm ready to help you with whatever you need.",
  "Greetings! How can I make your day more productive?"
];

const thinkingFallbacks = [
  "Pondering",
  "Thinking", 
  "Wondering",
  "Contemplating",
  "Reflecting",
  "Processing",
  "Analyzing",
  "Considering",
  "Mulling over",
  "Deliberating"
];

export async function generateWelcomeMessage(): Promise<string> {
  return welcomeFallbacks[Math.floor(Math.random() * welcomeFallbacks.length)];
}

export async function generateThinkingText(): Promise<string> {
  return thinkingFallbacks[Math.floor(Math.random() * thinkingFallbacks.length)];
}
