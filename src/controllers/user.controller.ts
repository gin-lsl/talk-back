import { combineRoutes, Effect, HttpError, HttpStatus, matchPath, matchType, use } from '@marblejs/core';
import { Joi, validator$ } from '@marblejs/middleware-joi';
import { iif, of, throwError } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import * as userDao from '../dao/index';
import { createSuccess } from '../functions/response.function';
import { ISignDto } from '../models';

const getAll$: Effect = req$ => req$.pipe(
  matchPath('/'),
  matchType('GET'),
  switchMap(userDao.findAll$),
  map(users => ({ body: createSuccess(users) })),
);

const getById$: Effect = req$ => req$.pipe(
  matchPath('/:id'),
  matchType('GET'),
  pluck('params', 'id'),
  switchMap(userDao.getById$),
  map(user => ({ body: createSuccess(user) })),
);

const signIn$: Effect = req$ => req$.pipe(
  matchPath('/sign-in'),
  matchType('POST'),
  use(validator$({
    body: Joi.object({
      email: Joi.string().required(),
      username: Joi.string().min(6).max(16),
      password: Joi.string().min(6).max(16),
    })
  })),
  pluck<any, ISignDto>('body'),
  switchMap(signDto => userDao
    .existEmailOrUsername$(signDto)
    .pipe(
      switchMap(exist => iif(
        () => exist,
        throwError(new HttpError('邮箱或用户名已存在', HttpStatus.OK)),
        of(signDto),
      )),
      switchMap(userDao.insert$),
  )),
  map(res => ({ body: createSuccess(res) })),
);

export const users$ = combineRoutes(
  '/users',
  [getById$, getAll$, signIn$]
);
