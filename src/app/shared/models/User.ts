import { Entity } from './Entity';

export interface User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ipAddress?: string;
}
