import * as userDao from '../dao/index';
import { Effect, matchPath, matchType, combineRoutes } from '@marblejs/core';
import { switchMap, map } from 'rxjs/operators';

const getAll$: Effect = req$ => req$.pipe(
  matchPath('/'),
  matchType('GET'),
  switchMap(userDao.findAll$),
  map(users => ({ body: users })),
)

export const users$ = combineRoutes(
  '/users',
  [getAll$]
);
