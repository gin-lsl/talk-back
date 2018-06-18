import { Effect, HttpRequest } from '@marblejs/core';
import { iif, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    throwError({}),
    of(req),
  ))
);
