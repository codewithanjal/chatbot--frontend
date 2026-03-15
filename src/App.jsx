import { useState } from 'react';
import ChatBox from './components/ChatBox.jsx';
import InputBox from './components/InputBox.jsx';
import { sendMessageToAPI } from './services/api.js';
import { Sparkles, Activity } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async (text) => {
    setError(null);
    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await sendMessageToAPI(text, chatId);
      if (data.chatId) setChatId(data.chatId);
      
      if (data.messages) {
         setMessages(data.messages);
      } else {
         const botMessage = { role: 'assistant', content: data.reply };
         setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setError("We encountered a connection error. Please try again.");
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "⚠️ Sorry, I encountered a connection error. Please try again or check your backend server.", isError: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] relative overflow-hidden font-sans">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header Area */}
      <header className="glass flex items-center justify-between px-8 py-4 z-20 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-xl shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-teal-200 tracking-wide">
            ChatOrbit
          </h1>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
           <Activity className="w-3.5 h-3.5 text-teal-400" />
           <span className="text-teal-400/90">System Online</span>
        </div>
      </header>

      {/* Main Chat Feed */}
      <ChatBox messages={messages} isLoading={isLoading} />

      {/* Input Field Area */}
      <div className="z-20 p-4 pb-6 sm:p-6 sm:pb-8 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent">
        <div className="max-w-4xl mx-auto">
          {error && (
             <div className="mb-3 text-center text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 py-2 rounded-lg animate-fade-in-up">
               {error}
             </div>
          )}
          <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
