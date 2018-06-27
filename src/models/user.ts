import { IEntity } from './common';

export interface IUser extends IEntity {
  username: string;
  email: string;
  password?: string;
}

export interface ISignDto {
  email: string;
  username: string;
  password: string;
}
