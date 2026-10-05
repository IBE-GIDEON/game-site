import { Phone, WhatsappLogo } from "@phosphor-icons/react";

/** Contact actions in their own familiar colours rather than the site's red. */

export function PhoneIcon({ size = 26 }: { size?: number }) {
  return <Phone size={size} weight="fill" color="#34C759" aria-hidden />;
}

export function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return <WhatsappLogo size={size} weight="fill" color="#25D366" aria-hidden />;
}

/** Map pin in the four Google Maps colours. */
export function MapsIcon({ size = 26 }: { size?: number }) {
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
