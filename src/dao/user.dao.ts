import { db$, selectCollection } from '../db/index';
import { map, switchMap } from 'rxjs/operators';

const selectUserCollection = selectCollection('users');

export const findAll$ = () => db$.pipe(
  map(selectUserCollection),
  switchMap(col => col.find().toArray()),
);
