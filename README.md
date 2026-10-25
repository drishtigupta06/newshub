# 📰 NewsHub — Modern Online News Portal

<div align="center">

![NewsHub Banner](https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80)

### *Your World. Your News.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://drishtigupta06.github.io/newshub/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**A complete, responsive, and professional digital news portal engineered using pure web standards.**  
*Second-Year Web Engineering College Project*

🔗 **[🌐 View Live Demo Website](https://drishtigupta06.github.io/newshub/)** • [Explore Features](#-key-features) • [Quick Start](#-quick-start--how-to-run) • [Project Architecture](#-project-architecture)

</div>

---

## 🌟 Executive Summary

**NewsHub** is an online newspaper portal inspired by classic journalistic institutions (*The New York Times*, *The Guardian*, *BBC News*, and *Reuters*). It combines clean editorial layout principles—such as structured typography, high-impact headlines, and curated desk showcases—with modern interactive features like dynamic searching, category filtering, a full article reading modal, bookmarks, and a dark/light theme switch.

**Built 100% with standard web technologies:**
- ❌ **No frameworks** (No React, Angular, Vue, or Next.js)
- ❌ **No CSS libraries** (No Bootstrap or Tailwind CSS)
- ❌ **No backend or databases** (No Node.js, Express, PHP, or MongoDB)
- ❌ **No build tools or bundlers** (No Vite, Webpack, or npm install)
- ✅ **Runs directly in any web browser by opening `index.html`**

---

## ✨ Key Features

### 🏛️ Editorial & Newspaper Design
- **Timeless Newspaper Aesthetics:** Clean white background, ink-black text, and high-impact crimson red accent (`#c8102e`).
- **Carefully Paired Typography:** Google Fonts `Merriweather` (editorial serif) for authoritative headlines and `Inter` (sans-serif) for clean interface text.
- **Top Announcement Bar:** Real-time date display, global edition indicators, theme toggle, and live bookmark counter.
- **Traditional Masthead:** Newspaper volume and issue badge, bold branding, and official tagline (*"Your World. Your News."*).
- **Responsive Layout:** Fluid layout built with CSS Grid and Flexbox for 3-column desktop, 2-column tablet, and touch-friendly mobile screens.

### 📰 Homepage Layout & Sections
1. **Breaking News Ticker:** Interactive breaking news bar with red flash badge, auto-cycling headlines, and manual previous/next controls.
2. **Featured Hero Dispatch:** High-prominence lead story with large imagery, category badge, publication timestamp, author byline/avatar, summary, and direct "Read Full Story" action.
3. **Trending Stories Sidebar:** Numbered **01** to **05** sidebar showing the most-read stories with reading time indicators.
4. **Latest News Grid:** 15 comprehensive news articles covering **Technology**, **Sports**, **Politics**, **Business**, and **Entertainment**.
5. **Category Spotlight Showcase:** Curated multi-card deep dive into Technology & Innovation stories.
6. **Newsletter Subscription:** Email input with client-side regex format validation, error highlighting, and simulated subscription confirmation.
7. **Comprehensive Footer:** Multi-column layout with desk shortcuts, newsroom information, journalistic integrity policies, and social channels.

### ⚡ Client-Side Interactivity (Vanilla JS)
- **Dynamic Category Filtering:** Filter stories instantly across all 5 news desks from the header, mobile drawer, or category pill tabs.
- **Dynamic Search:** Real-time search across headlines, article descriptions, and indexed tags with feedback counters and a one-click clear button.
- **Detailed Article Modal:** Clicking any card opens a dedicated reading modal featuring full multi-paragraph reporting, pull quotes, tags, share actions, and keyboard `Esc` closing.
- **Offline Reading List (Bookmarks):** Save articles using the bookmark icon; saved state is persisted in browser `localStorage`.
- **Dark Mode Toggle:** Smooth theme transition with dark mode palette (`#111317` surface, adjusted contrast) remembered across page reloads.
- **Back-to-Top Button:** Floating scroll-to-top button that smoothly triggers when scrolling down the page.
- **Zero Broken Images:** Built-in dynamic SVG fallback generator guarantees attractive editorial cards even if images fail to load offline.

---

## 📂 Project Architecture

```
newshub/
│
├── index.html       # Semantic HTML5 markup, accessibility landmarks, and modal templates
├── style.css        # CSS3 variables, typography scale, responsive grids, dark mode, animations
├── script.js        # Vanilla JS engine, 15 detailed articles, search, bookmarks, filtering
└── README.md        # Comprehensive project documentation
```

### File Breakdown

| File | Purpose | Key Responsibilities |
|---|---|---|
| **`index.html`** | Structure | Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`), ARIA attributes, SVG icons |
| **`style.css`** | Presentation | CSS Custom Properties, light/dark themes, CSS Grid, media queries, print styles |
| **`script.js`** | Behavior | News data array (15 items), event handling, search filtering, modals, `localStorage` |

---

## 🚀 Quick Start & How to Run

### Method 1: Direct File Open (Zero Setup Required)
1. Clone or download this repository:
   ```bash
   git clone https://github.com/drishtigupta06/newshub.git
   ```
2. Open the folder and double-click **`index.html`** in any web browser (Chrome, Firefox, Safari, Edge).
3. The site will run immediately with all features enabled!

### Method 2: Local Web Server (Optional)
If you prefer running through a local web server:

**Using Python:**
```bash
cd newshub
python -m http.server 8085
```
Then visit: `http://localhost:8085`

**Using VS Code Live Server:**
- Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 📊 Sample News Dataset

The project includes 15 realistic, illustrative articles covering all major editorial desks:

| Desk / Category | Sample Headline |
|---|---|
| **Technology** | *Global Clean Energy Summit Announces Unified Solar & Grid Resilience Standards* |
| **Technology** | *Next-Gen 2nm Microarchitecture Delivers 40% Efficiency Gains for Mobile AI* |
| **Technology** | *Open Source Operating Systems Mark Milestone Adoption Across Municipal Services* |
| **Sports** | *World Athletics Federation Approves Advanced Biometric Track Surface Standards* |
| **Sports** | *Historic Overtime Thriller Crowns New Continental Basketball Champions* |
| **Sports** | *Grassroots Youth Academy Reforms Fuel Historic Surge in Emerging Football Talents* |
| **Politics** | *Global Diplomatic Summit Yields Comprehensive Maritime Biodiversity Protection Treaty* |
| **Politics** | *Parliamentary Committee Unveils Bipartisan Digital Privacy and Algorithmic Audit Bill* |
| **Politics** | *Mayoral Coalition Launches Urban High-Speed Electric Transit Corridors* |
| **Business** | *Global Supply Chain Modernization Pushes Green Logistics to Record Efficiencies* |
| **Business** | *Central Banks Finalize Cross-Border Settlement Prototype for Wholesale Clearance* |
| **Business** | *Venture Investment Shifts Toward Deep Tech: Fusion, Biotechnology, and Materials* |
| **Entertainment** | *International Independent Film Festival Celebrates Renaissance of Practical Visual Effects* |
| **Entertainment** | *Restored Symphonic Masterworks Discovered in Historic Archive Premiere to Global Audience* |
| **Entertainment** | *Interactive Digital Museum Retrospective Explores 100 Years of Modernist Architecture* |

---

## 🎓 Engineering Highlights

- **Separation of Concerns:** Strict isolation between presentation (`style.css`), markup (`index.html`), and business logic (`script.js`).
- **Semantic HTML & Web Accessibility (a11y):** Uses proper landmark tags, aria-expanded states, modal dialog roles, and keyboard navigation.
- **State Management without Frameworks:** Implements an encapsulated state object in `script.js` that coordinates active categories, searches, sorting, and user bookmarks.
- **Browser Persistence:** Uses `localStorage` to save user bookmarks and preferred theme (Dark/Light Mode) across browser sessions.
- **Print Optimization:** Includes `@media print` rules for clean, distraction-free hardcopy printing.

---

## 👤 Author

- **Drishti Gupta**
- GitHub: [@drishtigupta06](https://github.com/drishtigupta06)
- Project: Second-Year Web Engineering Project

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Feel free to use, modify, and distribute for academic or educational purposes.
