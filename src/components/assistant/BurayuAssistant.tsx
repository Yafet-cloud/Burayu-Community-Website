"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, MessageCircle, RotateCcw, X } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";
import {
  GREETINGS,
  LANGUAGES,
  QUICK_ACTIONS,
  THINKING_LABELS,
  type LanguageCode,
} from "@/lib/assistant/knowledge";

const STORAGE_KEY = "burayu-assistant-conversation";
const LANG_KEY = "burayu-assistant-language";
const MAX_SAVED_MESSAGES = 50;
const MAX_SAVED_MESSAGE_LENGTH = 20_000;

function messageText(message: UIMessage) {
  if (!Array.isArray(message.parts)) return "";

  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function isSavedMessage(value: unknown): value is UIMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Partial<UIMessage>;

  return (
    typeof message.id === "string" &&
    (message.role === "user" || message.role === "assistant") &&
    Array.isArray(message.parts) &&
    message.parts.every(
      (part) =>
        part &&
        typeof part === "object" &&
        (part as { type?: unknown }).type === "text" &&
        typeof (part as { text?: unknown }).text === "string" &&
        (part as { text: string }).text.length <= MAX_SAVED_MESSAGE_LENGTH,
    )
  );
}

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedMessage).slice(-MAX_SAVED_MESSAGES);
  } catch {
    return [];
  }
}

export function BurayuAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [initialMessages] = useState<UIMessage[]>(() => loadMessages());
  const [startedAt] = useState(() => new Date());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const languageRef = useRef(language);
  languageRef.current = language;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: { ...body, messages, language: languageRef.current },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, setMessages, error } = useChat({
    id: "burayu-assistant",
    messages: initialMessages,
    transport,
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "om" || stored === "am") setLanguage(stored);
    } catch {
      /* storage may be unavailable; English remains the session default */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_KEY, language);
    } catch {
      /* language selection still works for this session */
    }
  }, [language]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or unavailable — chat still works for this session */
    }
  }, [messages]);

  const busy = status === "submitted" || status === "streaming";

  const focusInput = useCallback(() => {
    window.setTimeout(() => textareaRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (open) focusInput();
  }, [open, focusInput]);

  useEffect(() => {
    if (status === "ready" && open) focusInput();
  }, [status, open, focusInput]);

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;
      setInput("");
      void sendMessage({ text: value });
      focusInput();
    },
    [busy, sendMessage, focusInput],
  );

  const reset = useCallback(() => {
    setMessages([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* clearing the in-memory conversation is still sufficient */
    }
    focusInput();
  }, [setMessages, focusInput]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the Burayu Smart Assistant" : "Open the Burayu Smart Assistant"}
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-colors hover:bg-primary-deep"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label="Burayu Smart Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-20 right-3 z-50 flex h-[min(68dvh,540px)] w-[min(calc(100vw-1.5rem),22rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift sm:right-4"
          >
            <header className="flex items-center gap-2.5 border-b border-border bg-primary px-3 py-2.5 text-primary-foreground">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
                <Bot className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold">Burayu Smart Assistant</p>
                <p className="truncate text-xs opacity-80">Science &amp; Technology Office</p>
              </div>
              <div className="flex items-center gap-1">
                <label className="sr-only" htmlFor="assistant-language">
                  Assistant language
                </label>
                <select
                  id="assistant-language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="rounded-lg bg-primary-foreground/15 px-2 py-1 text-xs font-medium text-primary-foreground outline-none"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="text-foreground">
                      {l.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Start a new conversation"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </header>

            <Conversation className="flex-1">
              <ConversationContent className="gap-2.5 px-3 py-3">
                <Message from="assistant">
                  <MessageContent>
                    <MessageResponse>{GREETINGS[language]}</MessageResponse>
                    <time className="mt-1 block text-[11px] text-muted-foreground">
                      {formatTime(startedAt)}
                    </time>
                  </MessageContent>
                </Message>

                {messages.length === 0 && (
                  <div className="flex flex-wrap gap-1.5 px-1 pt-1">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => submit(action)}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-primary-soft"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((message) => {
                  const text = messageText(message);
                  if (!text) return null;
                  return (
                    <Message key={message.id} from={message.role}>
                      <MessageContent
                        className={cn(
                          message.role === "user" &&
                            "bg-primary text-primary-foreground [&_time]:text-primary-foreground/70",
                        )}
                      >
                        <MessageResponse>{text}</MessageResponse>
                      </MessageContent>
                    </Message>
                  );
                })}

                {status === "submitted" && (
                  <Message from="assistant">
                    <MessageContent>
                      <Shimmer>{THINKING_LABELS[language]}</Shimmer>
                    </MessageContent>
                  </Message>
                )}

                {error && (
                  <p role="alert" className="px-1 text-xs text-destructive">
                    Chatbot is currently unavailable. Please try again later.
                  </p>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t border-border bg-card p-2.5">
              <PromptInput
                onSubmit={(_message, event) => {
                  event.preventDefault();
                  submit(input);
                }}
              >
                <PromptInputTextarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, news, or contacts..."
                />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Answers use published website information only.
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
