import { Router } from 'express';

import { AmadeusController } from '@/src/controllers';
import { formatAirportsAndCities, formatFlightOffer } from '@/src/common';

const ticketRouter = Router();

ticketRouter.get('/cities', async (req, res) => {
  const body = formatAirportsAndCities(req.query);
  const response = await AmadeusController.getCities(body);
  res.status(response.status).json(response.data ?? response.message);
});

ticketRouter.get('/flight-offers', async (req, res) => {
  const body = formatFlightOffer(req.query);
  const response = await AmadeusController.getFlightOffers(body);

  res.status(response.status).json(response.data ?? response.message);
});

ticketRouter.get('/airports', async (req, res) => {
  const body = formatAirportsAndCities(req.query);
  const response = await AmadeusController.getAirports(body);
  res.status(response.status).json(response.data ?? response.message);
});

ticketRouter.get('/flight-offer/:id', async (req, res) => {
  const { id } = req.params;
  const body = formatFlightOffer(req.query);
  const response = await AmadeusController.getFlightOffer(id, body);

  res.status(response.status).json(response.data ?? response.message);
});

// ticketRouter.post('/flight-offer/:id', async (req, res) => {
//   res.status(200).json({ message: 'ok', data: req.params.id });
// });

export default ticketRouter;
