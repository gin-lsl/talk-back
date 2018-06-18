import { Db } from 'mongodb';

/**
 * 选择集合
 *
 * @author gin-lsl 2018-6-18
 *
 * @param collectionName 集合名称
 */
export const selectCollection = (collectionName: string) => (db: Db) => db.collection(collectionName);
