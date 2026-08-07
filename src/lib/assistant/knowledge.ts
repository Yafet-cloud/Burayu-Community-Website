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
  en: "Welcome to the Burayu City Science and Technology Office. I am your virtual assistant. I can help you explore services, news, projects, announcements, and other information available on this website. How may I assist you today?",
  om: "Baga gara Waajjira Saayinsii fi Teeknooloojii Magaalaa Buraayyuutti dhuftan. Ani gargaaraa dhugaa keessaa dha. Tajaajiloota, oduu, pirojektoota, beeksisoota fi odeeffannoo marsariiticharra jiru akka argattan isin gargaara. Akkam jechuun isin gargaaruu danda'a?",
  am: "ወደ ቡራዩ ከተማ ሳይንስና ቴክኖሎጂ ጽሕፈት ቤት እንኳን ደህና መጡ። እኔ ምናባዊ ረዳትዎ ነኝ። በዚህ ድረ ገጽ ላይ ስለሚገኙ አገልግሎቶች፣ ዜናዎች፣ ፕሮጀክቶች እና ማስታወቂያዎች መረጃ እንዲያገኙ እረዳዎታለሁ። እንዴት ልርዳዎ?",
};

export const THINKING_LABELS: Record<LanguageCode, string> = {
  en: "Thinking...",
  om: "Yaadaa jira...",
  am: "በማሰብ ላይ...",
};

export const QUICK_ACTIONS = [
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
] as const;

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

  return `You are the "Burayu Smart Assistant", the official virtual assistant of the Burayu City Science and Technology Office (Burayu Sub City, Shaggar City).

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
