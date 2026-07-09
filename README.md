# Habesha Decor — Event Decoration Platform

**Philadelphia, PA | Ethiopian Diaspora & International Clients**

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/en`.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Animations | Framer Motion |
| Fonts | Playfair Display, Inter, Noto Sans Ethiopic |

---

  Localization

Routes are auto-prefixed by locale:

- `/en` — English (default)
- `/am` — Amharic (አማርኛ)
- `/om` — Afaan Oromoo
- `/ti` — Tigrinya (ትግርኛ)

Translation files live in `src/messages/{locale}.json`.

---

## Chat Widget Setup (Tidio)

1. Sign up at [tidio.com](https://www.tidio.com)
2. Copy your public key from Settings → Channels → Live Chat
3. Replace `YOUR_TIDIO_KEY` in `src/components/ChatWidget.tsx`

---

## Required Images

Place the following images in `public/images/`:

```
public/
  images/
    hero-bg.jpg              ← Hero section background (1920x1080 min)
    gallery/
      wedding-1.jpg
      wedding-2.jpg
      wedding-3.jpg
      holiday-1.jpg
      holiday-2.jpg
      holiday-3.jpg
      corporate-1.jpg
      corporate-2.jpg
      corporate-3.jpg
```

Use **WebP** or **AVIF** format for best performance. Next.js will auto-optimize via `<Image />`.

---

## Booking Form Backend

The booking form in `/booking` currently uses `setSubmitted(true)` as a placeholder.
Connect it to your preferred service:

- **Resend / Nodemailer** — Email notification
- **Supabase / Firebase** — Store submissions in a database
- **Formspree** — Zero-backend form handling

---

## Deployment

```bash
npm run build
npm start
```

Deploy to **Vercel** for zero-config Next.js hosting with automatic i18n support.
