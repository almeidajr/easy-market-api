import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import nfcesRouter from '@modules/nfces/infra/http/routes/nfces.routes';

const routes = Router();

routes.get('/info', (request, response) =>
  response.json({
    message: `Server is running at ${new Date()}`,
  }),
);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/nfces', nfcesRouter);

export default routes;
