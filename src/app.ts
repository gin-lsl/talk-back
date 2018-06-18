import { api$ } from './controllers/index';
import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';

const middlewares = [
  bodyParser$,
  logger$
];

const effects = [
  api$
];

export const app = httpListener({
  effects,
  middlewares,
});
