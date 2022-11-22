import { Entity } from './entity.interface';

export interface User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
}
