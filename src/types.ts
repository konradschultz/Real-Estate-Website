export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  pricePerSqft: number;
  propertyType: 'Condo' | 'Single Family' | 'Townhouse' | 'Penthouse' | 'Waterfront Villa';
  yearBuilt: number;
  hoaFeePerMonth: number;
  isWaterfront: boolean;
  isFeatured: boolean;
  isNewListing: boolean;
  isPriceReduced: boolean;
  images: string[];
  description: string;
  amenities: string[];
  virtualTourUrl?: string;
  mlsNumber: string;
}

export interface CommunityInfo {
  id: string;
  name: string;
  tagline: string;
  image: string;
  avgPrice: string;
  pricePerSqft: string;
  lifestyle: string;
  description: string;
  keyFeatures: string[];
  lat: number;
  lng: number;
  activeCount: number;
}

export interface SearchFilters {
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  isWaterfrontOnly: boolean;
  isInvestmentOnly: boolean;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
}

export interface ValuationFormState {
  address: string;
  city: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  condition: string;
  hasPool: boolean;
  isWaterfront: boolean;
  name: string;
  email: string;
  phone: string;
}

export interface ValuationResult {
  estimatedValue: number;
  lowEstimate: number;
  highEstimate: number;
  pricePerSqft: number;
  comparablesCount: number;
  message: string;
}

export interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: 'In-Person Consultation' | 'Virtual Video Call' | 'Home Valuation CMA' | 'Property Showing Tour';
  notes: string;
  propertyId?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  photo: string;
  comment: string;
  rating: number;
  date: string;
  transactionType: 'Bought Luxury Condo' | 'Sold Waterfront Home' | 'Relocation Investment' | 'Multi-Property Deal';
}

export interface MarketStat {
  city: string;
  medianPrice: number;
  avgPricePerSqft: number;
  avgDaysOnMarket: number;
  inventoryCount: number;
  yearOverYearGrowth: number;
}
