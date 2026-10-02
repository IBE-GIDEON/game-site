export const site = {
  name: "Racecraft Sim",
  legal: "Racecraft Sim LTD",
  companyNo: "RC16927328",
  tagline: "Premium sim racing in Peterborough",
  email: "info@racecraftsim.co.uk",
  phone: "+44 7347 187729",
  phoneHref: "tel:+447347187729",
  whatsapp: "https://wa.me/447347187729",
  address: ["7 Midgate House", "Peterborough", "PE1 1TN"],
  mapsQuery: "7 Midgate House, Peterborough PE1 1TN",
  bookingUrl: "https://premiumsimracingexperience.as.me/",
  driverPortal: "https://racecraft.racecentres.com/drivers",
  opened: "24 July 2026",
  social: {
    instagram: "https://instagram.com/racecraftsimpm",
    facebook: "https://facebook.com/racecraftsim",
    x: "https://x.com/racecraftsimpb",
  },
};

export const nav = [
  { href: "/about", label: "The venue" },
  { href: "/timing", label: "Live timing" },
  { href: "/events", label: "Parties & corporate" },
  { href: "/contact", label: "Contact" },
];

/** 0 = Sunday. Times in 24h, Europe/London. */
export const hours: { day: string; open: number | null; close: number | null }[] = [
  { day: "Sunday", open: 12, close: 20 },
  { day: "Monday", open: null, close: null },
  { day: "Tuesday", open: null, close: null },
  { day: "Wednesday", open: 10, close: 20 },
  { day: "Thursday", open: 10, close: 20 },
  { day: "Friday", open: 10, close: 20 },
  { day: "Saturday", open: 10, close: 20 },
];

export type Session = {
  id: string;
  name: string;
  minutes: number;
  price: number;
  rig: "Standard" | "Motion" | "Tournament";
  blurb: string;
  featured?: boolean;
};

export const sessions: Session[] = [
  {
    id: "quick",
    name: "Quick race",
    minutes: 30,
    price: 15,
    rig: "Standard",
    blurb: "Enough time to learn a circuit and set a lap worth bragging about.",
  },
  {
    id: "standard-60",
    name: "Standard hour",
    minutes: 60,
    price: 25,
    rig: "Standard",
    blurb: "Our most booked session. Practice, find your braking points, go again.",
    featured: true,
  },
  {
    id: "standard-120",
    name: "Two-hour stint",
    minutes: 120,
    price: 40,
    rig: "Standard",
    blurb: "Endurance territory. Work through a full setup and a race distance.",
  },
  {
    id: "motion-60",
    name: "Motion hour",
    minutes: 60,
    price: 35,
    rig: "Motion",
    blurb: "Our motion rig feels every kerb, weight shift and lock-up. VR available.",
  },
];

export const raceNight = {
  price: 30,
  day: "Every Friday",
  time: "7:00pm – 11:00pm",
  drivers: 16,
  rigs: 8,
  schedule: [
    { time: "19:00", title: "Check-in & briefing", detail: "Sign in, rules and format explained, rig allocation." },
    { time: "19:20", title: "Practice", detail: "Two groups, ten minutes each to learn the car and track." },
    { time: "19:40", title: "Hot-lap qualifying", detail: "Fifteen minutes per group. One lap decides your grid." },
    { time: "20:20", title: "Heat races", detail: "Heat 1 for P1–8, Heat 2 for P9–16." },
    { time: "21:15", title: "Semi-finals", detail: "Top eight and bottom eight battle for the final grid." },
    { time: "22:05", title: "Grand final", detail: "Top eight drivers, thirty minutes, one podium." },
    { time: "22:40", title: "Podium & awards", detail: "Trophies, fastest-lap award and photos." },
  ],
  points: [10, 8, 6, 5, 4, 3, 2, 1],
};

export const monthly = {
  track: "Monza",
  month: "August 2026",
  record: { driver: "Ryan", time: "1:34.028", date: "29 Aug 2026", beat: "Matthew Thompson" },
  laps: "70+",
  drivers: "25+",
  next: "Circuit de Barcelona-Catalunya",
  rows: [
    { pos: 1, driver: "Ryan", car: "Ferrari SF70H", time: "1:34.028", date: "29/08" },
    { pos: 2, driver: "Matthew Thompson", car: "Ferrari 488 GT3", time: "1:51.649", date: "07/08" },
    { pos: 3, driver: "Richard S", car: "Mercedes-AMG GT3", time: "1:55.702", date: "22/08" },
    { pos: 4, driver: "Pod 5", car: "Ferrari 458 Italia", time: "1:59.426", date: "24/08" },
    { pos: 5, driver: "Ollie", car: "McLaren 650S GT3", time: "2:00.352", date: "21/08" },
    { pos: 6, driver: "Petko", car: "BMW Z4 GT3", time: "2:00.826", date: "17/08" },
  ],
};

export const reviews = [
  { name: "Daniel M.", when: "2 weeks ago", text: "Amazing experience from start to finish! The sims are incredible and the staff are really friendly. Highly recommend!" },
  { name: "Sam R.", when: "1 month ago", text: "Took my son for his birthday and he had the best day ever! Brilliant venue and such great fun." },
  { name: "Luke T.", when: "3 weeks ago", text: "Perfect for a group of friends or a work team event. The tournament format is so much fun!" },
  { name: "Jessica P.", when: "1 month ago", text: "Top quality setup, great atmosphere and super friendly staff. Will definitely be back!" },
  { name: "Michael B.", when: "2 months ago", text: "Best sim racing experience I've had. Feels so realistic. You have to try it to believe it!" },
];

export const generalFaqs = [
  {
    q: "Where is the closest car park?",
    a: "Monk Stone House Car Park (PE1 1SA) is the closest and cheapest option, paid through the RingGo app. Roadside parking nearby is available but costs more.",
  },
  {
    q: "What are your opening times?",
    a: "Wednesday to Saturday 10am – 8pm, Sunday 12pm – 8pm. We're closed on Mondays and Tuesdays.",
  },
  {
    q: "How do I get started?",
    a: "Book a session online, or get in touch and we'll walk you through it. No experience needed: we set up the rig, the car and the assists around you.",
  },
  {
    q: "How can I contact you?",
    a: "Call, message or WhatsApp +44 7347 187729, or email info@racecraftsim.co.uk. We usually reply within two hours.",
  },
];

export const eventFaqs = [
  { q: "Do we need experience?", a: "No. Beginners are welcome. We guide every driver through seat position, controls and assists before the first lap." },
  { q: "How many people can race?", a: "We host up to 30 drivers depending on the package. Larger groups rotate between sessions so everyone gets plenty of track time." },
  { q: "Is it walk-in or booking only?", a: "We accept walk-ins when rigs are free, but groups and events should book in advance." },
  { q: "Can we bring food or cake?", a: "Cake is usually fine for parties. For anything more, ask us and we'll help arrange catering." },
  { q: "Do you offer private hire?", a: "Yes. Private hire of the whole venue is available depending on day and time." },
  { q: "What's the deposit policy?", a: "A deposit secures your slot. Full details are confirmed with your booking invoice." },
];

export const giftCards = [
  { name: "30 minutes", price: 15, detail: "Standard rig" },
  { name: "60 minutes", price: 25, detail: "Standard rig" },
  { name: "60 minutes motion", price: 35, detail: "Premium motion rig" },
];
