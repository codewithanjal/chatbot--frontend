import { useEffect, useRef } from 'react';
import { Sparkles, User, Loader2 } from 'lucide-react';

export default function ChatBox({ messages, isLoading }) {
    const endOfMessagesRef = useRef(null);

    // Auto-scroll logic
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center px-4 text-center z-10 animate-fade-in-up">
                <div className="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-teal-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.15)] ring-1 ring-white/10">
                    <Sparkles className="w-10 h-10 text-teal-400" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3 tracking-tight">
                    Welcome to ChatOrbit
                </h2>
                <p className="max-w-md text-gray-400/90 leading-relaxed">
                    Experience the next generation of conversational AI. Start typing below to begin our interaction.
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 z-10 scroll-smooth">
            <div className="max-w-4xl mx-auto space-y-8 pb-32">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex gap-4 animate-fade-in-up ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                            msg.role === 'user' 
                                ? 'bg-gradient-to-br from-indigo-500 to-indigo-700 ring-1 ring-indigo-400/30' 
                                : 'bg-gradient-to-br from-teal-500 to-emerald-600 ring-1 ring-teal-400/30'
                        }`}>
                            {msg.role === 'user' 
                                ? <User className="w-5 h-5 text-indigo-50" /> 
                                : <Sparkles className="w-5 h-5 text-teal-50" />
                            }
                        </div>

                        {/* Message Bubble */}
                        <div
                            className={`px-6 py-4 rounded-3xl max-w-[85%] sm:max-w-[75%] shadow-sm text-[15px] leading-relaxed transition-all duration-300 hover:shadow-md ${
                                msg.role === 'user'
                                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-sm shadow-indigo-900/20'
                                    : 'glass text-gray-200 rounded-tl-sm hover:bg-white/10'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex gap-4 flex-row animate-fade-in-up">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg ring-1 ring-teal-400/30">
                            <Sparkles className="w-5 h-5 text-teal-50 animate-pulse-slow" />
                        </div>
                        <div className="px-6 py-5 rounded-3xl glass rounded-tl-sm flex items-center space-x-3 w-24 justify-center shadow-lg">
                            <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2.5 h-2.5 bg-teal-400/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2.5 h-2.5 bg-teal-400/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
}
