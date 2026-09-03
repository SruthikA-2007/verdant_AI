import { useMemo, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import './GlobalAIAssistant.css';

const starterQuestions = [
  'Give me sales insights for this week',
  'Which stock is low right now?',
  'Which stock is overloaded?',
  'How can I reduce monthly expenses?',
  'Suggest better supplier planning',
];

const keywordReplies = [
  {
    test: (text) => text.includes('sales') || text.includes('revenue') || text.includes('trend'),
    reply: 'Your current trajectory is healthy. Focus on high-demand SKUs before weekend peaks and bundle top products to raise average bill value.',
  },
  {
    test: (text) => text.includes('expense') || text.includes('cost') || text.includes('profit'),
    reply: 'Largest savings opportunity is in recurring supply and utility costs. Negotiate supplier slabs for top categories and set weekly expense caps per category.',
  },
  {
    test: (text) => text.includes('supplier') || text.includes('vendor') || text.includes('delivery'),
    reply: 'Create a preferred-supplier tier by reliability. Route urgent orders to vendors above 90% reliability and keep backup vendors for watchlist items.',
  },
];

function getDomainFallback(text, inventoryItems = []) {
  const normalized = text.trim().toLowerCase();

  if (normalized.includes('low stock') || (normalized.includes('stock') && normalized.includes('low'))) {
    const lowItems = inventoryItems.filter((item) => item.status === 'critical' || item.status === 'low');
    if (lowItems.length === 0) {
      return 'No low stock alerts right now. Inventory levels look stable.';
    }
    return `Low stock items: ${lowItems.map((item) => `${item.product} (${item.stock})`).join(', ')}.`;
  }

  if (normalized.includes('overloaded') || normalized.includes('over stock') || normalized.includes('overstock')) {
    const overloadedItems = inventoryItems.filter((item) => item.stock >= (item.threshold || 5) * 2);
    if (overloadedItems.length === 0) {
      return 'No overloaded stock items detected based on current threshold levels.';
    }
    return `Overloaded stock items: ${overloadedItems.map((item) => `${item.product} (${item.stock})`).join(', ')}.`;
  }

  const match = keywordReplies.find((item) => item.test(normalized));
  return match?.reply || 'I can help with sales insights, expense analysis, and supplier suggestions. Ask a specific business question and I will break it down.';
}

export default function GlobalAIAssistant({ business }) {
  const { sendChatMessage, isLoading } = useAI();
  const inventoryItems = business?.workspace?.inventory?.inventoryData || [];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => ([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I am your AI assistant for ${business?.businessName || 'your business'}. Ask about sales, expenses, or suppliers.`,
    },
  ]));

  const conversationHistory = useMemo(
    () => messages.map((msg) => ({ role: msg.role, content: msg.content })),
    [messages],
  );

  const submitMessage = async (messageText) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const reply = await sendChatMessage([...conversationHistory, { role: 'user', content: trimmed }], {
      fallback: getDomainFallback(trimmed, inventoryItems),
    });

    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, role: 'assistant', content: reply || getDomainFallback(trimmed, inventoryItems) },
    ]);
  };

  return (
    <>
      <button
        className={`ai-fab ${open ? 'ai-fab--hidden' : ''}`}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
      >
        <Bot size={18} />
        <span>AI Assistant</span>
      </button>

      {open && (
        <section className="ai-panel animate-scale-in" aria-label="AI assistant panel">
          <header className="ai-panel__header">
            <div>
              <p className="ai-panel__title"><Sparkles size={14} /> Verdant AI</p>
              <p className="ai-panel__subtitle">Business intelligence assistant</p>
            </div>
            <button className="ai-panel__close" type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={16} />
            </button>
          </header>

          <div className="ai-panel__questions">
            {starterQuestions.map((question) => (
              <button key={question} type="button" onClick={() => submitMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <div className="ai-panel__messages">
            {messages.map((msg) => (
              <article key={msg.id} className={`ai-msg ai-msg--${msg.role}`}>
                <p>{msg.content}</p>
              </article>
            ))}
            {isLoading && <div className="ai-msg ai-msg--assistant"><p>Analyzing your business data...</p></div>}
          </div>

          <form
            className="ai-panel__input"
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about sales, expenses, or suppliers"
              className="input"
            />
            <button className="btn btn-primary btn-icon" type="submit" disabled={isLoading || !input.trim()}>
              <Send size={14} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}

