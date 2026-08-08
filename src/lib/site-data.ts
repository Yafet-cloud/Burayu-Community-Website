/**
 * Public content for the Burayu Sub City website.
 * All images are served locally from /images/.
 */

export const site = {
  name: "Burayu Sub City",
  subtitle: "Community Portal",
  parent: "Shaggar City",
  facebook: "https://www.facebook.com/people/Burayu-Sub-City-Municipal/61551713823169/",
  telegram: "https://t.me/Burayu2016",
  instagram: "https://www.instagram.com/burayu_sub_city_communication/",
  address: "Mamo, Addis Ababa, Ethiopia",
  email: "cshaggar@gmail.com",
  phones: ["011-18-88-00-61", "011-14-20-10"],
  footerIntro:
    "Shaggar City Burayu Subcity intends to implement real change and raise the standard of living for its citizens. We have achieved good results in the past years where we have been working for development with strong determination. We are acting together in a changing spirit to ensure the development of our people and bring about fundamental change.",
} as const;

/**
 * `to` = internal app route (client-side navigation).
 * `href` = external system, opened in a new tab.
 */
export type NavChild = { label: string; href?: string; to?: string; external?: boolean };
export type NavItem = { label: string; to?: string; children?: NavChild[] };

export const eServices: NavChild[] = [
  { label: "E-library", to: "/e-library" },
  { label: "E-Land", to: "/e-land" },
  { label: "E-Conference", href: "https://shaggarcity.oo.et/?module=login", external: true },
  { label: "E-service", href: "https://eservice.shaggarcity.et/", external: true },
  { label: "E-investment", href: "https://investment.shaggarcity.et/login", external: true },
  { label: "E-Trade", href: "http://etrade.gov.et/", external: true },
];


export const subCities: NavChild[] = [];

export const navigation: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "E-service", children: eServices },
  { label: "News", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const heroSlides = [
  "/images/slides/slide-1.jpg",
  "/images/slides/slide-2.jpg",
  "/images/slides/slide-3.jpg",
  "/images/slides/slide-4.jpg",
  "/images/slides/slide-5.jpg",
];

export const welcome = {
  title: "Welcome Message from the Burayu Sub City Administration",
  subtitle: "A Warm Welcome to the Residents and Visitors of Burayu Sub City",
  body: "As the Burayu Sub city Administration, I am excited to share our bold vision for the future of our community. We are committed to transforming Burayu into a model smart city—competitive, livable, and responsive to the needs of all residents. Our goal is to establish Burayu Sub city as a compact, polycentric economic hub, fostering inclusivity, connectivity, and environmental sustainability through strategic spatial planning and targeted investments in innovative infrastructure.",
  name: "Mr. Abate Asirat",
  role: "Burayu Sub City Administration",
  photo: "/images/mayor/welcome.jpg",
};

export const leadership = [
  {
    name: "Mr. Kalbessa Tolera",
    role: "Head of Prosperity Party Burayu branch",
    photo: "/images/leadership/1.jpg",
  },
  {
    name: "Mr. Asmera Tashome",
    role: "Prosperity Party",
    photo: "/images/leadership/2.jpg",
  },
  {
    name: "Mr. Meserat Dame",
    role: "Party",
    photo: "/images/leadership/3.jpg",
  },
  {
    name: "Shibiru Alamu",
    role: "Vice Administration",
    photo: "/images/leadership/4.jpg",
  },
];

/** City statistics counters. */
export const statistics = [
  { label: "Population", value: 283613 },
  { label: "Sub-City", value: null as number | null, display: "Burayu sub city" },
  { label: "Woreda", value: 4 },
  { label: "Employee", value: 1752 },
];

export const cityProfile = [
  { label: "Water coverage", value: "66.8%", percent: 66.8 },
  { label: "Sanitary services", value: "74.3%", percent: 74.3 },
  { label: "School coverage", value: "82.33%", percent: 82.33 },
  { label: "Electric coverage", value: "52.56%", percent: 52.56 },
  { label: "Educated population", value: "87.9%", percent: 87.9 },
  { label: "Mobile users", value: "68.2%", percent: 68.2 },
  { label: "Health coverage", value: "36%", percent: 36 },
  { label: "Transport", value: "12,464", percent: null as number | null },
];

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
};

export const news: NewsItem[] = [
  {
    id: "3",
    title: "IRREECHA FESTIVAL",
    date: "2024-12-07",
    excerpt:
      "Irreecha (also known as Irreessa) is a thanksgiving holiday celebrated in the Oromia Region of Ethiopia, marking the end of winter. It is one of the most significant cultural festivals in Africa. The Oromo people celebrate Irreecha to express gratitude to Waaqa (their God) for the blessings and mercies received throughout the year.",
    image: "/images/news/irreecha.webp",
  },
  {
    id: "2",
    title: "DIGITAL SHAGGAR",
    date: "2024-11-28",
    excerpt:
      "Shaggar City is undergoing a digital transformation to improve service efficiency, accessibility, and connectivity for its residents and businesses. The city is implementing various digital initiatives to enhance services and infrastructure, such as: SMART CITY TECHNOLOGY, E-GOVERNANCE and DIGITAL LIBRARY.",
    image: "/images/news/digital-shaggar.png",
  },
  {
    id: "1",
    title: "Location",
    date: "2024-11-29",
    excerpt:
      "Shaggar City is located in the Oromia Regional State of Ethiopia, situated in the central part of the country surrounding Finfinnee (Addis Ababa), the country's capital. Etymologically, the name 'Shaggar' is derived from the Afan Oromo word 'Shaggaa,' which indicates positivity, beauty, and endearment.",
  },
];

export const gallery = [
  "/images/gallery/1.png",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.png",
  "/images/gallery/8.jpg",
  "/images/gallery/9.jpg",
  "/images/gallery/10.png",
];

export const careerIntro =
  "It is with immense pleasure and a deep sense of responsibility that I extend a heartfelt welcome to you on behalf of the Shaggar City Mayor's Office. Our city, a tapestry of diverse cultures and aspirations, is more than just a place on the map; it is a vibrant community bound together by shared dreams and collective efforts. As the Mayor of this dynamic city, I am privileged to lead alongside a dedicated team, committed to enhancing the well-being and progress of every individual in Shaggar.";

export type Job = {
  title: string;
  type: string;
  location: string;
  office: string | null;
  salary: string;
  description: string;
  startedOn: string | null;
  deadline: string;
};

export const jobs: Job[] = [];
