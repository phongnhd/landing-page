import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Headset, Send, X, Loader2, Trash2 } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

// Constants
const INITIAL_MESSAGE = { id: '1', text: 'Hỏi nhẹ tay thôi... CPU của mình cũng biết mệt.', sender: 'bot', timestamp: new Date() };
const CHAT_API_URL = import.meta.env.VITE_API_URL;
const MAX_HISTORY = 10;
const SCROLL_DELAY = 100;
const SENDER = { USER: 'user', BOT: 'bot' };

// Custom hook for chat logic
const useChat = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text, history) => {
    if (!text?.trim()) return;
    const userMessage = { id: crypto.randomUUID?.() || Date.now().toString(), text: text.trim(), sender: SENDER.USER, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: history.slice(-MAX_HISTORY) }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      const data = await response.json();
      const botReply = data.answer || data.reply || 'Oops! Mình chưa hiểu ý bạn lắm.';
      setMessages(prev => [...prev, { id: crypto.randomUUID?.() || Date.now().toString(), text: botReply, sender: SENDER.BOT, timestamp: new Date() }]);
    } catch (err) {
      setError(err.message);
      console.error('[Chat] Error:', err);
      setMessages(prev => [...prev, { id: crypto.randomUUID?.() || Date.now().toString(), text: 'Tín hiệu nhận được hơi nhiễu, gửi lại giúp mình nhé.', sender: SENDER.BOT, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => { 
    setMessages([INITIAL_MESSAGE]); 
    setError(null); 
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
};

// Sub-component: Message
const Message = ({ message }) => {
  const isUser = message.sender === SENDER.USER;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-xl p-3 ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
        {message.text}
      </div>
    </div>
  );
};

const ChatHeader = ({ onClose, onClear, messageCount }) => (
  <div className="flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
    <div>
      <h3 className="font-semibold">NextTech AI</h3>
      <p className="text-xs opacity-80">Powered by phongnhd</p>
    </div>
    <div className="flex items-center gap-2">
      {messageCount > 1 && (
        <button 
          onClick={onClear}
          className="hover:bg-blue-700 p-1.5 rounded-full transition-colors"
          aria-label="Xóa lịch sử chat"
          title="Xóa lịch sử chat"
        >
          <Trash2 size={18} />
        </button>
      )}
      <button 
        onClick={onClose} 
        className="hover:bg-blue-700 p-1 rounded-full transition-colors" 
        aria-label="Dong chat"
      >
        <X size={20} />
      </button>
    </div>
  </div>
);

// Sub-component: ChatInput
const ChatInput = ({ value, onChange, onSend, isLoading, disabled }) => {
  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } };
  return (
    <div className="flex items-center gap-2 border-t dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
      <input value={value} onChange={onChange} onKeyPress={handleKeyPress}
        placeholder="Bạn muốn biết điều gì?" disabled={disabled || isLoading}
        className="flex-1 rounded-lg border dark:border-gray-600 px-3 py-2 outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50 transition-colors"
        aria-label="Nhap tin nhan" />
      <button onClick={onSend} disabled={!value?.trim() || disabled || isLoading}
        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Gui tin nhan">
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send size={18} />}
      </button>
    </div>
  );
};

// Sub-component: ChatMessages
const ChatMessages = ({ messages, isLoading, messagesEndRef }) => (
  <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
    {messages.map((msg) => <Message key={msg.id} message={msg} />)}
    {isLoading && (
      <div className="flex justify-start">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-3">
          <Loader2 className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>
);

// Main Component
export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useChat(); 
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, SCROLL_DELAY);
    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const focusTimeout = setTimeout(() => { inputRef.current?.focus(); }, 300);
      return () => clearTimeout(focusTimeout);
    }
  }, [isOpen]);

  const handleToggleChat = useCallback(() => { setIsOpen(prev => !prev); }, []);
  const handleSend = useCallback(async () => {
    if (!inputValue?.trim() || isLoading) return;
    const message = inputValue;
    setInputValue('');
    await sendMessage(message, messages);
  }, [inputValue, isLoading, sendMessage, messages]);
  const handleInputChange = useCallback((e) => { setInputValue(e.target.value); }, []);
  const buttonIcon = useMemo(() => <Headset className="h-6 w-6" />, []);

  const handleClearChat = useCallback(() => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử chat?')) {
      clearMessages();
    }
  }, [clearMessages]);

  return (
    <>
      <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={handleToggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-colors"
        aria-label={isOpen ? 'Dong chat' : 'Mo chat'}>
        {buttonIcon}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }} transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            role="dialog" aria-label="Chat box">
            <ChatHeader 
              onClose={handleToggleChat} 
              onClear={handleClearChat}  
              messageCount={messages.length} 
            />
            <ChatMessages messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
            <ChatInput ref={inputRef} value={inputValue} onChange={handleInputChange} onSend={handleSend} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
