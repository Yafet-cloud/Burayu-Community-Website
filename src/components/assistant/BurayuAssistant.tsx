"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, Compass, MessageCircle, Megaphone, Phone, RotateCcw, Send, Building2, Newspaper, X, Maximize2, Minimize2 } from "lucide-react";

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
  UI_STRINGS,
  type LanguageCode,
} from "@/lib/assistant/knowledge";

const STORAGE_KEY = "burayu-assistant-conversation";
const LANG_KEY = "burayu-assistant-language";
const MAX_SAVED_MESSAGES = 50;
const MAX_SAVED_MESSAGE_LENGTH = 20_000;

const ACTION_ICONS = [Compass, Newspaper, Megaphone, Building2, Phone] as const;

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
  const [isMaximized, setIsMaximized] = useState(false);
  const [initialMessages] = useState<UIMessage[]>(() => loadMessages());
  const [startedAt] = useState(() => new Date());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

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

  const { messages, sendMessage, status, setMessages, stop, error } = useChat({
    id: "burayu-assistant",
    messages: initialMessages,
    transport,
  });

  const ui = UI_STRINGS[language];

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
    if (open && !matchMedia("(pointer: coarse)").matches) focusInput();
  }, [open, focusInput]);

  useEffect(() => {
    if (status === "ready" && open && !matchMedia("(pointer: coarse)").matches) focusInput();
  }, [status, open, focusInput]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const pointerDown = (e: PointerEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      const target = e.target as Node;
      if (panel.contains(target)) return;
      if ((target as HTMLElement).closest('[data-chatbot-toggle]')) return;
      close();
    };
    document.addEventListener("pointerdown", pointerDown, true);
    return () => document.removeEventListener("pointerdown", pointerDown, true);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const offset = vv.height < window.innerHeight
        ? Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0))
        : 0;
      panel.style.transform = offset > 0 ? `translateY(-${offset}px)` : "";
    };
    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    onResize();
    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
      if (panelRef.current) panelRef.current.style.transform = "";
    };
  }, [open]);

  // Prevent page scroll when wheel event is inside the chatbot panel
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && panel.contains(target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => document.removeEventListener("wheel", onWheel, { capture: true });
  }, [open]);

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

  const handleStop = useCallback(() => {
    stop();
    focusInput();
  }, [stop, focusInput]);

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
        data-chatbot-toggle=""
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? ui.closeLabel : ui.openLabel}
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-4 right-4 z-50 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-colors hover:bg-primary-deep sm:h-14 sm:w-14 sm:bottom-6 sm:right-6"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-label={ui.assistantLabel}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={cn(
              "fixed bottom-16 right-3 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift sm:bottom-6 sm:right-6 transition-all duration-200",
              isMaximized
                ? "h-[min(85dvh,520px)] w-[min(calc(100vw-1.5rem),400px)] sm:h-[min(700px,calc(100vh-80px))] sm:w-[min(calc(100vw-3rem),440px)]"
                : "h-[min(65dvh,420px)] w-[min(calc(100vw-1.5rem),340px)] sm:h-[min(520px,calc(100vh-100px))] sm:w-[min(calc(100vw-3rem),380px)]"
            )}
          >
            <header className="border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2.5 px-3 py-2">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/15">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[16px] font-semibold leading-tight">{ui.assistantLabel}</p>
                  <p className="truncate text-[13px] opacity-80">{ui.headerSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { reset(); setIsMaximized(false); }}
                  aria-label={ui.resetLabel}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMaximized((m) => !m)}
                  aria-label={isMaximized ? "Minimize" : "Maximize"}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground/80 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 px-3 pb-2">
                <label className="sr-only">{ui.languageLabel}</label>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={cn(
                      "h-8 rounded-full px-4 text-[13px] font-medium transition-colors",
                      language === l.code
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary-foreground/15 text-primary-foreground/80 hover:bg-primary-foreground/25",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </header>

              <Conversation className="flex flex-col" style={{ overscrollBehavior: "contain" }}>
              <ConversationContent className="gap-2 px-3 py-3">
                {messages.length === 0 && (
                  <Message from="assistant">
                    <MessageContent className="text-[14px] leading-relaxed [&_strong]:font-semibold">
                      <MessageResponse>{GREETINGS[language]}</MessageResponse>
                      <time className="mt-1 block text-[11px] text-muted-foreground">
                        {formatTime(startedAt)}
                      </time>
                    </MessageContent>
                  </Message>
                )}

                {messages.map((message) => {
                  const text = messageText(message);
                  if (!text) return null;
                  return (
                    <Message key={message.id} from={message.role}>
                      <MessageContent
            style={{ touchAction: "manipulation" }}
            className={cn(
                          "text-[15px] leading-[1.5]",
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
                    {ui.errorMessage}
                  </p>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t border-border bg-card p-2.5">
              {messages.length === 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                  {QUICK_ACTIONS[language].map((action, i) => {
                    const Icon = ACTION_ICONS[i];
                    return (
                      <button
                        key={action}
                        type="button"
                        onClick={() => submit(action)}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:bg-primary-soft hover:text-foreground"
                      >
                        {Icon && <Icon className="h-3 w-3" />}
                        {action}
                      </button>
                    );
                  })}
                </div>
              )}
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
                  placeholder={ui.placeholder}
                  className="text-[15px]"
                  inputMode="text"
                  enterKeyHint="send"
                />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit
                    status={status}
                    disabled={!input.trim() && !busy}
                    onStop={handleStop}
                    aria-label={busy ? ui.stopLabel : ui.submitLabel}
                  >
                    <Send className="h-4 w-4" />
                  </PromptInputSubmit>
                </PromptInputFooter>
              </PromptInput>
              <p className="mt-2 text-center text-[12px] leading-4 text-muted-foreground">
                {ui.disclaimer}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
