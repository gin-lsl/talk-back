import { combineRoutes, Effect, matchPath, matchType } from '@marblejs/core';
import { map } from 'rxjs/operators';
import { users$ } from './user.controller';

const root$: Effect = req$ => req$.pipe(
  matchPath('/'),
  matchType('GET'),
  map(() => ({ body: 'Welcome to TALK' })),
);

export const api$ = combineRoutes(
  '/api/v1',
  [
    root$,
    users$,
  ]
);
