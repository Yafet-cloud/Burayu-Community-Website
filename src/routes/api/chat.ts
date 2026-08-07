import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { buildSystemPrompt } from "@/lib/assistant/knowledge";

type ChatRequestBody = { messages?: unknown; language?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const language = typeof body.language === "string" ? body.language : "en";
        const gateway = createLovableAiGatewayProvider(key);
        const messages = body.messages as UIMessage[];

        try {
          const result = streamText({
            model: gateway("google/gemini-3.6-flash"),
            system: buildSystemPrompt(language),
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});
