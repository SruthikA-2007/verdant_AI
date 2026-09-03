import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Wifi, WifiOff, MessageSquare, Zap } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { useAI } from '../hooks/useAI';
import { initialMessage, quickPrompts } from '../data/mockData';
import './ChatbotPage.css';

export default function ChatbotPage({ business }) {
  const chatbotData = business?.workspace?.chatbot || { title: 'AI Customer Assistant', subtitle: 'Powered by Claude — answers customer queries 24/7', storeContext: 'Sharma General Store, Bangalore', languages: ['English', 'हिंदी', 'தமிழ்'], channels: ['Web Chat', 'WhatsApp Ready'], stats: { queriesToday: 8, resolved: 6, averageResponse: '1.2s' }, quickPrompts, initialMessage, systemPrompt: null };
  const [messages, setMessages] = useState([chatbotData.initialMessage]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const { sendChatMessage, isLoading } = useAI();
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;
    setInput('');

    const userMsg = { id: `user-${messageIdRef.current++}`, role: 'user', content: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const newHistory = [...history, { role: 'user', content: userText }];

    setMessages(prev => [...prev, userMsg]);
    setHistory(newHistory);

    const reply = await sendChatMessage(newHistory, {
      systemPrompt: chatbotData.systemPrompt,
    });
    const botMsg = { id: `bot-${messageIdRef.current++}`, role: 'assistant', content: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-wrap">
      <Topbar title={chatbotData.title} subtitle={chatbotData.subtitle} />
      <div className="chat-layout animate-fade-in">

        {/* Sidebar Info Panel */}
        <div className="chat-info-panel card">
          <div className="chat-info-header">
            <div className="chat-bot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h3>Verdant AI</h3>
              <div className="chat-status">
                <span className="chat-status-dot" />
                Online • Replies instantly
              </div>
            </div>
          </div>
          <div className="chat-info-divider" />

          <div className="chat-info-section">
            <p className="chat-info-label">Store Context</p>
            <p className="chat-info-value">{chatbotData.storeContext}</p>
          </div>
          <div className="chat-info-section">
            <p className="chat-info-label">Languages</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {chatbotData.languages.map((language) => (
                <span key={language} className={`badge ${language === 'English' ? 'badge-primary' : 'badge-gray'}`}>{language}</span>
              ))}
            </div>
          </div>
          <div className="chat-info-section">
            <p className="chat-info-label">Channels</p>
            <div className="chat-channels">
              {chatbotData.channels.map((channel, index) => (
                <div key={channel} className={`chat-channel ${index === 0 ? 'chat-channel--active' : ''}`}>
                  {index === 0 ? <MessageSquare size={13} /> : <Zap size={13} />}
                  {channel}
                </div>
              ))}
            </div>
          </div>
          <div className="chat-info-section">
            <p className="chat-info-label">Quick Stats</p>
            <div className="chat-stats">
              <div className="chat-stat"><span>Queries Today</span><strong>{chatbotData.stats.queriesToday}</strong></div>
              <div className="chat-stat"><span>Resolved</span><strong>{chatbotData.stats.resolved}</strong></div>
              <div className="chat-stat"><span>Avg. Response</span><strong>{chatbotData.stats.averageResponse}</strong></div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="chat-info-section">
            <p className="chat-info-label">Try Asking</p>
            <div className="chat-quick-prompts">
              {chatbotData.quickPrompts.map((p, i) => (
                <button key={i} className="chat-quick-btn" onClick={() => handleSend(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window card">
          <div className="chat-window-header">
            <div className="chat-bot-avatar chat-bot-avatar--sm">
              <Bot size={16} />
            </div>
            <div>
              <p className="chat-window-title">Verdant AI Assistant</p>
              <p className="chat-window-sub">Online • Typically replies in &lt;2 seconds</p>
            </div>
            <div className="chat-window-powered">
              <Zap size={11} fill="currentColor" />
              Powered by Claude
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-msg chat-msg--${msg.role} animate-fade-in`}
              >
                {msg.role === 'assistant' && (
                  <div className="chat-msg-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className="chat-msg-bubble">
                  <p>{msg.content}</p>
                  <span className="chat-msg-time">{msg.time}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="chat-msg-avatar chat-msg-avatar--user">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="chat-msg chat-msg--assistant animate-fade-in">
                <div className="chat-msg-avatar">
                  <Bot size={14} />
                </div>
                <div className="chat-msg-bubble chat-typing-bubble">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <div className="chat-input-row">
              <textarea
                ref={inputRef}
                className="chat-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Press Enter to send)"
                rows={1}
                disabled={isLoading}
              />
              <button
                className={`btn btn-primary btn-icon chat-send-btn ${isLoading ? 'loading' : ''}`}
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="chat-input-hint">
              <Wifi size={11} /> End-to-end secure • WhatsApp integration available
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

