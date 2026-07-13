# Rehoboth Decor — Event Decoration Platform

**Philadelphia, PA | Ethiopian Diaspora & International Clients**

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto-redirects to `/en`.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Animations | Framer Motion |
| Database | Neon PostgreSQL (serverless) |
| File Storage | Vercel Blob |
| Email | Resend |
| Fonts | Playfair Display, Inter, Noto Sans Ethiopic |

---

## Environment Variables

Create `.env.local` in the project root:

```env
# Neon PostgreSQL — https://neon.tech → your project → Connection string
DATABASE_URL=postgresql://user:password@host.neon.tech/neondb?sslmode=require

# Admin credentials (used on first DB init)
ADMIN_USERNAME=your-email@example.com
ADMIN_PASSWORD=your-password

# Admin session token (any random string)
ADMIN_TOKEN=your-random-token

# Resend — email notifications — https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx

# Vercel Blob — auto-set on Vercel, needed locally for gallery uploads
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxx
```

---

## Database (Neon PostgreSQL)

### Setup

1. Go to [neon.tech](https://neon.tech) → Sign up → New Project
2. Copy the **Connection string**
3. Paste it as `DATABASE_URL` in `.env.local`

### Tables

Tables are **auto-created** on first request — no manual migration needed.

| Table | Description |
|---|---|
| `admin_auth` | Admin username & password |
| `bookings` | Customer booking requests |
| `rentals` | Rental items (chairs, arches, etc.) |
| `gallery` | Gallery photos |
| `settings` | App settings (calendar dates, budget ranges, iCal URL, service prices) |

### Settings Keys

| Key | Description |
|---|---|
| `manual_booked_dates` | JSON array of booked dates e.g. `["2025-07-15"]` |
| `ical_url` | Google/Apple Calendar iCal feed URL |
| `budget_ranges` | JSON array of budget options |
| `service_prices` | JSON object of starting prices per service |

### Migrate from SQLite (one-time)

If you have an existing `data/database.sqlite`:

```bash
npm install better-sqlite3 dotenv --save-dev
node migrate.js   # create this script if needed
```

---

## API Routes

All routes are under `src/app/api/`.

### Authentication

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/admin-login` | Login with username + password → sets `admin_token` cookie |
| `GET` | `/api/auth` | Get current admin user |
| `PUT` | `/api/auth/update` | Update admin username/password |

**Login flow:**
```
POST /api/admin-login
Body: { "username": "...", "password": "..." }
Response: 200 { success: true } + sets httpOnly cookie
```

### Bookings

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings (newest first) |
| `POST` | `/api/bookings` | Create new booking |
| `PUT` | `/api/bookings/[id]` | Update booking status |
| `DELETE` | `/api/bookings/[id]` | Delete booking |

**Create booking body:**
```json
{
  "name": "Sara T.",
  "phone": "+1-484-000-0000",
  "event_type": "Wedding",
  "date": "2025-08-15",
  "location": "Philadelphia, PA",
  "budget": "$3,000–$5,000",
  "message": "Optional message"
}
```

**Update status body:**
```json
{ "status": "confirmed" }
```
Status values: `pending` | `confirmed` | `cancelled`

### Rentals

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/rentals` | List all rental items |
| `POST` | `/api/rentals` | Add new rental item |
| `PUT` | `/api/rentals/[id]` | Update rental price |
| `DELETE` | `/api/rentals/[id]` | Delete rental item |

**Create rental body:**
```json
{
  "name": "Gold Arch",
  "description": "Large floral arch",
  "price": 350,
  "imageUrl": "https://...",
  "category": "Arches"
}
```

### Gallery

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/gallery` | List all photos |
| `POST` | `/api/gallery` | Add photo by URL |
| `DELETE` | `/api/gallery/[id]` | Delete photo |
| `POST` | `/api/gallery/upload` | Upload photo file → Vercel Blob |

**Upload photo:**
```bash
curl -X POST /api/gallery/upload \
  -F "file=@photo.jpg"
```

### Calendar

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/calendar` | Returns all booked dates (manual + iCal) |

**Response:**
```json
{ "dates": ["2025-07-15", "2025-07-20"] }
```

### Settings

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/settings?key=KEY` | Get single setting value |
| `GET` | `/api/settings` | Get all settings |
| `POST` | `/api/settings` | Save/update a setting |

**Save setting:**
```json
{ "key": "manual_booked_dates", "value": ["2025-07-15"] }
```

### Contact / Email

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Send booking email via Resend |

---

## Admin Panel

URL: `/admin-login`

**Default credentials** (set in `.env.local`):
- Username: value of `ADMIN_USERNAME`
- Password: value of `ADMIN_PASSWORD`

### Admin Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin` | Overview stats + recent bookings |
| Bookings | `/admin/bookings` | View, confirm, cancel bookings |
| Rentals | `/admin/rentals` | Add/remove rental items |
| Gallery | `/admin/gallery` | Upload/delete gallery photos |
| Calendar | `/admin/calendar` | Mark booked dates manually or sync iCal |
| Budget | `/admin/budget` | Set starting prices per service type |
| Settings | `/admin/settings` | Update admin credentials |

### Admin Authentication

- Login sets an `admin_token` httpOnly cookie (8 hour expiry)
- Middleware at `src/middleware.ts` protects all `/admin/*` routes
- Cookie value must equal `"authenticated"` to access admin

---

## Localization (i18n)

Routes are auto-prefixed by locale:

| Locale | URL | Language |
|---|---|---|
| English | `/en` | Default |
| Amharic | `/am` | አማርኛ |
| Afaan Oromoo | `/om` | Oromoo |
| Tigrinya | `/ti` | ትግርኛ |

Translation files: `src/messages/{locale}.json`

Config: `src/i18n/request.ts` + `next.config.mjs`

---

## Email Notifications (Resend)

When a booking is submitted via `/api/contact`:

1. Email is sent to `danielaberabetrewerik@gmail.com`
2. Uses Resend API (`RESEND_API_KEY`)
3. From address: `Rehoboth Decor <onboarding@resend.dev>`

To change the recipient email, edit `src/app/api/contact/route.ts`:
```ts
to: "your-email@example.com",
```

---

## File Uploads (Vercel Blob)

Gallery photo uploads use Vercel Blob storage.

- **Local dev:** Set `BLOB_READ_WRITE_TOKEN` in `.env.local`
  - Get it from: Vercel Dashboard → Storage → Blob → your store → `.env.local`
- **Production (Vercel):** Token is auto-injected — no config needed

---

## Deployment (Vercel)

```bash
npm run build    # verify build passes locally first
```

Then:

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add all `.env.local` variables to Vercel → Settings → Environment Variables
4. Deploy

**Required env vars on Vercel:**
- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN`
- `RESEND_API_KEY`

`BLOB_READ_WRITE_TOKEN` is auto-set by Vercel Blob — no need to add manually.

---

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Public pages (home, about, booking, gallery, services, rentals)
│   ├── admin/             # Admin panel pages
│   ├── admin-login/       # Login page
│   ├── api/               # All API routes
│   │   ├── admin-login/
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── calendar/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── rentals/
│   │   ├── settings/
│   │   └── upload/
│   ├── layout.tsx          # Root layout (html/body)
│   └── globals.css
├── components/
│   ├── ui/                # ReviewsAndCalendar, PackageCards, etc.
│   ├── chat/              # VoiceChatWidget, LiveCallButton, etc.
│   ├── AdminShell.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── BookingForm.tsx
├── lib/
│   └── db.ts              # Neon DB connection + table creation
├── i18n/
│   └── request.ts         # next-intl config
├── messages/
│   ├── en.json
│   ├── am.json
│   ├── om.json
│   └── ti.json
└── middleware.ts           # Auth + i18n routing
```

---

## Chat Widget (Tidio — optional)

1. Sign up at [tidio.com](https://www.tidio.com)
2. Copy your public key from Settings → Channels → Live Chat
3. Replace `YOUR_TIDIO_KEY` in `src/components/ChatWidget.tsx`

---

## Required Images

Place in `public/images/`:

```
public/images/
├── hero-bg.jpg
├── og-image.jpg
└── gallery/
    ├── wedding-1.jpg ... wedding-10.jpg
    ├── holiday-1.jpg ... holiday-10.jpg
    └── corporate-1.jpg ... corporate-6.jpg
```

Use **WebP** or **AVIF** for best performance.
