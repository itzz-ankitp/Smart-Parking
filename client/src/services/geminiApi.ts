// Gemini API configuration and service functions
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY || "AIzaSyAuL9WsDZ12Og7Ej-18DXfDSBgjMK5fxYU";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  parts: { text: string }[];
}

export interface ChatHistory {
  contents: ChatMessage[];
}

export class GeminiApiService {
  private chatHistory: ChatMessage[] = [];

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to chat history
      this.chatHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
      });

      const payload = {
        contents: this.chatHistory
      };

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        
        const assistantMessage = result.candidates[0].content.parts[0].text;
        
        // Add assistant response to chat history
        this.chatHistory.push({
          role: "assistant",
          parts: [{ text: assistantMessage }]
        });

        return assistantMessage;
      } else {
        throw new Error('Unexpected response structure from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to get response from AI assistant. Please try again.');
    }
  }

  clearHistory(): void {
    this.chatHistory = [];
  }

  getHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }
}

// Create singleton instance
export const geminiApi = new GeminiApiService();
