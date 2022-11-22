import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user.interface';
import { EntityService } from '../entity/entity.service';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  uri = `users`;
}
