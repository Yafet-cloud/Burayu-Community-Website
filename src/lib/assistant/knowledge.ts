import {
  site,
  eServices,
  navigation,
  welcome,
  leadership,
  cityProfile,
  news,
  jobs,
  gallery,
} from "@/lib/site-data";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "om", label: "Afaan Oromo" },
  { code: "am", label: "አማርኛ" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const GREETINGS: Record<LanguageCode, string> = {
  en: "Welcome to the Burayu Sub City Administration. I am your virtual assistant. I can help you explore services, news, projects, announcements, and other information available on this website. How may I assist you today?",
  om: "Baga gara Waajjira Bulchiinsaa Kutaa Magaalaa Buraayyuutti dhuftan. Ani gargaaraa dhugaa keessaa dha. Tajaajiloota, oduu, pirojektoota, beeksisoota fi odeeffannoo marsariiticharra jiru akka argattan isin gargaara. Akkam jechuun isin gargaaruu danda'a?",
  am: "ወደ ቡራዩ ክፍለ ከተማ አስተዳደር እንኳን ደህና መጡ። እኔ ምናባዊ ረዳትዎ ነኝ። በዚህ ድረ ገጽ ላይ ስለሚገኙ አገልግሎቶች፣ ዜናዎች፣ ፕሮጀክቶች እና ማስታወቂያዎች መረጃ እንዲያገኙ እረዳዎታለሁ። እንዴት ልርዳዎ?",
};

export const THINKING_LABELS: Record<LanguageCode, string> = {
  en: "Thinking...",
  om: "Yaadaa jira...",
  am: "በማሰብ ላይ...",
};

export const QUICK_ACTIONS: Record<LanguageCode, readonly string[]> = {
  en: [
    "Explore Services",
    "Latest News",
    "Current Projects",
    "Announcements",
    "About the Office",
    "Contact Us",
    "Office Location",
    "Frequently Asked Questions",
    "Downloads",
    "Innovation Programs",
  ],
  om: [
    "Tajaajiloota Adda baasi",
    "Oduu Haaraa",
    "Pirojektoota Ammayyoo",
    "Beeksisoota",
    "Wajjira Irratti",
    "Qunnamtii",
    "Kabaja Wajjiraa",
    "Gaaffii fi Deebii",
    "Diiguulaa",
    "Prosagraamii Haasaa",
  ],
  am: [
    "አገልግሎቶችን ያስሱ",
    "የቅርብ ጊዜ ዜና",
    "የአሁን ፕሮጀክቶች",
    "ማስታወቂያዎች",
    "ስለ ቢሮው",
    "ያግኙን",
    "የቢሮው ቦታ",
    "ተደጋጋሚ ጥያቄዎች",
    "ማውረጃዎች",
    "የኡደት ፕሮግራማት",
  ],
};

export const UI_STRINGS: Record<LanguageCode, {
  headerSubtitle: string;
  placeholder: string;
  disclaimer: string;
  openLabel: string;
  closeLabel: string;
  resetLabel: string;
  assistantLabel: string;
  languageLabel: string;
  submitLabel: string;
  stopLabel: string;
}> = {
  en: {
    headerSubtitle: "Sub City Administration",
    placeholder: "Ask about services, news, or contacts...",
    disclaimer: "Answers use published website information only.",
    openLabel: "Open the Burayu Smart Assistant",
    closeLabel: "Close the Burayu Smart Assistant",
    resetLabel: "Start a new conversation",
    assistantLabel: "Burayu Smart Assistant",
    languageLabel: "Assistant language",
    submitLabel: "Submit",
    stopLabel: "Stop",
  },
  om: {
    headerSubtitle: "Bulchiinsaa Kutaa Magaalaa",
    placeholder: "Waa'ee tajaajila, oduu, fi qunnamtii gaaffii kaa'i...",
    disclaimer: "Deebiin madda website keessaa adda ta'e qofa fayyadama.",
    openLabel: "Gargaaraa Dhugaa Buraayyuu Keessatti Furii",
    closeLabel: "Gargaaraa Dhugaa Buraayyuu Keessatti Cufii",
    resetLabel: "Yeroo haaraa jalqabsiisi",
    assistantLabel: "Gargaaraa Dhugaa Buraayyuu",
    languageLabel: "Afaan gargaaraa",
    submitLabel: "Ergi",
    stopLabel: "Dhaamsi",
  },
  am: {
    headerSubtitle: "የክፍለ ከተማ አስተዳደር",
    placeholder: "ስለ አገልግሎቶች፣ ዜና ወይም መገኛዎች ይጠይቁ...",
    disclaimer: "መልስ በድረ ገጽ ላይ ያሉ መረጃዎችን ብቻ ይጠቀማል።",
    openLabel: "የቡራዩ ሥmart ረዳት ክፈት",
    closeLabel: "የቡራዩ ሥmart ረዳት ደምቅ",
    resetLabel: "አዲስ ውይይት ጀምር",
    assistantLabel: "የቡራዩ ሥmart ረዳት",
    languageLabel: "የረዳት ቋንቋ",
    submitLabel: "ላክ",
    stopLabel: "ማስቆም",
  },
};

const languageName: Record<string, string> = {
  en: "English",
  om: "Afaan Oromo",
  am: "Amharic",
};

/** Everything the assistant is allowed to state as fact — sourced only from this site. */
export function buildSystemPrompt(language: string) {
  const lang = languageName[language] ?? "English";

  const knowledge = [
    `SITE: ${site.name} (${site.subtitle}), part of ${site.parent}.`,
    `PAGES: ${navigation
      .filter((n) => n.to)
      .map((n) => `${n.label} -> ${n.to}`)
      .join(", ")}.`,
    `E-SERVICES: ${eServices.map((s) => `${s.label} (${s.to ? `page ${s.to}` : s.href})`).join(", ")}.`,
    `CONTACT: address ${site.address}; email ${site.email}; phone ${site.phones.join(" / ")}; Facebook ${site.facebook}. No published office working hours.`,
    `WELCOME MESSAGE (${welcome.name}, ${welcome.role}): ${welcome.body}`,
    `LEADERSHIP: ${leadership.map((l) => `${l.name} — ${l.role}`).join("; ")}.`,
    `CITY PROFILE FIGURES: ${cityProfile.map((c) => `${c.label}: ${c.value}`).join("; ")}. Population, sub-city, woreda and employee counters are not published.`,
    `NEWS ITEMS: ${news.map((n) => `"${n.title}" (${n.date}, /news/${n.id}): ${n.excerpt}`).join(" | ")}`,
    `GALLERY: ${gallery.length} published photos at /gallery.`,
    `VACANCIES (/careers): ${jobs
      .map(
        (j) =>
          `${j.title} — type ${j.type}, location ${j.location}, office ${j.office ?? "not specified"}, salary ${j.salary}, deadline ${j.deadline}`,
      )
      .join("; ")}.`,
    `NOT PUBLISHED ON THIS SITE: downloadable documents, an events calendar, office working hours, project list beyond the news items above, and an online inquiry tracker. The contact page has an enquiry form.`,
  ].join("\n");

  return `You are the "Burayu Smart Assistant", the official virtual assistant of the Burayu Sub City Administration (Burayu Sub City, Shaggar City).

TONE: professional, friendly, respectful, patient, concise and government-appropriate. Never use slang or emoji.

LANGUAGE: Reply exclusively in ${lang}, because it is the language selected by the visitor. Do not switch languages because the question is written in another language.
- For English, use natural, plain English.
- For Afaan Oromo, use clear, standard Afaan Oromo suitable for Burayu residents. Do not mix in English, except for exact proper names, URLs, email addresses, phone numbers or official service names.
- For Amharic, use natural, clear Amharic. Do not mix in English, except for exact proper names, URLs, email addresses, phone numbers or official service names.

STRICT ACCURACY RULES — these override everything else:
- Only answer using the published information below.
- Never invent government policies, procedures, statistics, contact details, services, events or deadlines.
- Never give legal advice or promise services.
- If something is not in the information below, say plainly that you cannot confirm it from the website, and recommend contacting the office (${site.email}, ${site.phones.join(" or ")}).

STYLE: short answers (2-5 sentences or a compact list). When relevant, point to the exact page path such as /news, /gallery, /careers, /contact or /about, or give the exact e-service link.

PUBLISHED INFORMATION:
${knowledge}`;
}
