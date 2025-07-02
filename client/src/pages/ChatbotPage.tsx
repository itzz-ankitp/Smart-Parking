import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNotification } from '@/contexts/NotificationContext';
import { geminiApi } from '@/services/geminiApi';
import { 
  Bot, 
  User, 
  Send, 
  MapPin, 
  Car, 
  Clock, 
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant for the Smart Services Portal. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showNotification } = useNotification();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      // Get AI response
      const response = await geminiApi.sendMessage(userMessage);
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Chat error:', error);
      addMessage(
        "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment.",
        'bot'
      );
      showNotification('Failed to get AI response. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const suggestedQuestions = [
    {
      text: "What services are available in KR Puram?",
      icon: MapPin
    },
    {
      text: "How do I access parking services?",
      icon: Car
    },
    {
      text: "What are the operating hours?",
      icon: Clock
    },
    {
      text: "How can I report an issue?",
      icon: AlertCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="smart-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[var(--smart-accent)] rounded-lg flex items-center justify-center mr-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--smart-primary)]">AI Assistant</h1>
                <p className="text-gray-600">Ask me anything about our services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Container */}
        <Card className="smart-shadow chat-container h-96 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'justify-end message-user' : 'message-bot'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-[var(--smart-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-3 max-w-xs lg:max-w-md smart-transition ${
                    message.sender === 'user'
                      ? 'bg-[var(--smart-accent)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-[var(--smart-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3 message-bot">
                <div className="w-8 h-8 bg-[var(--smart-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[var(--smart-accent)]" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[var(--smart-accent)] hover:bg-[var(--smart-accent)]/90 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, or click the send button
            </p>
          </div>
        </Card>

        {/* Suggested Questions */}
        <Card className="mt-6 smart-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left p-3 h-auto justify-start hover:bg-gray-50 hover:border-[var(--smart-accent)] smart-transition"
                  onClick={() => handleSuggestedQuestion(question.text)}
                  disabled={isLoading}
                >
                  <question.icon className="h-4 w-4 text-[var(--smart-accent)] mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{question.text}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatbotPage;
