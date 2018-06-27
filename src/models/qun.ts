import { IEntity } from './common';

export interface IQun extends IEntity {
  name: string;
  users: string[];
  createAt: Date;
  createBy: string;
}

export const createInitQun = (name: string, createBy: string): IQun => ({
  name: name,
  users: [createBy],
  createAt: new Date(),
  createBy: createBy,
});
