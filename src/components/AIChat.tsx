import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { profile } from '../config';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm Wisnu's AI assistant. I can tell you about his skills, experience, and projects. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Open/close animation
  useEffect(() => {
    if (chatRef.current) {
      gsap.to(chatRef.current, {
        scale: isOpen ? 1 : 0.9,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
        display: isOpen ? 'flex' : 'none',
      });
    }
  }, [isOpen]);

  // Button pulse animation
  useEffect(() => {
    if (buttonRef.current && !isOpen) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, [isOpen]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Skills related
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
      return `Wisnu is proficient in:\n\n• Frontend: React, TypeScript, Next.js, Tailwind CSS\n• Backend: Node.js, PostgreSQL, Supabase\n• Security: Cloud Security, Cybersecurity\n• Other: Google Analytics, SEO, Full-Stack Development\n\nHe also has strong soft skills in communication, leadership, and teamwork.`;
    }
    
    // Experience related
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return `Wisnu has diverse experience:\n\n• Full-Stack Developer at Ashar Grosir Parfum (Current)\n• VoD Art & Sport Division at PUFA Computer Science (Current)\n• IT Development at PC FKMA Jakarta As'adiyah\n• Member at PUMA Informatic\n\nHe's been in the field for 5+ years with 50+ projects delivered.`;
    }
    
    // Projects related
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      return `Wisnu has built several impressive projects:\n\n• Ashar Grosir Parfum - E-commerce platform\n• LexCorpus CMS - Legal content management system\n• Nuxar Perfumery - Luxury perfume website\n• PC FKMA Jakarta - Alumni organization platform\n• Wiskost Residence - Real estate website\n\nWould you like details on any specific project?`;
    }
    
    // Contact related
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return `You can reach Wisnu at:\n\n• Email: ${profile.personalInfo.email}\n• Phone: ${profile.personalInfo.phone}\n• LinkedIn: linkedin.com/in/wisnu-alfian-nur-ashar\n\nHe's currently available for work and open to new opportunities!`;
    }
    
    // Education related
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
      return `Wisnu is pursuing a Bachelor of Information Technology at President University (2024 - Present).\n\nHis focus areas include:\n• Full-Stack Development\n• Database Architecture\n• Cloud Infrastructure\n\nHe's also certified in Google Analytics, Google Ads, Software Engineering, and more.`;
    }
    
    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! 👋 I'm Wisnu's AI assistant. I can help you learn about:\n\n• His technical skills and expertise\n• Work experience and projects\n• Education and certifications\n• How to get in touch\n\nWhat would you like to know?`;
    }
    
    // Default response
    return `That's an interesting question! Wisnu is a Full-Stack Developer & Security Specialist with 5+ years of experience.\n\nHe specializes in building production-grade web applications using React, Next.js, TypeScript, and modern cloud technologies.\n\nIs there something specific about his skills, experience, or projects you'd like to know more about?`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = generateResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-void-black shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_40px_rgba(0,212,255,0.7)] transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open AI Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat window */}
      <div
        ref={chatRef}
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[500px] bg-void-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] flex-col overflow-hidden ${
          isOpen ? 'flex' : 'hidden'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
              <Bot className="w-5 h-5 text-void-black" />
            </div>
            <div>
              <h3 className="text-sm font-display text-white">AI Assistant</h3>
              <p className="text-xs text-white/50">Ask about Wisnu</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-neon-blue/20'
                    : 'bg-gradient-to-r from-neon-cyan to-neon-blue'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-neon-blue" />
                ) : (
                  <Bot className="w-4 h-4 text-void-black" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.role === 'user'
                    ? 'bg-neon-blue/10 text-white border border-neon-blue/30 rounded-tr-sm'
                    : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-sm'
                }`}
              >
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue flex items-center justify-center">
                <Bot className="w-4 h-4 text-void-black" />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm">
                <Loader2 className="w-4 h-4 text-neon-cyan animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Wisnu's skills, experience..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-void-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;
