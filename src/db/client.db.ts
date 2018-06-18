import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MongoClient } from 'mongodb';

const DB_CONNEC_URL = 'mongodb://localhost:27017';

const DB_NAME = 'talk_db';

const mongoConn$ = from(MongoClient.connect(DB_CONNEC_URL));

/**
 * db$
 */
export const db$ = mongoConn$.pipe(
  switchMap(conned => of(conned.db(DB_NAME)))
);
