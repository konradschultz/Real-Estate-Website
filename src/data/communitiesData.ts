import { CommunityInfo } from '../types';

export const COMMUNITIES: CommunityInfo[] = [
  {
    id: 'aventura',
    name: 'Aventura',
    tagline: 'Waterfront Sophistication & World-Class Shopping',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$850,000',
    pricePerSqft: '$580/sqft',
    lifestyle: 'Luxury Condos, Golf, Aventura Mall, ParkSquare',
    description: 'Aventura is world-renowned for its pristine gated island communities, championship golf at JW Marriott Turnberry, upscale Aventura Mall, and vibrant urban town centers like Aventura ParkSquare.',
    keyFeatures: ['Aventura Mall & Luxury Dining', 'Don Soffer 3-Mile Exercise Trail', 'Deepwater Intracoastal Marinas', 'Top Rated Charter Schools'],
    lat: 25.9564,
    lng: -80.1392,
    activeCount: 14
  },
  {
    id: 'sunny-isles-beach',
    name: 'Sunny Isles Beach',
    tagline: 'Florida’s Riviera & Tower Architectural Marvels',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$2,200,000',
    pricePerSqft: '$1,020/sqft',
    lifestyle: 'Direct Oceanfront, Ultra-Luxury Highrises, Private Beach Services',
    description: 'Known as Florida’s Riviera, Sunny Isles Beach boasts legendary beachfront skyscrapers including Porsche Design Tower, Acqualina Mansions, Ritz-Carlton Residences, and Armani/Casa.',
    keyFeatures: ['White Sand Atlantic Beaches', '5-Star Resort Amenities', 'Private Car Lifts & Sky Garages', 'Proximity to Bal Harbour'],
    lat: 25.9429,
    lng: -80.1214,
    activeCount: 19
  },
  {
    id: 'bal-harbour',
    name: 'Bal Harbour',
    tagline: 'Exclusive Oceanfront Enclave & Haute Couture',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$3,800,000',
    pricePerSqft: '$1,850/sqft',
    lifestyle: 'High Fashion, Gated Villages, Ultra-Private Residences',
    description: 'Bal Harbour is synonymous with quiet luxury, featuring world-class shopping at Bal Harbour Shops (Chanel, Gucci, Balenciaga) and pristine gated single-family homes and oceanfront condos.',
    keyFeatures: ['Bal Harbour Shops', 'Gated Village Security', 'St. Regis & Oceana Bal Harbour', 'Private Beach Access'],
    lat: 25.8892,
    lng: -80.1228,
    activeCount: 8
  },
  {
    id: 'miami',
    name: 'Miami & Brickell',
    tagline: 'Financial Epicenter, Skyline Penthouses & Culture',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$1,150,000',
    pricePerSqft: '$780/sqft',
    lifestyle: 'Metropolitan Sky Living, Michelin Dining, Nightlife & Yachting',
    description: 'The Wall Street of the South! Brickell and Downtown Miami feature stunning architectural glass towers, Brickell City Centre, rooftop lounges, and seamless bayfront connectivity.',
    keyFeatures: ['Brickell Financial District', 'Brickell City Centre Shopping', 'Underline Urban Park', 'Biscayne Bay Marinas'],
    lat: 25.7617,
    lng: -80.1918,
    activeCount: 22
  },
  {
    id: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    tagline: 'Yachting Capital of the World & Las Olas Isles',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$1,650,000',
    pricePerSqft: '$840/sqft',
    lifestyle: 'Deepwater Boating, Las Olas Boulevard, Beachfront Living',
    description: 'With over 300 miles of navigable inland waterways, Fort Lauderdale offers yacht owners deepwater canal estates with quick ocean access alongside bustling Las Olas nightlife.',
    keyFeatures: ['Deepwater Canals for Large Yachts', 'Las Olas Boulevard Dining', 'Fort Lauderdale International Boat Show', 'Wide Ocean Beaches'],
    lat: 26.1224,
    lng: -80.1373,
    activeCount: 16
  },
  {
    id: 'hollywood-hallandale',
    name: 'Hollywood & Hallandale',
    tagline: 'Coastal Charm, Boardwalks & High Return Investments',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    avgPrice: '$720,000',
    pricePerSqft: '$510/sqft',
    lifestyle: 'Boardwalk Strolls, Gulfstream Park Horse Racing, Flexible Rentals',
    description: 'Offering prime oceanfront living between Miami and Fort Lauderdale, Hollywood and Hallandale Beach feature iconic boardwalks, casino racing at Gulfstream, and attractive rental yield profiles.',
    keyFeatures: ['Hollywood Broadwalk', 'Gulfstream Park Racing & Village', 'Diplomat Beach Resort', 'Flexible Short-Term Rental Condos'],
    lat: 25.9928,
    lng: -80.1180,
    activeCount: 11
  }
];
