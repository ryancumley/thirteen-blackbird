// Every placeholder and piece of swappable content lives here.

export const site = {
  name: '[Your company]',
  url: 'https://thirteenblackbird.com', // production URL, used for canonical, sitemap, OG
  websiteLabel: '[website]',
  location: 'Front Range, Colorado',
  title: '[Your company] · Your best salesperson, inside every AI answer',
  description:
    'We interview your top salespeople and turn what they say on calls into content ChatGPT, Perplexity and Gemini can find, trust and repeat.',
  competitor: '[Competitor]',
};

export const contact = {
  name: '[Your name]',
  email: '[email]',
  phone: '[phone]',
  // Swap for a Calendly / Cal.com link when ready.
  bookingHref: 'mailto:[email]',
};

export const nav = [
  { label: 'How it works', href: '#how' },
  { label: 'What you get', href: '#get' },
  { label: 'Packages', href: '#packages' },
];

export type Package = {
  name: string;
  label: string;
  price: number;
  unit?: string; // e.g. "/mo"
  sub: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: 'Pilot',
    label: 'Pilot · 3 weeks',
    price: 7500,
    sub: 'one-time · credited toward Launch within 60 days',
    bullets: ['5 rep interviews', '15 answer pages', 'AI visibility baseline'],
    cta: 'Start a pilot',
  },
  {
    name: 'Launch',
    label: 'Launch · 6–8 weeks',
    price: 30000,
    sub: 'one-time',
    bullets: [
      '12 rep interviews',
      '40 answer pages',
      'MCP server + ChatGPT / Claude app',
      'App directory listings',
      'Website chatbot hookup',
    ],
    cta: 'Plan a launch',
    featured: true,
  },
  {
    name: 'Ongoing',
    label: 'Ongoing · 6-month minimum',
    price: 3500,
    unit: '/mo',
    sub: 'after Launch',
    bullets: [
      '2 interviews a month',
      '8 new or refreshed pages a month',
      'Connector upkeep',
      'Monthly visibility report',
    ],
    cta: 'Talk about ongoing',
  },
];

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;

// Placeholder photos (Unsplash License). Replace the files in src/assets/photos
// and update alt text when real images are ready.
export const photos = {
  problem: {
    alt: 'Golden retriever puppy with a blue collar',
    caption: 'Placeholder · a rep mid-call, explaining what the website doesn’t',
  },
  how: {
    alt: 'Golden retriever puppy among daisies',
    caption: 'Placeholder · an interview in progress, or a real answer page',
  },
  headshot: {
    alt: 'Golden retriever puppy resting on a wooden floor',
    caption: 'Placeholder · your headshot',
  },
};
