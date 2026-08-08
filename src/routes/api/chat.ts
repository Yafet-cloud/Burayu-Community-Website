import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { buildSystemPrompt } from "@/lib/assistant/knowledge";

type ChatRequestBody = { messages?: unknown; language?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("Invalid chat request", { status: 400 });
        }

        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["GEMINI_API_KEY"];
        if (!key) {
          return new Response("Chatbot is currently unavailable. Please try again later.", {
            status: 503,
          });
        }

        const VALID_LANGUAGES = ["en", "om", "am"];
        const rawLang = typeof body.language === "string" ? body.language : "en";
        const language = VALID_LANGUAGES.includes(rawLang) ? rawLang : "en";
        const google = createGoogleGenerativeAI({ apiKey: key });
        const messages = body.messages as UIMessage[];

        try {
          const result = streamText({
            model: google("gemini-flash-latest"),
            system: buildSystemPrompt(language),
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            onError: () => "Chatbot is currently unavailable. Please try again later.",
          });
        } catch {
          // Do not send provider or server errors to the browser.
          return new Response("Chatbot is currently unavailable. Please try again later.", {
            status: 503,
          });
        }
      },
    },
  },
});
