import { Cache } from '@/src/common';
import { Airports, Cities, FlightOffers } from './types';

export default class AmadeusController {
  static #Amadeus = new (require('amadeus'))({
    clientId: process.env.API_KEY_AMADEUS,
    clientSecret: process.env.API_SECRET_AMADEUS,
  });

  static async getCities(body: Cities) {
    try {
      const cache = Cache.get(`${JSON.stringify(body)}-CITY`);
      if (cache) {
        return {
          status: 200,
          data: cache,
        };
      }
      const res = await this.#Amadeus.referenceData.locations.get({
        ...body,
        subType: 'CITY',
      });

      const data = res.data.map(({ iataCode, address: a }: any) => {
        const { countryCode, cityCode, regionCode, ...address } = a;

        return {
          iataCode,
          address,
        };
      });

      Cache.set(`${JSON.stringify(body)}-CITY`, data);

      return {
        status: 200,
        data,
      };
    } catch (err: any) {
      console.log(err);
      return {
        status: 500,
        message: err.message,
      };
    }
  }

  static async getFlightOffers(body: FlightOffers) {
    try {
      const cache = Cache.get(`${JSON.stringify(body)}-FLIGHT-OFFERS-RESUME`);
      if (cache) {
        return {
          status: 200,
          data: cache,
        };
      }
      const res = await this.#Amadeus.shopping.flightOffersSearch.get({
        ...body,
        currencyCode: body.currencyCode ?? 'USD',
        max: 10, // <- Comment this line to get all results
      });

      if (res.data.length === 0) {
        return {
          status: 404,
          data: [],
        };
      }

      const data = res.data.map(
        ({
          id,
          numberOfBookableSeats,
          itineraries: i,
          price: p,
          travelerPricings,
        }: any) => {
          const itineraries = i.map(({ duration, segments: s }: any) => {
            const segments = s.map(
              ({ numberOfStops, blacklistedInEU, ...segments }: any) => {
                return {
                  ...segments,
                };
              },
            );
            return { duration, segments };
          });
          const { fees, grandTotal, additionalServices, ...price } = p;

          return {
            id,
            numberOfBookableSeats,
            itineraries,
            price,
            travelerPricings,
          };
        },
      );

      const { locations, ...d } = res.result.dictionaries;

      for (const keyword in locations) {
        const airport = await this.getAirports({
          keyword,
          countryCode: locations[keyword].countryCode,
        });
        locations[keyword] = { ...locations[keyword], ...airport.data[0] };
      }

      const dictionaries = {
        ...d,
        locations,
      };

      Cache.set(`${JSON.stringify(body)}-FLIGHT-OFFERS-DETAILED`, {
        data,
        dictionaries,
      });

      const resumeData = data.map(({ id, itineraries: i, price: p }: any) => {
        const { base, ...price } = p;
        const itineraries = i.map(({ duration, segments: s }: any) => {
          const { departure, carrierCode: departureCarrierCode } = s[0];
          const { arrival, carrierCode: arrivalCarrierCode } = s[s.length - 1];
          return {
            duration,
            segments: [
              {
                departure: {
                  ...departure,
                  carrierCode: departureCarrierCode,
                },
                arrival: {
                  ...arrival,
                  carrierCode: arrivalCarrierCode,
                },
              },
            ],
          };
        });
        return { id, itineraries, price };
      });

      const { aircraft, ...resumeDictionaries } = dictionaries;

      Cache.set(`${JSON.stringify(body)}-FLIGHT-OFFERS-RESUME`, {
        data: resumeData,
        dictionaries: resumeDictionaries,
      });

      return {
        status: 200,
        data: { data: resumeData, dictionaries: resumeDictionaries },
      };
    } catch (err: any) {
      console.log(err);
      return {
        status: 500,
        message: err.message,
      };
    }
  }

  static async getAirports(body: Airports) {
    try {
      const cache = Cache.get(`${JSON.stringify(body)}-AIRPORT`);
      if (cache) {
        return {
          status: 200,
          data: cache,
        };
      }
      const res = await this.#Amadeus.referenceData.locations.get({
        ...body,
        subType: 'AIRPORT',
      });

      const data = res.data.map(({ name, id, iataCode, address }: any) => ({
        name,
        id,
        iataCode,
        address,
      }));

      Cache.set(`${JSON.stringify(body)}-AIRPORT`, data);

      return {
        status: 200,
        data,
      };
    } catch (err: any) {
      console.log(err);
      return {
        status: 500,
        message: err.message,
      };
    }
  }

  static async getFlightOffer(id: string, body: FlightOffers) {
    try {
      const cache = Cache.get(`${JSON.stringify(body)}-FLIGHT-OFFERS-DETAILED`);
      if (cache) {
        const data = cache.data.find((d: any) => d.id === id);
        console.log(id, cache);
        return {
          status: 200,
          data: {
            data,
            dictionaries: cache.dictionaries,
          },
        };
      }

      const res = await this.#Amadeus.shopping.flightOffersSearch.get({
        ...body,
        currencyCode: body.currencyCode ?? 'USD',
        max: 10, // <- Comment this line to get all results
      });

      if (res.data.length === 0) {
        return {
          status: 404,
          data: [],
        };
      }

      const data = res.data.map(
        ({
          id,
          numberOfBookableSeats,
          itineraries: i,
          price: p,
          travelerPricings,
        }: any) => {
          const itineraries = i.map(({ duration, segments: s }: any) => {
            const segments = s.map(
              ({ numberOfStops, blacklistedInEU, ...segments }: any) => {
                return {
                  ...segments,
                };
              },
            );
            return { duration, segments };
          });
          const { fees, grandTotal, additionalServices, ...price } = p;

          return {
            id,
            numberOfBookableSeats,
            itineraries,
            price,
            travelerPricings,
          };
        },
      );

      const { locations, ...d } = res.result.dictionaries;

      for (const keyword in locations) {
        const airport = await this.getAirports({
          keyword,
          countryCode: locations[keyword].countryCode,
        });
        locations[keyword] = { ...locations[keyword], ...airport.data[0] };
      }

      const dictionaries = {
        ...d,
        locations,
      };

      Cache.set(`${JSON.stringify(body)}-FLIGHT-OFFERS-DETAILED`, {
        data,
        dictionaries,
      });

      return {
        status: 200,
        data: { data, dictionaries },
      };
    } catch (err: any) {
      console.log(err);
      return {
        status: 500,
        message: err.message,
      };
    }
  }
}
