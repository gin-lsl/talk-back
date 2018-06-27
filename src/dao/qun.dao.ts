import { selectCollection, db$ } from '../db';
import { switchMap, map } from 'rxjs/operators';
import { ObjectId } from 'bson';
import { iif, of, throwError } from 'rxjs';
import { HttpError, HttpStatus } from '@marblejs/core';
import { createError } from '../functions';
import { createInitQun, IQun } from '../models';

const selectQunCollection = selectCollection('quns');

export const insert$ = (qun: IQun) => db$.pipe(
  map(selectQunCollection),
  switchMap(col => col.insertOne(qun)),
  switchMap(insertRes => iif(
    () => insertRes.insertedCount === 1,
    of(qun),
    throwError(createError(new HttpError('Insert Failure', HttpStatus.INTERNAL_SERVER_ERROR)))
  )),
);

export const findAll$ = db$.pipe(
  map(selectQunCollection),
  switchMap(col => col.find().toArray()),
);

export const findsByUserId$ = (userId: string) => db$.pipe(
  map(selectQunCollection),
  switchMap(col => col.find({ users: { $in: [userId] } }).toArray()),
);

export const joinIn$ = (userId: string, qunId: string) => db$.pipe(
  map(selectQunCollection),
  switchMap(col => col.findOneAndUpdate({ _id: new ObjectId(qunId) }, { $push: { users: userId } })),
  map(res => res.value),
);

export const exit$ = (userId: string, qunId: string) => db$.pipe(
  map(selectQunCollection),
  switchMap(col => col.findOneAndUpdate({ _id: new ObjectId(qunId) }, { $pull: { users: userId } })),
  map(res => res.value),
);
