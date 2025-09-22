import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useConsent } from '@/hooks/useConsent';
import { FaqBot } from './FaqBot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system' | 'bot';
  timestamp: Date;
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { canUseAnalytics } = useConsent();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      setMessages([{
        id: '1',
        text: "Hi! I'm here to help. What can I assist you with today?",
        sender: 'system',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Track message if consent given
    // Analytics tracking moved to production service

    // Show email capture after first user message
    if (messages.filter(m => m.sender === 'user').length === 0) {
      setTimeout(() => {
        const systemResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for reaching out! We'll get back to you shortly. Would you like to leave your email so we can follow up?",
          sender: 'system',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, systemResponse]);
        setShowEmailForm(true);
      }, 500);
    }

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Analytics tracking moved to production service
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        aria-label="Open live chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
          <h3 className="font-semibold">Chat with us</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {/* FAQ Bot Integration */}
          <FaqBot onSuggestion={(suggestion) => {
            const botMessage: Message = {
              id: Date.now().toString(),
              text: suggestion,
              sender: 'bot',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
          }} />
          
          {/* Email Form */}
          {showEmailForm && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm mb-2">Leave your email for follow-up:</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1"
                />
                <Button size="sm">Submit</Button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              aria-label="Chat message input"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}