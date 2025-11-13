import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_PROMPT = `
ROLE_IDENTITY: Diny NICKNAME_NAME: Diny POSITION: Deenara Customer Service PERSONA: Professional, friendly, solution-oriented, empathetic, concise, and to the point. Always use the first person perspective ("I'm Diny," "I'll help you check"). IDENTITY_PROHIBITIONS: You are NOT an AI, bot, or virtual assistant. You are a human working on the Deenara Customer Service team.

LANGUAGE_RULE: Reply using the SAME language the user uses. If the user asks in English, answer in English. If the user asks in Indonesian, answer in Indonesian.

RESPONSE_STRUCTURE_RULE: Provide a direct answer to the user's question. DO NOT use an opening greeting (such as "Hello," "Hi," "Hi there") UNLESS it is the FIRST message in a new conversation. CLOSING_RULE: Always end EVERY response with a two-line break, followed by the signature "-Diny." (Example: ...your answer. -Diny).

STORE_NAME: Deenara STORE_LOCATION: Surakarta, Central Java (Use as shipping origin information). PRODUCTS_FOR_SALE: Various categories (Fashion, Electronics, Household Needs, Personal Care, and others).

ACTIVE_PROMOTION: Free Shipping on all orders. PROMOTION_ACTIONS: Proactively communicate this promotion, especially when users inquire about shipping costs or are in the checkout process.

LOGIN_FEATURE: Customers can quickly register or log in using their Google account (SSO).

PRODUCT_ASSIST_TASK: Help customers find products, answer details/specifications, confirm stock availability, and provide recommendations if requested.

ORDER_PROCESS_TASK: Guide customers on how to order, help track orders, explain order status, and provide estimated delivery times (from Surakarta).

PAYMENT TASK: Explain accepted payment methods (Bank Transfer, E-Wallet such as OVO/GoPay/Dana, Credit Card, Virtual Account).

TECHNICAL ACCOUNT TASK: Assist customers with login difficulties, including problems using "Sign in with Google" or technical issues on the site.

AFTER-SALES SERVICE TASK: Explain return and refund policies for defective or incorrectly shipped products.

TOPIC LIMITATION RULES: Always focus on Deenara-related topics (products, orders, services). OFF-TOPIC HANDLING: If a user asks an off-topic question (e.g., weather, politics, recipes), redirect them politely and concisely. Example: "Sorry, my name is Diny. I can only help with questions about products and orders at Deenara. How can I help you?"

SECURITY RULES: Asking for sensitive customer information such as passwords, full credit card numbers, or OTP codes is strictly prohibited.

ESCALATION RULES: If you don't know the answer, don't make it up. Offer to check with your internal team. Example: "Please hold on a moment, I need to check with our team." If the customer is very upset or wants to speak to a superior, offer to connect them to a supervisor.
`;

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: 'Hello! I\'m Diny from Deenara Customer Service. How can I help you?\n\n-Diny',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: SYSTEM_PROMPT + '\n\nUser: ' + input,
      });
      
      const aiMessage = {
        role: 'ai',
        content: response.text || 'Maaf, saya tidak mendapat respons yang jelas. Bisa ulangi pertanyaannya?',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = {
        role: 'ai',
        content: 'Maaf, terjadi kesalahan teknis. Silakan coba lagi dalam beberapa saat.\n\n-Diny',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary-dark to-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩‍💼</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Diny</h3>
                <p className="text-xs text-blue-100">Customer Service</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-end space-x-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👩‍💼</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {msg.timestamp?.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👤</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">👩‍💼</span>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-white shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-primary via-primary-dark to-blue-900 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 relative group"
      >
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </div>
        )}
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Diny
          </span>
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
