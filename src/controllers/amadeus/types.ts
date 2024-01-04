export interface AirportsAndCities {
  keyword: string;
  countryCode?: string;
  'page[limit]'?: number;
  'page[offset]'?: number;
  view?: 'LIGHT' | 'FULL';
}

export interface Cities extends AirportsAndCities {}

export interface Airports extends AirportsAndCities {}

export interface FlightOffers {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  includedAirlineCodes?: string;
  excludedAirlineCodes?: string;
  nonStop?: boolean;
  currencyCode?: string;
  maxPrice?: number;
  max?: number;
}

export interface Airport {
  subType: 'AIRPORT';
}
