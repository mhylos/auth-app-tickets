export function formatFlightOffer(data: any) {
  return {
    originLocationCode: data.originLocationCode as string,
    destinationLocationCode: data.destinationLocationCode as string,
    departureDate: data.departureDate as string,
    returnDate: data.returnDate ? (data.returnDate as string) : undefined,
    adults: data.adults ? Number(data.adults) : 1,
    children: data.children ? Number(data.children) : undefined,
    infants: data.infants ? Number(data.infants) : undefined,
    travelClass: data.travelClass
      ? (data.travelClass as
          | 'ECONOMY'
          | 'PREMIUM_ECONOMY'
          | 'BUSINESS'
          | 'FIRST')
      : undefined,
    includedAirlineCodes: data.includedAirlineCodes
      ? (data.includedAirlineCodes as string)
      : undefined,
    excludedAirlineCodes: data.excludedAirlineCodes
      ? (data.excludedAirlineCodes as string)
      : undefined,
    nonStop: data.nonStop ? Boolean(data.nonStop) : false,
    currencyCode: data.currencyCode ? (data.currencyCode as string) : undefined,
    maxPrice: data.maxPrice ? Number(data.maxPrice) : undefined,
    max: data.max ? Number(data.max) : undefined,
  };
}

export function formatAirportsAndCities(data: any) {
  return {
    keyword: data.keyword as string,
    countryCode: data.countryCode ? (data.countryCode as string) : undefined,
    'page[limit]': data.limit ? Number(data.limit) : undefined,
    'page[offset]': data.offset ? Number(data.offset) : undefined,
    view: data.view ? (data.view as 'LIGHT' | 'FULL') : undefined,
  };
}
