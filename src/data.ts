export interface Offer {
  day: string;
  title: string;
  description: string;
  productUrl: string;
}

export interface BusinessInfo {
  businessName: string;
  tagline: string;
  address: string;
  phone: string;
  phoneE164: string;
  website: string;
  instagram: string;
  logoUrl: string;
}

export const BUSINESS: BusinessInfo = {
  businessName: 'Slagerij Roest',
  tagline: 'Onze wekelijkse aanbiedingen',
  address: 'Van der Weijderlaan 3, 2211 JK Noordwijkerhout',
  phone: '0252 37 23 72',
  phoneE164: '+31252372372',
  website: 'https://slagerijroest.nl/',
  instagram: 'https://www.instagram.com/slagerijroest/',
  logoUrl:
    'https://slagerijroest.nl/wp-content/uploads/2025/06/slagerij-roest-white-1024x904.png',
};

export const OFFERS: Offer[] = [
  {
    day: 'Maandag',
    title: 'Hamburgers & Slavinken',
    description: '5 halen 4 betalen!',
    productUrl: 'https://slagerijroest.nl/product/mega-burger/',
  },
  {
    day: 'Dinsdag',
    title: 'Stoofvlees',
    description: '4 euro korting per kilo',
    productUrl: 'https://slagerijroest.nl/product/hacheevlees/',
  },
  {
    day: 'Woensdag',
    title: 'Half-om gehakt / Gekruid / Runder',
    description: 'Half-om: €10,95 — Gekruid: €12,95 — Runder: €13,95',
    productUrl: 'https://slagerijroest.nl/product/half-om-half-gehakt/',
  },
  {
    day: 'Donderdag',
    title: 'Biefstukdag',
    description: '3 biefstukken €10,95',
    productUrl: 'https://slagerijroest.nl/product/botermalse-biefstuk/',
  },
  {
    day: 'Vrijdag en Zaterdag',
    title: 'Schnitzeldagen',
    description: '5 halen, 4 betalen!',
    productUrl: 'https://slagerijroest.nl/product/runderschnitzel/',
  },
  {
    day: 'Zaterdag',
    title: 'Vleeswaren trio en duo',
    description: '€3,95 tot €5,95 — Op = Op!',
    productUrl: 'https://slagerijroest.nl/specialiteiten/',
  },
];
