# Racecraft Sim — website redesign

Next.js 16 (App Router) · Tailwind CSS v4 · Motion · Lenis smooth scroll · Phosphor icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production preview
```

## Pages

| Route      | What it is                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| `/`        | Home: hero, hardware, live timing, pricing, Friday race night, events, gallery, reviews, visit |
| `/about`   | The venue story, equipment, principles, audiences                          |
| `/timing`  | Live timing board, rig status, monthly leaderboard, track of the month     |
| `/events`  | Birthday & corporate packages, how it works, enquiry form, FAQ             |
| `/book`    | Booking flow with live slot availability, hands off to Acuity checkout     |
| `/contact` | Contact channels, form, FAQ, map                                           |

## Demo data

There is no backend yet. These are simulated in the browser so the site feels live:

- **Live timing** (`src/components/live/useRaceSim.ts`): 8 drivers lapping Barcelona with real sector
  logic (purple = overall fastest, green = personal best, yellow = slower).
- **Rig status** (`src/components/live/RigStatus.tsx`): session countdowns per rig.
- **Booking availability** (`src/components/BookingWidget.tsx`): slots fill up while you browse.
- **Forms** show a success state but don't send anything yet.

Each can be swapped for a real API (Race Centres timing feed, Acuity availability, an email service)
without changing the UI.

## Content

All copy, prices, hours, FAQs and reviews live in `src/lib/site.ts`. Venue photos are the client's own
(`public/images/venue-*`); the three supporting photos (Barcelona, cockpit, helmet) are from Unsplash (free licence).

The hero video (`public/video/`) is a 20s muted loop cut from the client's promo reel: venue footage only,
watermark cropped, ~5MB desktop / ~2MB mobile. Logos are in `public/brand/` (stacked, stacked mono,
and a horizontal lockup built from the stacked artwork for the nav).

## Maintenance mode

Maintenance mode is **on**. In production every page returns a 503 "Under maintenance" screen
(`src/proxy.ts`). Local development (`npm run dev`) is not affected.

| Setting (host environment variable) | Effect |
| --- | --- |
| `MAINTENANCE_MODE=false` | Turn maintenance off and show the site to everyone |
| `MAINTENANCE_BYPASS_KEY=<secret>` | Owner preview: open any page once with `?preview=<secret>`; that browser sees the real site for 30 days |

To change the default without environment variables, edit `MAINTENANCE_DEFAULT` in `src/proxy.ts`.
