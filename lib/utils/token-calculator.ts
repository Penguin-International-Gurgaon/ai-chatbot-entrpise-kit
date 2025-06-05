export function calculateTokens(prompt: string, response: string): number {
    // Simple token calculation: length of prompt + response/4
    return prompt.length + Math.ceil(response.length / 4)
  }
  