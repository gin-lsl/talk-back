import { HttpError } from '@marblejs/core';

/**
 * create error
 *
 * @author gin-lsl 2018-6-18
 *
 * @param error error
 */
export const createError = (error: HttpError) => ({
  success: false,
  ...error,
});
