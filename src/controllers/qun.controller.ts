import { Effect, matchPath, matchType, use, combineRoutes, HttpRequest } from '@marblejs/core';
import { validator$, Joi } from '@marblejs/middleware-joi';
import { pluck, switchMap, map, tap } from 'rxjs/operators';
import { IQun, createInitQun } from '../models';
import * as qunDao from '../dao/qun.dao';
import { createSuccess } from '../functions';
import { ObjectId } from 'bson';

export const create$: Effect = req$ => req$.pipe(
  matchPath('/'),
  matchType('POST'),
  use(validator$({
    body: Joi.object({
      name: Joi.string().required().max(16),
      createBy: Joi.string().required().length(24),
    })
  })),
  pluck<any, IQun>('body'),
  map(payload => createInitQun(payload.name, payload.createBy)),
  switchMap(qunDao.insert$),
  map(res => ({ body: createSuccess(res) })),
);

export const findByUserCreated$: Effect = req$ => req$.pipe(
  matchPath('/user/:id'),
  matchType('GET'),
  tap(req => {
    console.log('req.params: ', req.params);
  }),
  use(
    validator$({
      params: Joi.object({
        id: Joi.string().length(24)
      })
    })
  ),
  pluck('params', 'id'),
  switchMap(qunDao.findsByUserId$),
  map(quns => ({ body: createSuccess(quns) })),
);

export const joinIn$: Effect = req$ => req$.pipe(
  matchPath('/:qunId/join-in/:userId'),
  matchType('PUT'),
  use(
    validator$({
      params: Joi.object({
        qunId: Joi.string().required().length(24),
        userId: Joi.string().required().length(24),
      }),
    })
  ),
  pluck<any, { userId: string, qunId: string }>('params'),
  switchMap(p => qunDao.joinIn$(p.userId, p.qunId)),
  map(joinRes => ({ body: createSuccess(joinRes) })),
);

export const exit$: Effect = req$ => req$.pipe(
  matchPath('/:qunId/exit/:userId'),
  matchType('PUT'),
  use(
    validator$({
      params: Joi.object({
        qunId: Joi.string().required().length(24),
        userId: Joi.string().required().length(24),
      })
    })
  ),
  pluck<HttpRequest, { userId: string, qunId: string }>('params'),
  switchMap(p => qunDao.exit$(p.userId, p.qunId)),
  map(exitRes => ({ body: createSuccess(exitRes) })),
);

export const qun$ = combineRoutes(
  '/quns',
  [create$, findByUserCreated$, joinIn$],
);
