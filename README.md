<div align="center">

# 🏛️ Burayu Sub-City Website

**Official Community Website for Burayu Sub-City**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

[![Official Website](https://img.shields.io/badge/🌐_Visit_Website-burayu--community--website.vercel.app-4CAF50)](https://burayu-community-website.vercel.app)

</div>

---

## ✨ About

The **Burayu Sub-City Website** is a modern, responsive web application designed to serve the community of Burayu Sub-City in Addis Ababa, Ethiopia. Built with cutting-edge technologies, it provides citizens with easy access to local information, e-services, news, and community resources.

## 🌟 Features

| Feature | Description |
|---------|-------------|
| 🏠 **Homepage** | Hero slider, welcome message, city statistics, and leadership profiles |
| 📰 **News** | Latest community news and announcements |
| 🖼️ **Gallery** | Photo gallery showcasing city events and landmarks |
| 📚 **E-Library** | Digital library access for residents |
| 🏘️ **E-Land** | Land registration and information portal |
| 💼 **Careers** | Job opportunities and employment information |
| 📞 **Contact** | Contact forms and office information |
| 🤖 **AI Assistant** | Built-in AI chatbot for quick assistance |

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| ⚛️ React 19 | UI Framework |
| 📝 TypeScript | Type Safety |
| 🔥 Vite | Build Tool & Dev Server |
| 🎨 Tailwind CSS | Styling |
| 🔄 TanStack Router | Client-side Routing |
| 🧩 TanStack Query | Data Fetching |
| 🎯 TanStack Start | Full-stack Framework |
| 🤖 AI SDK | AI Assistant Integration |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Yafet-cloud/Burayu-Community-Website.git

# Navigate to project directory
cd Burayu-Community-Website

# Install dependencies
bun install
# or
npm install
```

## 🛠️ Development

```bash
# Start development server
bun run dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 🏗️ Build & Deploy

```bash
# Create production build
bun run build
# or
npm run build

# Preview production build
bun run preview
# or
npm run preview
```

## 📂 Project Structure

```
Burayu-Community-Website/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/     # Header, Footer, Navbar
│   │   ├── ui/         # shadcn/ui components
│   │   └── assistant/  # AI Assistant components
│   ├── routes/         # Page components (TanStack Router)
│   ├── lib/            # Utilities and site data
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
│   └── images/         # Locally hosted images (slides, gallery, etc.)
└── package.json
```

## 📸 Image Migration

All images were migrated from the legacy CDN (`buraayyuu.shaggarcity.et`) to be served locally from Vercel. This ensures the site is fully self-contained with zero external image dependencies.

**Structure:**
```
public/images/
├── slides/      # 5 hero slider images
├── mayor/       # 1 welcome message portrait
├── leadership/  # 4 administration staff photos
├── news/        # 2 article images
└── gallery/     # 10 gallery photos
```

**How it was done:** Each image was downloaded from the old server and saved locally. All references in `site-data.ts` were updated to use local paths like `/images/slides/slide-1.jpg`.

```powershell
# Downloads ONE image — e.g. the mayor portrait
Invoke-WebRequest -Uri "https://buraayyuu.shaggarcity.et/storage/mayor_photos/BsDUw3wMJ8W08GJPJprtxdeScsQ87rzlG4jliYgg.jpg" -OutFile "public/images/mayor/welcome.jpg"
```

**OG Image:** The social preview image (`og-image.png`) was generated from the homepage design and placed in `public/og-image.png`. To regenerate, screenshot the homepage hero section at 1200x630px.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 Social Media

Stay connected with Burayu Sub-City:

- 📘 [Facebook](https://www.facebook.com/people/Burayu-Sub-City-Municipal/61551713823169/)
- ✈️ [Telegram](https://t.me/Burayu2016)
- 📷 [Instagram](https://www.instagram.com/burayu_sub_city_communication/)

## 📞 Contact

**Burayu Sub-City**

- 📍 Address: Mamo, Addis Ababa, Ethiopia
- 📧 Email: [cshaggar@gmail.com](mailto:cshaggar@gmail.com)
- 📞 Phone: 011-18-88-00-61 | 011-14-20-10

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for the Burayu Community**

*"Building a Smarter, More Connected Burayu"*

</div>
