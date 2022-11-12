import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/User';
import { EntityService } from '../EntityService';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  uri = `users`;
}
