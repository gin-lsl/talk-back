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

/**
 * create success
 *
 * @author gin-lsl 2018-6-21
 *
 * @param data 返回数据
 */
export const createSuccess = <T = any>(data: T) => ({
  success: true,
  data,
});
