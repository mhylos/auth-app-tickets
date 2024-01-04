import ticketRouter from './tickets';

import { Router } from 'express';

const apiRouter = Router();

apiRouter.use('/tickets', ticketRouter);

export default apiRouter;
