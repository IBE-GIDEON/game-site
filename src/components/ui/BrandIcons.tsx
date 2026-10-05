import { Envelope, FacebookLogo, Phone, WhatsappLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

/**
 * Contact and social marks in their own familiar colours rather than the site red.
 * Server-safe, so they work in both server and client components.
 */

type P = { size?: number };

export function PhoneIcon({ size = 26 }: P) {
  return <Phone size={size} weight="fill" color="#34C759" aria-hidden />;
}

export function WhatsAppIcon({ size = 26 }: P) {
  return <WhatsappLogo size={size} weight="fill" color="#25D366" aria-hidden />;
}

export function MailIcon({ size = 26 }: P) {
  return <Envelope size={size} weight="fill" color="#3B8FF6" aria-hidden />;
}

export function FacebookIcon({ size = 26 }: P) {
  return <FacebookLogo size={size} weight="fill" color="#1877F2" aria-hidden />;
}

export function XIcon({ size = 26 }: P) {
  return <XLogo size={size} weight="bold" color="#ffffff" aria-hidden />;
}

export function InstagramIcon({ size = 26 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.07" r="1.5">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <path
        fill="url(#ig-grad)"
        fillRule="evenodd"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.25-4a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"
      />
    </svg>
  );
}

/** The four-colour Google "G". */
export function GoogleIcon({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/** Map pin in the four Google Maps colours. */
export function MapsIcon({ size = 26 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <clipPath id="maps-pin">
          <path d="M12 1.5C7.86 1.5 4.5 4.86 4.5 9c0 5.6 7.5 13.5 7.5 13.5S19.5 14.6 19.5 9c0-4.14-3.36-7.5-7.5-7.5z" />
        </clipPath>
      </defs>
      <g clipPath="url(#maps-pin)">
        <rect width="24" height="24" fill="#34A853" />
        <polygon points="0,0 12,0 12,9 0,13" fill="#EA4335" />
        <polygon points="12,0 24,0 24,15 12,15" fill="#4285F4" />
        <polygon points="0,13 12,9 12,15 0,19" fill="#FBBC04" />
      </g>
      <circle cx="12" cy="9" r="2.7" fill="#ffffff" />
    </svg>
  );
}

/** UK road-sign parking mark: white P on blue. */
export function ParkingIcon({ size = 22 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#1D5BBF" />
      <path fill="#ffffff" d="M8.5 5.5h4.6c2.8 0 4.6 1.6 4.6 4.1s-1.8 4.1-4.6 4.1h-2.1v4.8H8.5V5.5zm2.5 2.2v3.8h1.9c1.4 0 2.2-.7 2.2-1.9s-.8-1.9-2.2-1.9H11z" />
    </svg>
  );
}
