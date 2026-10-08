import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance mode.
 *
 * ON:  every page answers with a 503 "under maintenance" screen instead of the site.
 *      Applies to production builds only, so `npm run dev` still shows the full site.
 * OFF: set MAINTENANCE_MODE=false on the host (or change the default below) and redeploy.
 *
 * Owner preview: set MAINTENANCE_BYPASS_KEY on the host, then open any page once with
 * ?preview=<key>. A cookie keeps the real site visible in that browser for 30 days.
 */
const MAINTENANCE_DEFAULT = true;

const ON =
  process.env.NODE_ENV === "production" &&
  (process.env.MAINTENANCE_MODE ? process.env.MAINTENANCE_MODE !== "false" : MAINTENANCE_DEFAULT);
const BYPASS_KEY = process.env.MAINTENANCE_BYPASS_KEY;
const COOKIE = "rc_preview";

export function proxy(request: NextRequest) {
  if (!ON) return NextResponse.next();

  if (BYPASS_KEY) {
    const url = request.nextUrl;
    if (url.searchParams.get("preview") === BYPASS_KEY) {
      const clean = url.clone();
      clean.searchParams.delete("preview");
      const res = NextResponse.redirect(clean);
      res.cookies.set(COOKIE, BYPASS_KEY, {
        httpOnly: true,
        sameSite: "lax",
        secure: clean.protocol === "https:",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      return res;
    }
    if (request.cookies.get(COOKIE)?.value === BYPASS_KEY) return NextResponse.next();
  }

  return new NextResponse(PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  // the maintenance page itself needs the logo, fonts and icons
  matcher: ["/((?!_next/|brand/|fonts/|icon\\.png|apple-icon\\.png|favicon\\.ico).*)"],
};

const PAGE = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#000000">
<title>Racecraft Sim | Under maintenance</title>
<link rel="icon" href="/icon.png">
<link rel="preload" href="/fonts/saira-italic.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face { font-family: Saira; src: url(/fonts/saira-upright.woff2) format("woff2"); font-weight: 400 700; font-style: normal; font-display: swap; }
  @font-face { font-family: Saira; src: url(/fonts/saira-italic.woff2) format("woff2"); font-weight: 600 750; font-style: italic; font-display: swap; }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; background: #000; }
  body {
    display: grid; place-items: center; padding: 32px 20px;
    color: #f2f1ee; font-family: Saira, ui-sans-serif, system-ui, sans-serif;
    font-variation-settings: "wdth" 97; -webkit-font-smoothing: antialiased; text-align: center;
  }
  main { max-width: 520px; }
  img { width: min(56vw, 220px); height: auto; }
  .lights { display: flex; justify-content: center; gap: 10px; margin: 36px 0 32px; }
  .lights span { width: 12px; height: 12px; border-radius: 50%; background: #ff1e2a; box-shadow: 0 0 12px 2px rgb(255 30 42 / .6); }
  h1 {
    font-style: italic; font-weight: 720; font-variation-settings: "wdth" 106; text-transform: uppercase;
    font-size: clamp(30px, 7vw, 48px); line-height: .95; letter-spacing: -.012em; text-wrap: balance;
  }
  p { margin-top: 16px; color: #a3a3ab; font-size: 16px; line-height: 1.6; text-wrap: pretty; }
  .contact { margin-top: 28px; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; font-size: 15px; }
  a { color: #fff; text-decoration: none; }
  a:hover { color: #ff2a35; }
  .addr { margin-top: 18px; font-size: 13px; color: #6c6c75; }
</style>
</head>
<body>
<main>
  <img src="/brand/logo-stacked-loader.webp" alt="Racecraft Sim" width="520" height="348">
  <div class="lights" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
  <h1>Under maintenance</h1>
  <p>We are tuning the site and will be back on track shortly. For bookings call or email us.</p>
  <div class="contact">
    <a href="tel:+447347187729">+44 7347 187729</a>
    <a href="mailto:info@racecraftsim.co.uk">info@racecraftsim.co.uk</a>
  </div>
  <div class="addr">7 Midgate House, Peterborough, PE1 1TN</div>
</main>
</body>
</html>`;
