import { MarketStat, Testimonial } from '../types';

export const MARKET_STATS: MarketStat[] = [
  {
    city: 'Aventura',
    medianPrice: 850000,
    avgPricePerSqft: 580,
    avgDaysOnMarket: 42,
    inventoryCount: 340,
    yearOverYearGrowth: 7.4
  },
  {
    city: 'Sunny Isles Beach',
    medianPrice: 2200000,
    avgPricePerSqft: 1020,
    avgDaysOnMarket: 58,
    inventoryCount: 290,
    yearOverYearGrowth: 9.8
  },
  {
    city: 'Bal Harbour',
    medianPrice: 3800000,
    avgPricePerSqft: 1850,
    avgDaysOnMarket: 64,
    inventoryCount: 85,
    yearOverYearGrowth: 11.2
  },
  {
    city: 'Miami / Brickell',
    medianPrice: 1150000,
    avgPricePerSqft: 780,
    avgDaysOnMarket: 36,
    inventoryCount: 520,
    yearOverYearGrowth: 8.1
  },
  {
    city: 'Fort Lauderdale',
    medianPrice: 1650000,
    avgPricePerSqft: 840,
    avgDaysOnMarket: 48,
    inventoryCount: 410,
    yearOverYearGrowth: 6.9
  },
  {
    city: 'Hollywood & Hallandale',
    medianPrice: 720000,
    avgPricePerSqft: 510,
    avgDaysOnMarket: 39,
    inventoryCount: 260,
    yearOverYearGrowth: 5.8
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'David & Elena Roth',
    role: 'Buyers from New York',
    location: 'Acqualina, Sunny Isles Beach',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    comment: 'Konrad’s data-driven approach and AI valuation tools saved us over $180,000 on our Sunny Isles oceanfront condo! He managed the contract seamlessly while we were still in NYC.',
    rating: 5,
    date: 'June 2026',
    transactionType: 'Bought Luxury Condo'
  },
  {
    id: 't-2',
    clientName: 'Marcus Vance',
    role: 'Real Estate Investor',
    location: 'Aventura ParkSquare',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    comment: 'Konrad Schultz is the most tech-forward agent in South Florida. His neighborhood analytics and quick response times allowed me to acquire two prime rental units before they hit open MLS.',
    rating: 5,
    date: 'May 2026',
    transactionType: 'Multi-Property Deal'
  },
  {
    id: 't-3',
    clientName: 'Sofia & Carlos Rodriguez',
    role: 'Waterfront Home Sellers',
    location: 'Fort Lauderdale Deepwater Estate',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    comment: 'We listed our deepwater home with Konrad Schultz at Beachfront Realty. His digital marketing package and virtual staging produced 12 qualified showings in 5 days, selling above asking price!',
    rating: 5,
    date: 'April 2026',
    transactionType: 'Sold Waterfront Home'
  }
];
