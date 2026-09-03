import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/ai.service';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Xin chào! Mình là trợ lý ảo của nhà hàng La TiuKy. Mình có thể giúp gì cho bạn hôm nay?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatWithAI(newUserMsg.text, messages);
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Xin lỗi, hiện tại hệ thống Trợ lý ảo đang bảo trì hoặc mất kết nối. Bạn vui lòng liên hệ Hotline nhé.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <button
          onClick={toggleChat}
          className="relative group w-14 h-14 bg-[#B7913C] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(183,145,60,0.4)] hover:shadow-[0_0_30px_rgba(183,145,60,0.6)] hover:bg-[#F1E9D8] transition-all duration-300 hover:-translate-y-1"
          title="Chat với Trợ lý ảo"
        >
          <div className="absolute inset-0 bg-[#B7913C] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
          <svg className="w-6 h-6 text-[#121B16] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-[101] w-[350px] sm:w-[400px] bg-[#16251e]/95 backdrop-blur-xl border border-[#2a3c31] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'}`} style={{ height: '550px', maxHeight: 'calc(100vh - 40px)' }}>
        
        {/* Header */}
        <div className="h-16 bg-gradient-to-r from-[#121B16] to-[#16251e] border-b border-[#2a3c31] flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-[#B7913C]/10 rounded-full flex items-center justify-center border border-[#B7913C]/30 shadow-[0_0_15px_rgba(183,145,60,0.2)]">
                <span className="text-[#B7913C] font-serif font-bold text-sm">AI</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#16251e] rounded-full"></span>
            </div>
            <div>
              <h3 className="text-[#F1E9D8] font-semibold text-sm">La TiuKy Assistant</h3>
              <p className="text-green-500 text-[11px] flex items-center gap-1 font-medium tracking-wide">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Luôn trực tuyến
              </p>
            </div>
          </div>
          <button onClick={toggleChat} className="text-[#A9B4A4] hover:text-[#F1E9D8] hover:bg-[#2a3c31] p-2 rounded-lg transition-colors focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#2a3c31] scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.isUser ? 'bg-[#B7913C] text-[#121B16] rounded-tr-sm shadow-lg shadow-[#B7913C]/20 font-medium' : 'bg-[#121B16] text-[#A9B4A4] border border-[#2a3c31] rounded-tl-sm shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-[#121B16] border border-[#2a3c31] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 w-16 shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#B7913C] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#B7913C] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-1.5 h-1.5 bg-[#B7913C] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips */}
        {!isTyping && messages.length < 3 && (
          <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
            <button onClick={() => setInputValue('Giờ mở cửa?')} className="text-xs text-[#B7913C] border border-[#B7913C]/30 bg-[#B7913C]/5 px-3 py-1.5 rounded-full hover:bg-[#B7913C] hover:text-[#121B16] transition-colors focus:outline-none">Giờ mở cửa?</button>
            <button onClick={() => setInputValue('Món nào ngon?')} className="text-xs text-[#B7913C] border border-[#B7913C]/30 bg-[#B7913C]/5 px-3 py-1.5 rounded-full hover:bg-[#B7913C] hover:text-[#121B16] transition-colors focus:outline-none">Món nào ngon?</button>
            <button onClick={() => setInputValue('Địa chỉ ở đâu?')} className="text-xs text-[#B7913C] border border-[#B7913C]/30 bg-[#B7913C]/5 px-3 py-1.5 rounded-full hover:bg-[#B7913C] hover:text-[#121B16] transition-colors focus:outline-none">Địa chỉ ở đâu?</button>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-[#121B16] border-t border-[#2a3c31]">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhắn tin với AI..."
              className="w-full bg-[#16251e] text-[#F1E9D8] text-sm rounded-full pl-4 pr-12 py-3 border border-[#2a3c31] focus:outline-none focus:border-[#B7913C] transition-colors"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 p-1.5 bg-[#B7913C] text-[#121B16] rounded-full disabled:opacity-50 disabled:bg-[#2a3c31] disabled:text-[#A9B4A4] transition-colors focus:outline-none"
            >
              <svg className="w-4 h-4 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[9px] text-[#B7913C]/60 uppercase tracking-[0.2em] font-medium">Powered by La TiuKy AI</span>
          </div>
        </div>
      </div>
    </>
  );
};
