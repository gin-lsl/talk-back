import { HttpError, HttpStatus } from '@marblejs/core';
import { iif, of, throwError, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { db$, selectCollection } from '../db/index';
import { createError } from '../functions/response.function';
import { ISignDto, IUser } from '../models';
import { ObjectId } from 'bson';

const selectUserCollection = selectCollection('users');

export const getById$ = (id: string): Observable<IUser> => db$.pipe(
  map(selectUserCollection),
  switchMap(col => iif(
    () => ObjectId.isValid(id),
    col.findOne({ _id: new ObjectId(id) }),
    throwError(createError(new HttpError(`Error Id: '${id}'`, HttpStatus.NOT_FOUND))),
  )),
  map(user => {
    if (user) {
      user.id = user._id;
      delete user.password;
      delete user._id;
    }
    return user;
  }),
);

export const findAll$ = () => db$.pipe(
  map(selectUserCollection),
  switchMap(col => col.find().toArray()),
  map(users => users.map(user => {
    user.id = user._id;
    delete user.password;
    delete user._id;
    return user;
  })),
);

export const existEmailOrUsername$ = ({ email, username }: ISignDto) => db$.pipe(
  map(selectUserCollection),
  switchMap(col => col.find({ $or: [{ email }, { username }] }).toArray()),
  map(founds => founds.length >= 1),
);

export const insert$ = (user: ISignDto) => db$.pipe(
  map(selectUserCollection),
  switchMap(col => col.insertOne(user)),
  switchMap(res => iif(
    () => res.insertedCount === 1,
    of(user),
    throwError(createError(new HttpError('Insert Failure', HttpStatus.INTERNAL_SERVER_ERROR))),
  )),
);
