import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

export default function InputBox({ onSendMessage, isLoading }) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage('');
            if (textareaRef.current) textareaRef.current.style.height = '56px'; // Reset height
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative group w-full">
            {/* Glowing border effect on hover/focus within */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none"></div>
            
            <div className="relative glass rounded-3xl flex items-end shadow-2xl p-2 transition-all duration-300">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message ChatOrbit..."
                    className="w-full bg-transparent text-gray-100 placeholder-gray-500 py-3.5 pl-4 pr-14 focus:outline-none resize-none overflow-y-auto max-h-[200px] min-h-[56px] text-[15px] custom-scrollbar"
                    rows="1"
                    disabled={isLoading}
                />
                
                <div className="absolute right-3 bottom-3 flex items-center">
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading}
                        className="p-2.5 text-white bg-white/10 hover:bg-teal-500/80 rounded-2xl disabled:opacity-30 disabled:hover:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 shadow-sm border border-white/5 disabled:border-transparent"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                        ) : (
                            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
