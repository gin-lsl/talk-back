import { Effect, HttpRequest, HttpError, HttpStatus } from '@marblejs/core';
import { iif, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createError } from '../functions/response.function';

/**
 * auth$, check authorization header
 *
 * @author gin-lsl 2018-6-18
 *
 * @param req$ req$
 */
export const auth$: Effect<HttpRequest> = req$ => req$.pipe(
  switchMap(req => iif(
    () => !req.headers['authorization'],
    throwError(createError(new HttpError('Unauthorized', HttpStatus.UNAUTHORIZED))),
    of(req),
  ))
);
