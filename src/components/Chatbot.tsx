"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const text = {
    ID: {
      title: "Asisten HobbyKit",
      subtitle: "Online",
      placeholder: "Tanya soal produk, pengiriman...",
      greeting: "Halo! Saya asisten HobbyKit. Ada yang bisa saya bantu seputar produk atau pesanan kamu? 😊",
      thinking: "Sedang mengetik...",
      send: "Kirim",
    },
    EN: {
      title: "HobbyKit Assistant",
      subtitle: "Online",
      placeholder: "Ask about products, shipping...",
      greeting: "Hi! I'm the HobbyKit assistant. How can I help you today? 😊",
      thinking: "Typing...",
      send: "Send",
    },
  };

  const t = text[lang];

  // Greeting awal saat pertama dibuka
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: t.greeting }]);
    }
  }, [isOpen]);

  // Auto scroll ke bawah
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          // Kirim riwayat percakapan (kecuali greeting awal)
          history: newMessages.slice(1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi kesalahan. Coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Buka Chatbot"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-black flex items-center justify-center transform -skew-x-6 border-b-4 border-r-4 border-white/30 hover:translate-y-1 hover:border-b-2 hover:border-r-2 transition-all shadow-[4px_4px_0_0_#ffffff30]"
      >
        {isOpen ? (
          <X className="w-6 h-6 transform skew-x-6" />
        ) : (
          <MessageCircle className="w-6 h-6 transform skew-x-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-[340px] sm:w-[380px] bg-black border-2 border-primary shadow-[8px_8px_0_0_#FDE047] flex flex-col overflow-hidden"
          style={{ maxHeight: "70vh" }}
        >
          {/* Header */}
          <div className="bg-primary text-black px-4 py-3 flex items-center gap-3 transform -skew-x-1 border-b-4 border-black">
            <div className="w-8 h-8 bg-black flex items-center justify-center border-2 border-black transform skew-x-1">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="transform skew-x-1">
              <p className="font-black uppercase tracking-widest text-sm leading-none">{t.title}</p>
              <p className="text-xs font-bold tracking-wider flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/95" style={{ minHeight: "260px", maxHeight: "calc(70vh - 130px)" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 flex items-center justify-center border-2 shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-primary border-primary text-black"
                    : "bg-white/10 border-white/20 text-white"
                }`}>
                  {msg.role === "assistant"
                    ? <Bot className="w-4 h-4" />
                    : <User className="w-4 h-4" />
                  }
                </div>

                {/* Bubble */}
                <div className={`max-w-[75%] px-3 py-2 text-sm font-medium leading-relaxed border-2 ${
                  msg.role === "assistant"
                    ? "bg-white/5 border-white/10 text-gray-300 border-l-4 border-l-primary"
                    : "bg-primary text-black border-primary"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 flex items-center justify-center border-2 bg-primary border-primary text-black shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/5 border-2 border-white/10 border-l-4 border-l-primary px-4 py-3">
                  <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-primary p-3 flex gap-2 bg-black">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1 bg-white/5 border-2 border-white/20 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label={t.send}
              className="bg-primary text-black p-2 border-b-4 border-r-4 border-white/20 hover:translate-y-0.5 hover:border-b-2 hover:border-r-2 transition-all disabled:opacity-40 transform -skew-x-6"
            >
              <Send className="w-4 h-4 transform skew-x-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
