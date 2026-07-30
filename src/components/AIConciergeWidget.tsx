import React, { useState, useRef, useEffect } from 'react';
import { AIChatMessage } from '../types';
import { Bot, Send, X, Sparkles, MessageSquare, Phone, Calendar, User, Compass, ArrowRight } from 'lucide-react';
import konradHeadshot from '../assets/images/konrad_headshot_1785287220015.jpg';

interface AIConciergeWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScheduleModal: () => void;
  activeListingsCount: number;
}

export const AIConciergeWidget: React.FC<AIConciergeWidgetProps> = ({
  isOpen,
  onClose,
  onOpenScheduleModal,
  activeListingsCount
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello! I am Konrad Schultz's AI Real Estate Concierge. How can I assist your South Florida home search or selling evaluation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const quickPrompts = [
    "Show waterfront condos in Sunny Isles under $2M",
    "What is the average price per sqft in Aventura?",
    "Schedule a consultation with Konrad Schultz",
    "Calculate monthly mortgage for a $1.2M home"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          conversationHistory: messages.map(m => ({ role: m.sender, content: m.text }))
        })
      });

      const data = await res.json();

      const aiMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'd be glad to assist you! Feel free to call Konrad Schultz directly at 954-297-5559.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I am having trouble connecting to AI services right now, but Konrad Schultz is standing by at 954-297-5559 to give you expert guidance!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] glass-modal rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-slate-100 border border-white/20">
      
      {/* Header Bar */}
      <div className="p-4 px-5 bg-slate-950/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/40 shadow-md bg-slate-950 shrink-0">
            <img
              src={konradHeadshot}
              alt="Konrad Schultz"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 font-serif">
              Konrad Schultz AI Concierge
            </div>
            <div className="text-[10px] text-cyan-300 font-semibold">
              Powered by Gemini • Beachfront Realty
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-white/10 border border-white/15 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/40">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold rounded-br-none shadow-md'
                  : 'glass-card text-slate-100 rounded-bl-none shadow-sm font-light'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-cyan-300 p-2 glass-card rounded-xl w-fit border border-cyan-400/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Konrad's AI is analyzing South Florida listings...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-2.5 bg-slate-950/80 backdrop-blur-md border-t border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="px-2.5 py-1 rounded-lg glass-badge hover:border-cyan-400/60 hover:text-cyan-300 text-[10px] text-slate-200 font-medium shrink-0 transition-all cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-950/90 backdrop-blur-md border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about properties, pricing, or areas..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 disabled:opacity-50 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer font-bold border border-cyan-300/40"
          >
            <Send className="w-4 h-4 text-slate-950" />
          </button>
        </form>

        <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-slate-300">
          <a href="tel:9542975559" className="hover:text-cyan-300 flex items-center gap-1">
            <Phone className="w-3 h-3 text-cyan-400" />
            954-297-5559
          </a>
          <button
            onClick={() => {
              onClose();
              onOpenScheduleModal();
            }}
            className="hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Calendar className="w-3 h-3 text-cyan-400" />
            Schedule Tour
          </button>
        </div>
      </div>

    </div>
  );
};
