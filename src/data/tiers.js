/**
 * Membership tier definitions — single source of truth used by
 * /members, /members/join, and /members/lounge.
 */
export const TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    acs_percent: 10,
    tagline: 'Get on the list. Stay close.',
    short: 'The essentials. Newsletter, discount, lounge access.',
    perks: [
      'Monthly "Dan Dispatch" newsletter',
      '10% discount on the store',
      'Digital welcome pack (wallpapers + stickers)',
      'Member lounge access',
      '10% of your fee goes to the Anti-Cruelty Society',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 79,
    acs_percent: 20,
    tagline: 'Become a regular. Dan will learn your name (from the list).',
    short: 'Everything Basic, plus early access, voting, and quarterly BTS drops.',
    featured: true,
    perks: [
      'Everything in Basic',
      '15% discount on the store',
      'Early access to new merch (48h before public)',
      'Quarterly behind-the-scenes content drop',
      'Birthday mention on Dan\'s feed',
      'Voting rights on product designs',
      '20% of your fee goes to the Anti-Cruelty Society',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    acs_percent: 30,
    tagline: 'You get a real packet. Dan acknowledges you when convenient.',
    short: 'Everything in Standard, plus an annual physical mailing and virtual hangouts.',
    perks: [
      'Everything in Standard',
      '25% discount on the store',
      'Annual "Evidence Packet" mailed to you (prints, stickers, zine)',
      'Quarterly virtual member hangouts with Dan',
      'Priority booking for Dan\'s public appearances',
      'Your name in the site credits',
      '30% of your fee goes to the Anti-Cruelty Society',
    ],
  },
]

export const getTier = (id) => TIERS.find(t => t.id === id)
