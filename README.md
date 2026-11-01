# 🎂 Cutieee, reemal 💖

A premium, cinematic, emotionally engaging single-page YOU speacial experience —
built like a luxury Apple page dipped in a romantic fairytale. Soft pink,
lavender, champagne gold and pastel purple, with floating hearts, sparkles,
butterflies, glowing bokeh, drifting petals, glassmorphism, parallax, a
typewriter confession, an interactive question flow, and a confetti finale.

---

## ✨ Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (opens http://localhost:5173)
npm run dev

# 3. Build for production
npm run build
npm run preview
```

> Requires **Node.js 18+**.

### 🎵 Add background music (optional)

Drop a `soft-piano.mp3` file into `public/music/`. See
`public/music/README.txt` for royalty-free sources. The site works fine
without it — the music button just shows as muted.

---

## 🌸 What's inside

- **Cinematic loading screen** — "Loading your surprise…" with a progress ring
- **Hero** — animated title, two-line intro, and a typewriter confession
- **Love Journey** — five glassmorphism memory cards with 3D tilt & glow
  (The Day I Met You · Your Smile · Your Kindness · Your Dreams · The Things I Admire About You)
- **Cute Questions** — ten adorable questions revealed one by one, each with a
  playful response. The final "No" playfully dodges before it gives in 😉
- **Grand finale** — confetti, floating hearts, sparkles, a music swell, and a
  heartfelt animated message
- **Ending** — a glowing heart that assembles itself from particles + signature

### Extras

Floating music toggle · scroll-progress bar · smooth GSAP scrolling ·
parallax · lazy-loaded sections · full keyboard focus states ·
`prefers-reduced-motion` respected throughout · mobile-first responsive.

---

## 🧱 Tech stack

React 19 · Vite 6 · Tailwind CSS 3 · Framer Motion · GSAP · lucide-react ·
react-icons · Canvas particle systems. **No external UI component libraries.**

---

## 📁 Folder structure

```
reemal-YOU speacial/
├── public/
│   └── music/            # drop soft-piano.mp3 here
├── src/
│   ├── components/       # UI + atmospheric components
│   │   ├── LoadingScreen.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── Butterflies.jsx
│   │   ├── FloatingHearts.jsx
│   │   ├── Confetti.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── MusicToggle.jsx
│   │   ├── SectionWrapper.jsx
│   │   ├── Hero.jsx
│   │   ├── MemoryCard.jsx
│   │   ├── LoveJourney.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── CuteQuestions.jsx
│   │   ├── FinalMessage.jsx
│   │   └── EndingAnimation.jsx
│   ├── hooks/            # reusable modern hooks
│   │   ├── useTypewriter.js
│   │   ├── useAudio.js
│   │   ├── useScrollProgress.js
│   │   ├── useSmoothScrollTo.js
│   │   └── usePrefersReducedMotion.js
│   ├── data/            # editable content
│   │   ├── memories.js
│   │   └── questions.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Make it yours

- **Words** — edit `src/data/memories.js` and `src/data/questions.js`.
- **Hero confession** — the text lives in `src/components/Hero.jsx`.
- **Final message** — `src/components/FinalMessage.jsx`.
- **Colours & fonts** — all tokens are in `tailwind.config.js`.
- **Name** — search the project for `reemal` to swap in any name.

Made with love, smiles, and a little courage. ❤️
